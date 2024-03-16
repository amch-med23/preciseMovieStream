#!/usr/bin/env python3
""" this handles the results routes """

from flask import make_response, jsonify, abort, request
from api.v1.views import app_views
import json
from models.api_handler import random_results
from models.api_handler import media_infos
from models.api_handler import recommended_movies
from models.api_handler import movies_imdb_ids

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

@app_views.route('/number_imdb_id', methods=['GET'],
                 strict_slashes=False)
def media_imdb_ids():
    """ get the number of available movies pool """
    num_imdb_ids = movies_imdb_ids()

    return make_response(jsonify({'num_imdb_ids': num_imdb_ids}), 200)

@app_views.route('/interests_quationair', methods=['POST'],
                 strict_slashes=False)
def interests_quationair():
    """ handles the quationares calls """
    if not request.is_json:
        abort(404, 'Not a json');

    data = request.get_json()

    final_res = recommended_movies(data) # in here we passe the drequest data to the function that has the algorithm for retreiving the results.
    # the returned results are of type dict , with 'keywords_result' and 'liked_movies_result' as keys and list of resulted dicts as values.
    if len(final_res['keywords_result']) == 0:
        final_res.update({'keywords_status': 'False'})
    else:
        final_res['keywords_status'] = 'True'
    if len(final_res['liked_movies_result']) == 0:
        final_res.update({'liked_movies_status': 'False'})
    else:
        final_res['liked_movies_status'] = 'True'
    
    print(final_res['keywords_result'])
    print('----------')
    print(final_res['liked_movies_result'])
    print('keywords_status {}, liked_movies_status {}'.format(final_res['keywords_status'], final_res['liked_movies_status']))

    return make_response(jsonify({'interests_result': final_res}), 200)
