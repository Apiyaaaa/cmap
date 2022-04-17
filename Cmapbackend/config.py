# This Python file uses the following encoding: utf-8
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
username = '' # 数据库管理员用户名
password = '' # 数据库管理员密码
host = '' # 数据库地址
database = '' # 数据库名称
class Config:
    
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://%s:%s@%s/%s?charset=UTF8MB4' % (username, password, host, database)
    SQLALCHEMY_TRACK_MODIFICATION = False

app.config.from_object(Config)

db = SQLAlchemy(app)