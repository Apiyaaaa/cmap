# This Python file uses the following encoding: utf-8
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import db


class weibo(db.Model):
    __tablename__ = 'weibo_anticovid'
    id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    wid = db.Column(db.String(255))
    text = db.Column(db.String(2048))
    publish_time = db.Column(db.DateTime)
    address = db.Column(db.String(2048))
    province = db.Column(db.String(255))
    city = db.Column(db.String(255))
    district = db.Column(db.String(255))
    location = db.Column(db.String(255))
    contact = db.Column(db.String(25))