#!/usr/bin/env python3
""" this handles the results routes """

from flask import make_response, jsonify, abort, request
from api.v1.views import app_views
import json
from api.v1.api_handler import random_results
from api.v1.api_handler import media_infos
from api.v1.api_handler import recommended_movies

@app_views.route('/random_result', methods=['GET'],
                 strict_slashes=False)
def random_result():
    """ gets the random results from the external api"""
    result_list = get_random_result()
    result_obj = {}
    result_obj['result'] = result_list

    return make_response(jsonify(result_obj), 200)

@app_views.route('/movie_infos', methods=['POST'],
                 strict_slashes=False)
def movie_info():
    """gets infos about a movie"""
    if not request.is_json:
        abort(404, 'Not a JSON')

    obj_dict = {}
    data = request.get_json()
    obj_dict = media_infos(data)
    
    print("these are the requested media infos {}".format(obj_dict))
    
    return make_response(jsonify({'data': obj_dict}), 200)

@app_views.route('/movie_random', methods=['GET'],
                 strict_slashes=False)
def movie_random():
    """ returning a random number of Movies """

    data = {}
    data = random_results()
    
    if data:
        return make_response(jsonify({'movies_data': data, 'Response': 'True'}), 200)
    else:
        return make_response(jsonify({'movies_data': data, 'Response': 'False'}), 200)
