#!/usr/bin/env python3
""" this handles the external API operations """

import requests
import json
import csv
import os
import random

def get_media_ids():
    """ this gets random results from the API."""
    
    omdb_api = "https://www.omdbapi.com/?apikey=5fa754f9"
    omdb_img_api = "https://img.omdbapi.com/?apikey=5fa754f9"
    # the poster_image_api, might not be used since the result on themain api endpoint has 'poster' key
    #ok, i will create list, of imdb lists. movies_lists (5 or 6 for now)
    #then extract ids from these lists, and append them to a nother list, called [available movies id].
    # this last list will contain all the media ids, and this will be used to retreive movies.
    # this approach will consume too many reuests, since we are allowed only 1000 daily limit.(free version).

    imdb_list_1 = 'https://www.imdb.com/list/ls053951083/export'
    imdb_list_2 = 'https://www.imdb.com/list/ls081235533/export'
    imdb_list_3 = 'https://www.imdb.com/list/ls052535080/export'

    available_imdb_lists =[imdb_list_1, imdb_list_2, imdb_list_3]
    csv_data_all = []

    # generating the csv data if the file is not found.
    if not os.path.exists('csv_list_data'):      
        i = 0
        while ( i < len(available_imdb_lists)):
            data = requests.get(available_imdb_lists[i], stream=True).content.decode('utf-8')
            csv_data = csv.reader(data.splitlines(), delimiter=',')
            csv_data_all.append(list(csv_data))
        
            i = i + 1

        #writing the result to a file
        csv_data_json = json.dumps(csv_data_all)
        with open('csv_list_data' , 'w', encoding='utf-8') as f:
            f.write(csv_data_json)
    
    # reading from the csv file
    with open('csv_list_data', 'r') as f:
        file_data = json.load(f)

    final_ids_list = []
    
    #print('we got {} listsof movies.'.format(len(file_data)))
    for k in file_data:
        #print('we have each {}'.format(len(k)))
        for r in k:
            if r[1] != 'Const':
                final_ids_list.append(r[1])

    # i guess no need to save this list (final_ids_list) in a file, we ust gonna work with the csv parsing method.
    # but am doing it to keep data redundent.
    
    if not os.path.exists('imdb_ids'):
        with open('imdb_ids', 'w', encoding='utf-8') as f:
            json_list = json.dumps(final_ids_list)
            f.write(json_list) 
    
    available_media_ids = final_ids_list

    return available_media_ids

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

    return data

def recommended_movies():
    """ returning a random res of movies """
    return

def random_results():
    """gets random results"""

                                                                                                                    
    #i have avoided the use of the csv file directelly(retreiving the random objects from it directely) because of  
    # it's messy foramt and the absense of the Post value(the image url) this would have saved us API calls and will
    # help with the limit. but still we have scrapped 2182 ids, we are gonna select random 10 from them each time we
    # receive a request.                                                                                            

    omdb_api = "https://www.omdbapi.com/?apikey=5fa754f9"

    movies_ids = get_media_ids()
    random_movies_ids = random.choices(movies_ids, k=10) # getting random 10 elements.

    movies_obj_list = []
    for i in random_movies_ids:
        final_url = omdb_api + '&i=' + str(i)
        cont = requests.get(final_url).content
        movies_obj_list.append(json.loads(cont.decode('utf-8')))
    
    # now we take only the Poster (image), and the title of each element in the movies_obj_list and return we return them.
    final_random_movies_list = []
    
    k = 0
    while k < len(movies_obj_list):
        obj = {}
        for key, value in movies_obj_list[k].items():
            if key =="Title" or key == "Poster" or key == "Year":
                obj[key] = value
        final_random_movies_list.append(obj)        
        k = k + 1

    return final_random_movies_list


if __name__ == "__main__":
    """ invoking the script directelly """
    print("invoking...")
    imdb_ids = get_media_ids()
    for k in imdb_ids:
        print('id: {}'.format(k))
    print('len is: {}'.format(len(imdb_ids)))
    # we must base the check on the 'Response' value, True means we have a hit, false means no movies found
