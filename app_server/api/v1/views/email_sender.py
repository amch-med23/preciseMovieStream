#!/usr/bin/python3


from flask import request, abort, jsonify, make_response
from flask_mail import Mail, Message
from api.v1.app import app
import json
from api.v1.views import app_views
import threading
import requests

mail = Mail(app)

# Imortant Note:
""" This route is depricated, since we are now handelling the emails sending functionalities with each model. (the Mail instance (mail) is defined in models.email_handler) """

@app_views.route('/send_ver_code', methods=['POST'])

async def send_ver_code():
        """ sends the email to the recipiant """
        if not request.is_json:
                abort(406, 'Not a JSON')
                        
       
        status_code = 0
        try:
                print('inside send_email (before composition and sending.)')
                res = request.get_json()
                data = json.loads(res)
                 
                user_email = data['user_email']
                email_content = data['email_html']
                email_subject= data['email_subject']
                #print('email content is: {}'.format(email_content))
                msg = Message(subject=email_subject, sender='no-replay@losag.tech', recipients=[user_email])
                msg.html = email_content
                print('callin the async send_amil')
                await send_mail_async(msg)
                print('after calling async send mail')

                return True
                """status_code = 200
                status_json = {}
                status_json['sending_status'] = status_code
                requests.post('http://127.0.0.1:5000/api/v1/send_status', json = status_json)"""
                print('inside send_email (after composition and sending.)')
                
        
        except Exception as e:
                print('Error occured inside mail_sender view: {}'.format(e))
                """status_code = 500
                status_json = {}
                status_json['sending_status'] = status_code
                requests.post('http://127.0.0.1:5000/api/v1/send_status', json = status_json)"""
                return False
                
                        
async def send_mail_async(msg):
        """ sending mail asyncronosly """

        with app.app_context():
                try:
                        mail.send(msg)
                except Exception as e:
                        print('Error occuured inside async msg sending : {}'.format(e))


if __name__ == "__main__":
        print('invoking...')
        
