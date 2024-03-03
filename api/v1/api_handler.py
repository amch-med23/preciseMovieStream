#!/usr/bin/env python3
""" this handles the external API operations """

import requests
import json
import csv

def get_random_result():
    """ this gets random results from the API."""
    omdb_api = "https://www.omdbapi.com/?apikey=5fa754f9"
    omdb_img_api = "https://img.omdbapi.com/?apikey=5fa754f9"
    # the poster_image_api, might not be used since the result on themain api endpoint has 'poster' key
    #ok, i will create list, of imdb lists. movies_lists (5 or 6 for now)
    #then extract ids from these lists, and append them to a nother list, called [available movies id].
    # this last list will contain all the media ids, and this will be used to retreive movies.
    # this approach will consume too many reuests, since we are allowed only 1000 daily limit.(free version).
    

    return

def media_infos(obj):
    """ gets data qbput a specific movie by name and year and a plot """
    omdb_api = "https://www.omdbapi.com/?apikey=5fa754f9"
    
    title = obj['title'].replace(' ', '+')
    year = str(obj['year'])
    plot = obj['plot']
    final_url = omdb_api + '&t=' + title + '&y=' + year + '&plot=' + plot
    # requesting the resource from the Omdb.
    res = requests.get(final_url)
    cont = res.content
    data = json.loads(cont.decode('utf-8'))
    
    available_data_keys = []
    
    for k, v in data.items():
        available_data_keys.append(k)
   # print("from-script available keys: {}".format(available_data_keys))

    return data

if __name__ == "__main__":
    """ invoking the script directelly """
    print("invoking...")
    obj = {'title': 'philadelphia', 'year': '', 'plot': 'short'}
    ret_data =  media_infos(obj)
    if ret_data['Response'] == 'True':
        print("response payload is: {}".format(ret_data))
    else:
        print("{}".format(ret_data['Error']))
    # we must base the check on the 'Response' value, True means we have a hit, false means no movies found
