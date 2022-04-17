# This Python file uses the following encoding: utf-8
from sqlalchemy import func
import pandas as pd
from sqlalchemy import create_engine, Table, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

username = '' #数据库管理员
password = '' #密码
host = ''
database = '' #数据库名字
engine = create_engine('mysql+pymysql://%s:%s@%s/%s?charset=utf8' % (username, password, host, database)) #这里用的mysql+pymysq
Base = declarative_base()
Base.metadata.create_all(engine)

# 定义数据类
class weibo_db(Base):
    __tablename__ = 'weibo_anticovid'
    id = Column(Integer, primary_key=True, autoincrement=True)
    wid = Column(Integer)
    text = Column(String(2048))
    publish_time = Column(DateTime)
    address = Column(String(2048))
    province = Column(String(100))
    city = Column(String(100))
    district = Column(String(100))
    location = Column(String(100))
    contact = Column(String(100))

    def __init__(self, **kwargs):
        for key in kwargs:
            if hasattr(self, key):
                setattr(self, key, kwargs[key])

#数据格式
def formatjson(json):
    # []value to none
    data = weibo_db()
    address = json.get('address')
    if address != None:
        for item in address:
            if address.get(item) == []:
                address[item] = None
    data.wid = json.get('wid')
    data.text = json.get('text')
    data.publish_time = json.get('publish_time')
    data.district = json.get('district')
    data.contact = json.get('contact')
    if address != None:
        data.address = address.get('formatted_address')
        data.province = address.get('province')
        data.city = address.get('city')
        data.location = address.get('location')

    return data

#写入数据库
def write_to_db(data):
    data = formatjson(data)
    session = sessionmaker(bind=engine)()
    session.add(data)
    session.commit()
    session.close()
    print('【数据】写入成功')

#获取数据库最新id
def getnewest():
    session = sessionmaker(bind=engine)()
    newest = session.query(func.max(weibo_db.wid)).scalar()
    session.close()
    print('更新最新id为：', newest)
    return newest