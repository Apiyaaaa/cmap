# This Python file uses the following encoding: utf-8
import cpca
import pandas as pd
import re

# 用了cpca进行地址提取，虽然精度不高
def getLocation(str):
    location = cpca.transform([str])
    province = location['省'][0]
    city = location['市'][0]
    district = location['区'][0]
    address = location['地址'][0]
    data = {
        'province':province,
        'city':city,
        'district':district,
        'address':address
    }
    return data

# 提取手机号 如果没有返回空
def getphone(str):
    phone = re.findall(r'1[3-9]\d{9}',str)
    if len(phone) > 0:
        return phone[0]
    else:
        return None