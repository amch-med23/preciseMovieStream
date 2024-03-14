#!/usr/bin/env python3
""" this is the email handler file, this contains the hundler function """

from random import randint
import json
import requests
from flask import jsonify
from flask_mail import Message, Mail
from models.storage_engine.DB_handler import *
import aiohttp
import threading
import logging
from api.v1.app import app

logging.basicConfig(level=logging.DEBUG)

mail = Mail(app) # mail as a Mail instance in here

def handle_email(session_id, user_email):
        """ we generate a 6 digit number and we send an email containing it + 
        we save the resulted object the storage engine"""
        print("we sent email to : {}, the email contains a 6 digit verification code, generated only for this session id: {}".format(user_email, session_id));
        # creating random 6 digits number
        ver_digit = 0
        ver_digit = randint(0, 999999)
        ver_code = str(ver_digit).zfill(6)

        print("the verification code is: {}".format(ver_code))
        session_id = str(session_id)
        # now we send an email containing this code. to the address "user_email", using a template.

        ver_code_obj = {}
        ver_code_obj['ver_code'] = str(ver_code)
        ver_code_obj['user_email'] = str(user_email)
        ver_code_obj['email_subject'] = 'Presice Movie Stream email verification code.'
        ver_code_obj['email_html'] = '<html><head><div style="color: black; font-size: small;">Precise Movie Stream, a movie recommendation system.</div></head><body><div style="margin: 15px; color: black"><h> Welcom <h style="color: #f34a4a"> '+ user_email +' </h> , we have noticed that you tried to register an account with us. This is your email verification code : <h style="color:  #f34a4a;">'+ str(ver_code) +'</h> </h></div></body><footer><h style="font-size: small; color: black">If you did not request this, you can safely ignore this email.</h></footer></html>'
        
        """this was composed in order to send it via http POST request"""
        ver_code_json = json.dumps(ver_code_obj) 
        #print("this is the verification object in json: {}" .format(ver_code_json))
        # here we send the mail
        
        try:
                msg = Message(subject=ver_code_obj['email_subject'], sender='no-replay@losag.tech', recipients=[ver_code_obj['user_email']])
                msg.html = ver_code_obj['email_html']
                mail.send(msg)
                print('The verification email was sent successfully.')

        except Exception as e:
                print('Error occured while sending the verification mail: {}'.format(e))


        # generating the verification code object
        ver_email_obj = {"session_id": str(session_id), "user_email": user_email, "ver_code": str(ver_code)}

        # then we store it in the data base
        save_ver_code(ver_email_obj) 
        
        #threading.Thread(target=calling_send_email_thread, args=(ver_code_json,)).start()

if __name__ == "__main__":
        """ invoke directelly"""
        handle_email("12345", "example_amch1@email.com")
