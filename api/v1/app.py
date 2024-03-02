#!/usr/bin/env python3
""" API entry point """

from flask_cors import CORS
from flask import Flask, jsonify, make_response
from api.v1.views import app_views


app = Flask(__name__)
app.url_map.strict_slashes = False
cors = CORS(app, resources= {r'/*': {'origins': '*'}})

app.register_blueprint(app_views, url_prefix='/api/v1')

@app.errorhandler(404)
def not_found(e):
    return {"error":"Not Found"}, 404


if __name__ == "__main__":
    "invoking the script directely"
    app.run("127.0.0.1", "5000", threaded=True)
