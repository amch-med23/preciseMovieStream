#!/usr/bin/env python3
""" This module will handle the storage operations,
      this will use the app_context to access and use the current flask app instance"""

from api.v1.app import app
from flask_sqlalchemy import SQLAlchemy
 

#db = SQLAlchemy(app)
# the tables definition:
# there will be the following tables: 'ver_code_table', 'users_table', 'questionnaire_table', ''...
with app.app_context():
    db = SQLAlchemy(app)

    class users_table(db.Model):
        __tablename__ = 'users'
        id = db.Column('id', db.Integer, primary_key=True)
        user_name = db.Column('user_name', db.String(255))
        user_email = db.Column('user_email', db.String(255))
        password = db.Column('password', db.String(255))

    class ver_code_table(db.Model):
        __tablename__ = 'ver_code'
        id = db.Column('id', db.Integer, primary_key=True)
        session_id = db.Column('session_id', db.String(255))
        user_email = db.Column('user_email', db.String(255))
        ver_code = db.Column('ver_code', db.String(255))
    class questionnaire_table(db.Model):
        __tablename__ = 'questionnaires'
        id = db.Column('id', db.Integer, primary_key=True)
        questionnaire = db.Column('questionnaire', db.String(255))
        linked_email = db.Column('linked_email', db.String(255))

        # creating all the tables if they are not already created.
        
    db.create_all()

    def get_users():
        """ this will get all the users from the Database"""
        with app.app_context():
            users_db_obj = []
            data_users = users_table.query.all()
            for instance in data_users:
                instance_dict = {column.name: getattr(instance, column.name) for column in instance.__table__.columns}
                users_db_obj.append(instance_dict)
            print('this is the returned users from the database {}'.format(users_db_obj))
            return users_db_obj

    def register_user(user_obj):
        """ this will register a user in the databse"""
        with app.app_context():
            print('we are in database handler, we are saving this: {}'.format(user_obj))
            new_row = users_table(**user_obj) 
            db.session.add(new_row)
            db.session.commit()
            return 'the provided user obj was registered to the DataBase'

    def save_ver_code(ver_code_obj):
        """ this will save the ver_code_obj to the required table """
        with app.app_context(): # explicitelly establishing the app context within each function
            #print('we are in DB_handler we are saving this ver_code object {}'.format(ver_code_obj))
            new_row = ver_code_table(**ver_code_obj)
            db.session.add(new_row)
            db.session.commit()
            return 'we have saved ver_code_obj to the appropriate table'

    def get_ver_codes():
        """ this will return all the ver_code_objs from the correct table"""
        with app.app_context():
            ver_code_obj = []
            data_ver_code = ver_code_table.query.all()
            for instance in data_ver_code:
                instance_dict = {column.name: getattr(instance, column.name) for column in instance.__table__.columns}
                ver_code_obj.append(instance_dict)
            #print('this is what we have returned from the ver_code_table in DB {}'.format(ver_code_obj))
            return ver_code_obj 


