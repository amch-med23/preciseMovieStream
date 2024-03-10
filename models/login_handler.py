#!/usr/bin/env python3
""" this is a login credential checker """

import uuid
from models.storage_engine.DB_handler import get_users

def login_creds_check(data):
    """ this checks the passed dict attributes against the Database 'users' table content """
    # the data has two attributes, 'user_email', 'user_password'. we need to get the result of the 'users' table from Database and check agains the resulted dictionary for matches in 'user_emails' and the corresponding 'user_password'. this returns a dict with two keys ['login_creds_check' ('passed', 'failed'), 'login_token' ('', 'str(uuid.uuid4)')]

    login_creds_obj = {}
    reg_users = [] # will contain the Database 'users' table content.
    # we make a dictionary from the results of 'users' table and store it in reg_users.
    # this is just a test data, for now.
    reg_users = get_users()

    # now we check the passed data dict.
    #print("the DB users list is: {}".format(reg_users))

    i = 0
    print(len(reg_users))
    while i < len(reg_users):
        """ check the data attr"""
        if data['user_email'] == reg_users[i]['user_email'] and data['user_password'] == reg_users[i]['password']:
            # generate the uuid.uuid4 and assign it to 'login_token'
            # set 'login_creds_check' to 'pass'
            # add this to login_creds-obj and return it.
            login_token = uuid.uuid4()
            login_creds_obj['login_token'] = str(login_token)
            login_creds_obj['login_creds_check'] = 'passed'
            login_creds_obj['user_name'] = reg_users[i]['user_name']
            login_creds_obj['user_email'] = reg_users[i]['user_email']
            
            return login_creds_obj
        i = i + 1

    # if we got here, this means the credentials the user passed aren't in the Database.
    login_creds_obj['login_token'] = ''
    login_creds_obj['login_creds_check'] = 'failed'
    login_creds_obj['user_name'] = ''

    return login_creds_obj

if __name__ == "__main__":
    data = {'user_email': 'reg3@email.com', 'user_password': 'password3'}
    result_obj = login_creds_check(data)
    print("the login creds status is: {} , and the login_token is : {}".format(result_obj['login_creds_check'], result_obj['login_token']))
