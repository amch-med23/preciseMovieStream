## This is the back-end production version of this flask app.
##### since WSGI servers like gunicorn handle imports and asyncronos operations differantelly from python, due to there spowners (the server spowns more than one worker to handle concurrent requests.)
    We have modified the back-end a littel bit to scope with that.
    
    -> Note: this modified version will throw import errors when executed with : 'python3 -m api.v1.app'
             this is due to the way gunicorn handles imports which is deferant from the way python does it.
    -> this module imports 'aiohttp': so you must install that package , 'pip install aiohttp'
    -> to run the module use: '~app_server/$ gunicorn --bind 0.0.0.0:5000 api.v1.app:app --access-logfile access.log --error-logfile error.log'

