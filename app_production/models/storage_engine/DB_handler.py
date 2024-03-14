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

    class reset_object_table(db.Model):
        __tablename__ = 'reset_tokens'
        id = db.Column('id', db.Integer, primary_key=True)
        email_address = db.Column('email_address', db.String(255))
        reset_token = db.Column('reset_token', db.String(255))
        creted_time = db.Column('request_date', db.DateTime)
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
    # This was done to limit the data the ver_code_obj table holds (after a successful register attempt)
    def delete_ver_obj(instance_session_id):
        """ this delets the ver_object nstance from the table based on its session_id """
        with app.app_context():
            row = ver_code_table.query.filter_by(session_id=instance_session_id).first()
            if row:
                db.session.delete(row)
                db.session.commit()
                print('we have successfully deleted this verification object {}'.format(row))
                return True
            print('failed to remove the specified verification object')
            return False
        
    def update_password_db(user_instance):
        """ this will update the password for a given gmail account """
        with app.app_context():
            instance_email = user_instance['email_address']
            new_password = user_instance['new_password']
            # getting the specified row.
            row = users_table.query.filter_by(user_email=instance_email).first()
            if row:
                setattr(row, 'password', new_password)
                db.session.commit()
                print('password updated successfully for {}'.format(row))
                return True # for testing, returning this as false
            print('password update failed.')
            return False

    def check_email_in_db(email):
        """ this checks if the email is in the registered users table.
        True: if the email is there.
        False: if the email is not there."""
        with app.app_context():
            row = users_table.query.filter_by(user_email=email).first()
            if row:
                return True
            return False
    
    def store_reset_token(reset_token_obj):
        """ this wil store the reset token object in the specified table """
        with app.app_context():
            new_row = reset_object_table(**reset_token_obj)
            db.session.add(new_row)
            db.session.commit()
            print('we have saved the reset object in the database successfully')

    def get_reset_tokens():
        """ this returns a list of reset tokens from the Database (used to define the validity o the link)"""
        with app.app_context():
            reset_token_obj = []
            values = reset_object_table.query.with_entities(getattr(reset_object_table, 'reset_token')).all()
            column_values = [value[0] for value in values]
            return column_values