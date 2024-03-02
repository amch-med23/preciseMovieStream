#!/usr/bin/env python3
from api.v1.views import app_views
from flask import jsonify, make_response, request, abort 
import json
import uuid
from api.v1.data_checker import data_check
from api.v1.email_handler import handle_email
from api.v1.login_handler import login_creds_check

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
        # the above function will generate the 6 digit ver_code and send the email + we save the email verification instance in a didicated Database table

        return make_response(jsonify({"email_check":"passed", "password_check":"passed", "user_email": user_email, "session_id": session_id}), 200)

    else:
    	# when there is an error in the data.
        return make_response(jsonify(check_obj), 200)
    

@app_views.route("/verify_email", methods=['POST'],
                 strict_slashes=False)
def email_verify():
    """ here we generate a random 8 digits number and we send them to the user email, to verify."""
    if not request.is_json:
        abort(400, 'Not a JSON')

    data = request.get_json()
    # in here we will read from the storage engine the obj with the requested session_id and user_email.
    # then we will verifi the value of the 'ver_digit' associated with the keys ('session_id', 'user_email')
    # and we compare it with the what the user inputed from the fron-end.

    # in here we need to read the email_verification_table from the Database, and we fetch data according to the data['user_email']

    with open('email_ver_list', 'r', encoding='utf- 8') as f:
        email_file_obj = f.read()
        email_ver_obj = json.loads(email_file_obj)

    print("we got the confirmation from the front_end as : {}".format(data))
    print("we got the confirmation from the database as : {}".format(email_ver_obj))
    # after checking 'data' against 'email_ver_obj', we return the 'verification_status' value ['verified', 'not_verified']
    ver_status_obj = {}
    
    # the verification table has ('user_email', 'session_id', 'ver_code'),  the request data has('email', 'user_name', 'session_id', 'password', 'ver_code')
    if data['email'] == email_ver_obj['user_email'] and data['session_id'] == email_ver_obj['session_id'] and data['ver_code'] == email_ver_obj['ver_code']:
        # this will check the keys, values in both.
        ver_status_obj["verification_status"] = "verified"

        user_obj = {}
        user_obj['email'] = data['email']
        user_obj['password'] = data['password']
        user_obj['user_name'] = data['user_name']
        # when the user is verified, we gonna register him in the DB

        # register the user_obj to the database table of 'users' ('users' is the table where we store the registered users).
        
        print("we are registering this user {} to database.".format(user_obj))
        
    else:
        ver_status_obj["verification_status"] = "not_verified"

    print("verfication_status is : {}".format(ver_status_obj['verification_status']))

    return make_response(jsonify(ver_status_obj), 200)


@app_views.route('/login', methods=['POST'],
                 strict_slashes=False)
def login():
    """ handle the login """
    if not request.is_json:
        abort(400, 'Not a JSON')
    data = request.get_json()
    print("we got this: {}".format(data))
    # check if the user credentials are ok.
    login_creds_check_obj = login_creds_check(data) # this will check the credentials,in case of 'pssed'(will return a login_token, this will be stored in the browser local_storage, and will be removed when logout[the toen remove state can be sent back here, for the active sessions counting (number of current logedin users.)] )

    print("status_obj is : {}".format(login_creds_check_obj)) # login_creds_check_obj will have two keys (login_creds_check, logn_token), values will be set by login_creds_check(data).
    return make_response(jsonify(login_creds_check_obj), 200)


@app_views.route('/random_movies', methods=['GET'],
                 strict_slashes=False)
def random_results():
    """ getting the random content from the api. """
    if not request.is_json:
        abort(404, 'Not a JSON')

    return make_request(jsonify({'movis': 'some random content'}), 200)
