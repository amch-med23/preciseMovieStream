#!/usr/bin/env python3
""" this is the password reset model """
import uuid
from models.storage_engine.DB_handler import update_password_db, store_reset_token, get_reset_tokens
from datetime import datetime

def compose_reset_email(provided_email):
    """ in here we will compose the password reset email, and then send it. """
    reset_token = uuid.uuid4()
    pass_reset_obj = {}
    pass_reset_obj['user_email'] = provided_email
    pass_reset_obj['email_subject'] = 'Precise Movie Stream password reset.'
    pass_reset_obj['reset_token'] = str(reset_token)
    pass_reset_obj['email_html'] = '<html><head></head><body><div><h>Hey <h style="color: red; ">' + provided_email + '</h> we have been notified that you are trying to reset your password.</h><p style="margin: 10px;">Click on the button bellow to change your password.</p> <br><br> <a href="http://web-01.losag.tech/password_reset_process?user_email='+ provided_email +'&reset_token=' + str(reset_token)+'" style="margin: 10px; display: inline-block; padding: 0.4em 1.1em; background-color: #f34a4a; color: #ffffff; text-decoration: none; border-radius: 8px; border: 1px solid transparent; font-weight: 100; font-family: Fira Sans, Helvetica, Arial, sans-serif; cursor: pointer; transition: border-color 0.25s;" target="_blank" >reset your password</a> </div></body><footer><p style="font-size: small;">If you did not request this, you can safely ignore this email.</p></footer></html>'
    return pass_reset_obj

def update_password(data):
    """ this handles the password update in the database """

    password_update_obj = {}
    password_update_obj['email_address'] = data['user_email']
    password_update_obj['new_password'] = data['new_password']

    reset_token_obj = {}
    reset_token_obj['email_address'] = data['user_email']
    reset_token_obj['reset_token'] = data['reset_token']
    reset_token_obj['creted_time'] = str(datetime.now())
    """checking if this reset token is already in the databse, if it's there return errors."""
    # if the reset token is already in the data base we need to show that this reset link is not valid anymore.
    # else, we store the reset token in the database then we send the success responce.
    reset_tokens_list = get_reset_tokens()
    print('the stored reset tokens: {}'.format(reset_tokens_list))
    reset_obj = {}
    if data['reset_token'] in reset_tokens_list:   
        reset_obj['token_status'] = 'Expired'
        reset_obj['password_changed'] = 'False'
        return reset_obj
    else:
        reset_obj['token_status'] = 'Valid'
        returned_state = update_password_db(password_update_obj)
        if returned_state:
            reset_obj['password_changed'] = 'True'
        else:
            reset_obj['password_changed'] = 'False'
        store_reset_token(reset_token_obj) # this stores the reset token in the DB so this won't be used for another time.

        return reset_obj
