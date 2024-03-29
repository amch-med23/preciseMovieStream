#!/usr/bin/env python3
""" this is the email handler file, this contains the hundler function """

from random import randint
import json
import requests
from flask import jsonify
from models.storage_engine.DB_handler import *

def handle_email(session_id, user_email):
        """ we generate a 6 digit number and we send an email containing it + 
        we save the resulted object the storage engine"""
        print("we sent email to : {}, the email contains a 6 digit verification code, generated only for this session id: {}".format(user_email, session_id));
        # creating random 6 digits number
        ver_digit = 0
        while (len(str(ver_digit)) <= 6 ):
                ver_digit = randint(0, 999999)
                if(len(str(ver_digit)) == 6):
                        ver_code = ver_digit
                        break
        print("the verification code is: {}".format(ver_code))
        session_id = str(session_id)
        # now we send an email containing this code. to the address "user_email", using a template.

        ver_code_obj = {}
        ver_code_obj['ver_code'] = str(ver_code)
        ver_code_obj['user_email'] = str(user_email)
        ver_code_obj['email_subject'] = 'Presice Movie Stream email verification code.'
        ver_code_obj['email_html'] = '<html><head><div style="color: black; font-size: small;">Precise Movie Stream, a movie recommendation system.</div></head><body><div style="margin: 15px; color: black"><h> Welcom <h style="color: #f34a4a"> '+ user_email +' </h> , we have noticed that you tried to register an account with us. This is your email verification code : <h style="color:  #f34a4a;">'+ str(ver_code) +'</h> </h></div></body><footer><h style="font-size: small; color: black">If you did not request this, you can safely ignore this email.</h></footer></html>'
        
        ver_code_json = json.dumps(ver_code_obj)
        print(ver_code_json)
        
        res = requests.post('http://0.0.0.0:5000/api/v1/send_ver_code', json = ver_code_json).content

        res_data = json.loads(res.decode('utf-8'))
        
        
        if res_data['status'] == "500":
                print('Errors encountred while sending the email.')
        else:
                print('The email was sent successfully')
        
        # now the generation is done, we will create the 'ver_email_obj', and we will store it, then return it.
        ver_email_obj = {"session_id": str(session_id), "user_email": user_email, "ver_code": str(ver_code)}

        # storing in the appropriat DataBase table.
        """ this saves the ver_email_obj in 'cer_code' table, 
        we need to select by session id sinse the email can be duplicated (multiple unsuccessul email verificatin attempts)"""
        
        save_ver_code(ver_email_obj) 
        

if __name__ == "__main__":
        """ invoke directelly"""
        handle_email("12345", "example_amch1@email.com")
