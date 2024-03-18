#!/usr/bin/env python3
""" init file """
from flask import Blueprint


app_views = Blueprint('app_views', __name__)

from api.v1.views.index import *
from api.v1.views.results import *
