#!/usr/bin/env python3
""" API entry point """

from flask_cors import CORS
from flask import Flask, jsonify, make_response, abort, request
from api.v1.views import app_views
from flask_mail import Mail

app = Flask(__name__)    
app.url_map.strict_slashes = False 
cors = CORS(app, resources= {r'/*': {'origins': '*'}})


# defining the app configurations for the emailing functionality
app.config['MAIL_SERVER'] = 'live.smtp.mailtrap.io'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'api'
app.config['MAIL_PASSWORD'] = '5c6e18c89607cad63b8d28123ef8bbde'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

if __name__ == "__main__":
    app.register_blueprint(app_views, url_prefix='/api/v1')

    @app.errorhandler(404)
    def not_found(e):
        return {"error":"Not Found"}, 404
    
    
    app.run("127.0.0.1", "5000", threaded=True)
