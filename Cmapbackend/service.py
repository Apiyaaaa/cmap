# This Python file uses the following encoding: utf-8
from model import *
from config import *
import json
from datetime import datetime

# 获取200条distinct并且有定位的数据
def getdata():
    response = []
    data = db.session.query(weibo).group_by(weibo.wid).order_by(weibo.publish_time).filter(weibo.location != None).limit(200).all()
    for i in data:
        location = slicelocation(i.location)
        sub_data = {
            'id': i.id,
            'wid': i.wid,
            'text': i.text,
            'publish_time': datetime.strptime(i.publish_time,'%Y-%m-%d %H:%M:%S'),
            'address': i.address,
            'province': i.province,
            'city': i.city,
            'district': i.district,
            'longitude': location[0],
            'latitude': location[1],
            'contact': i.contact
        }
        response.append(sub_data)
    return response
# 处理location 分割成lng 和 lat
def slicelocation(location):
    longitude = location.split(',')[0]
    latitude = location.split(',')[1]
    return [longitude, latitude]
