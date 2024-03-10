#!/usr/bin/python3


from flask import request, abort, jsonify, make_response
from flask_mail import Mail, Message
from api.v1.app import app
import json
from api.v1.views import app_views


@app_views.route('/send_ver_code', methods=['POST'])

def send_ver_code():
        """ sends the email to the recipiant """
        with app.app_context():
                if not request.is_json:
                        abort(406, 'Not a JSON')
                        
                # mail is defined now inside the app_context
                status_code = 0
                try:
                        mail = Mail(app)
                        res = request.get_json()
                        data = json.loads(res)
                        ver_code = data['ver_code']
                        user_email = data['user_email']
                        email_content = data['email_html']
                        print('email content is: {}'.format(email_content))
                        msg = Message(subject='Your preciseMovieStream email verification code.', sender='no-replay@losag.tech', recipients=[user_email])
                        msg.html = email_content
                        mail.send(msg)
                        status_code = 200
                except KeyError:
                        status_code = 500
                        print("Errors are encountred in keys handelling")
                except Exception as e:
                        print('Error occured: {}'.format(e))
                        status_code = 500
                        
                return make_response(jsonify({'status': str(status_code)}), 200)

if __name__ == "__main__":
        print('invoking...')
        
