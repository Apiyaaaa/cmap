# This Python file uses the following encoding: utf-8
import requests
import json
import random
from time import sleep

# 这里用了高德的api
def requestgaode(data):
    error_count = 0
    address = None
    no_address = None
    if data.get('address') != None:
        address = data.get('address')
    if data.get('province') != None:
        no_address = data.get('province')
        if data.get('city') != None:
            no_address += data.get('city')
            if data.get('disctrict') != None:
                no_address += data.get('disctricct')
    params = {
        'key': '', # 这里是你的key,需要申请高德开发者平台
        "address": address,
    }
    n_a_params = {
        'key': '', # 这里是你的key,需要申请高德开发者平台
        "address": no_address,
    }
    url = "	https://restapi.amap.com/v3/geocode/geo"
    # 请求尝试
    while error_count < 3:
        try:
            if address != None:
                response = requests.get(url, params=params)
                response = response.json()
                if response.get('status') == '1':
                    print('【高德】地址解析成功')
                    return response.get('geocodes')[0]
            if no_address != None:
                response = requests.get(url, params=n_a_params)
                response = response.json()
                if response.get('status') == '1':
                    print('【高德】地址解析成功')
                    return response.get('geocodes')[0]
            error_count += 1
        except Exception as e:
            error_count += 1
            print('【地址转码】请求失败', e)
            sleep(random.randint(1, 3))
            continue
    return None
