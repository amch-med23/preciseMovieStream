#!/usr/bin/env python3
""" this is checking the data passed from the register view """
# we need to import storage, in order to retreive the registered users in the system.(for email checking)

from models.storage_engine.DB_handler import get_users

def data_check(data_obj):
    """ checks the user register data passed by object. """

    new_obj = {'password_check':'', 'email_check':''}
    
    user_email = data_obj['email']
    user_passwd = data_obj['password']
    user_passwd_conf = data_obj['password_conf']
    # we will have two main attributes, 'email_check' and 'password_check'.
    if user_passwd != user_passwd_conf:
        """ we add the failed attribute to the 'password_check' key."""
        new_obj['password_check'] = 'failed'
        print("the password is not valid")

    else:
        new_obj['password_check'] = 'passed'
        print("the password is valid")

    # retreaive the users list from the DB.
    db_users_list = get_users() # awiting get_users
    
    db_email_list = []
    # retreives the emails and check against the user provided email
    for instances in db_users_list:
        db_email_list.append(instances['user_email'])
    
    if user_email in db_email_list:
        """ we add the failed attribute to the 'email_check' key. """
        new_obj['email_check'] = 'failed'
        print("the email is not valid")

    else:
        """ we add the passed value to """
        print("the email is valid")
        new_obj['email_check'] = 'passed'

    return new_obj


if __name__  == "__main__":
    """ invoke the code directelly. """
    data_obj = {'email': 'example@email.com', 'password':'1234567', 'password_conf':'1234567'} # test data
    result = data_check(data_obj)
    print("the result after invoking the code is : {}". format(result))
