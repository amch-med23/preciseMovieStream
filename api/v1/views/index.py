#!/usr/bin/env python3
from api.v1.views import app_views
from flask import jsonify, make_response, request, abort 
import json
import uuid
from models.data_checker import data_check
from models.email_handler import handle_email
from models.login_handler import login_creds_check
from models.storage_engine.DB_handler import *
from models.reset_password_handler import *
import requests


@app_views.route("/status", methods=['GET'],
                 strict_slashes=False)
def status():
    """API status"""
    """ we need to start a series to tests to determin the system status"""
    # system status == 0 is okay, else is not.
    system_status = 0
    if system_status == 0:
        return {"status_code": 200}, 200
    else:
        return {"status_code": 503}, 200

@app_views.route("/register", methods=['POST'],
		strict_slashes=False)
def register():
    """handles new user reistration """
    if not request.is_json:
        abort(400, 'Not a JSON')

    data = request.get_json()
    
    # this will check  the email and the password.
    check_obj = data_check(data) # this will return an dictionary of check status [failed, passed] for each key email_check and password_check

    if check_obj['email_check'] == 'passed' and check_obj['password_check'] == 'passed':
        # whan the data is correct
    	# make session id etc...
        session_id = uuid.uuid4()
        user_email = data['email']
        
        handle_email(session_id, user_email)
        # the above function will generate the 6 digit ver_code and send the email + save the email verification instance in a didicated Database table

        return make_response(jsonify({"email_check":"passed", "password_check":"passed", "user_email": user_email, "session_id": session_id}), 200)

    else:
    	# when there is an error in the data.
        return make_response(jsonify(check_obj), 200)
    

@app_views.route("/verify_email", methods=['POST'],
                 strict_slashes=False)
def email_verify():
    """ here we generate a random 6 digits number 
    and we send them to the user email, to verify the email before registering."""
    
    if not request.is_json:
        abort(400, 'Not a JSON')

    data = request.get_json()
    # in here we will read from the storage engine the obj with the requested session_id and user_email.
    # then we will verifi the value of the 'ver_digit' associated with the keys ('session_id', 'user_email')
    # and we compare it with the value of what the user inputed from the fron-end.
    
    """ we need to filter by session_id, since the email address 
    can be duplicated (multiple unfinished attempts by the user) """
    
    email_ver_obj = get_ver_codes()
    db_ver_dict = {}
    # ok now after we got the ver codes objects list from the datbase:
    # we need to filter through it and select the object by sessin_id.
    for instance in email_ver_obj:
        if instance['session_id'] == data['session_id']:
            # this is the instance we want.
            db_ver_dict = instance

    ver_status_obj = {} # verification_status holder
    #print('the selected instance from the db is: {}'.format(db_ver_dict))
    if db_ver_dict:
        """ the db ver object is not null so this is what we are gonna operate on """
        if data['email'] == db_ver_dict['user_email'] and data['ver_code'] == db_ver_dict['ver_code']:

            ver_status_obj["verification_status"] = "verified"
            user_obj = {}
            user_obj['user_email'] = data['email']
            user_obj['password'] = data['password']
            user_obj['user_name'] = data['user_name']
            # when the user is verified, we gonna register him in the DB                                               
            # register the user_obj to the database table of 'users'.
            registration_status = register_user(user_obj)
            print(registration_status)
            # after registering this user it's a goodidea to remove the ver_obj instance from the database
            # this will help improve the app performence

            """ removing the instance will be done in here. """
            instance_session_id = data['session_id']
            # we call the delete function form DB_handler
            delete_ver_obj(instance_session_id)

        else:
            """ verification status is failed """
            ver_status_obj["verification_status"] = "not_verified"
    else:
        """ the db ver object is null this means errors occured while saving the code to the DataBase."""
        print(' the db object is null this means errors ocured while saving the code to database, No users have been registered.')
        ver_status_obj['verification_status'] = 'not_verified'
        
    # the verification table has the folowing keys ('user_email', 'session_id', 'ver_code'),  the request data has the folowing keys ('email', 'user_name', 'session_id', 'password', 'ver_code')
        
    print("verfication_status is : {}".format(ver_status_obj['verification_status']))

    return make_response(jsonify(ver_status_obj), 200)


@app_views.route('/login', methods=['POST'],
                 strict_slashes=False)
def login():
    """ handle the login """
    if not request.is_json:
        abort(400, 'Not a JSON')
    data = request.get_json()
    
    # check if the user credentials are ok.
    login_creds_check_obj = login_creds_check(data) # this will check the credentials,in case of 'passed'(will return a login_token, this will be stored in the browser local_storage, and will be removed when logout[the token remove state can be sent back here, for the active sessions counting (number of current logedin users.)] )

    print("status_obj is : {}".format(login_creds_check_obj)) # login_creds_check_obj will have two keys (login_creds_check, logn_token), values will be set by login_creds_check(data).
    return make_response(jsonify(login_creds_check_obj), 200)

@app_views.route('/check_if_email_exist', methods=['POST'],
                 strict_slashes=False)
def check_if_email_exist():
    """ this checks if the provided email (for password reset) does exist in the Database"""
    if not request.is_json:
        abort(404, 'Not a JSON')
    data = request.get_json()
    checked_email = data['provided_email']
    
    status  = check_email_in_db(checked_email)

    email_availability_status = {}
    
    if status:
        print('the provided email does exist in the DataBase.')
        email_availability_status['availability'] = 'True'
        reset_email_obj = compose_reset_email(checked_email)
        # in here we gonna send the email object returned from the compose reset_email
        reset_email_json = json.dumps(reset_email_obj)
        res = requests.post('http://0.0.0.0:5000/api/v1/send_ver_code', json = reset_email_json).content

        res_data = json.loads(res.decode('utf-8'))
        if res_data['status'] == "500":
                print('Errors encountred while sending the email.')
        else:
                print('The email was sent successfully')

        return make_response(jsonify(email_availability_status), 200)
    else:
        email_availability_status['availability'] = 'False'
        print('the provided email doesnt exist on the DataBase.')     
        return make_response(jsonify(email_availability_status), 200)

@app_views.route('/reset_password', methods=['POST'], strict_slashes=False)

def reser_password_endpoint():
    """ this is the password-reset api endpoint """
    if not request.is_json:
        abort(406, 'Not a JSON')
    data = request.get_json()
    print('we got: {}'.format(data))
    if data['new_password'] != data['new_password_conf']:
        print('passwords dont match')
        return make_response(jsonify({'password_check':'Failed', 'password_changed': 'null', 'token_status': 'null'}), 200)
    changed_status = update_password(data)
    return make_response(jsonify({'password_check':'Passed', 'password_changed': changed_status['password_changed'], 'token_status': changed_status['token_status']}), 200)