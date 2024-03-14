#!/usr/bin/env python3
""" this tests the db_handelling model"""

from api.v1.DB_handler import *

def main_test():
    """ main testing function """
    ver_code_obj = {'session_id': '123-12321-32sfa23-2131', 'user_email':'example@email.com', 'ver_code':'123412'}
    user_object = {'user_name': 'test_user1', 'user_email': 'example@email.com', 'password': 'password2024'}

    """ testing """
    print('saving users and ver_codes')
    ver_code_result = save_ver_code(ver_code_obj)
    save_user_result = register_user(user_object)

    print('retreiving the users and ver_codes objects from the database')
    get_users()
    get_ver_codes()

if __name__ == "__main__":
    print('direct invoccation ...')
    main_test() # all the returns are still empty for now.
