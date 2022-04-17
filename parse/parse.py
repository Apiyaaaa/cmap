# This Python file uses the following encoding: utf-8
import requests
from pyquery import PyQuery as pq
from requests.exceptions import RequestException
import json
import time
import random
import gaodeapi
from format import *
from parseinfo import getLocation, getphone

# 微博长文本不会在超话页显示，需要进入微博详情页（detail）获取
def parse_long_content(id):
    headers_longtext = {
        'Host': 'm.weibo.cn',
        'Referer': 'https://m.weibo.cn/status/' + str(id),
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Mobile Safari/537.36'

    }
    error_count = 0
    url = "https://m.weibo.cn/statuses/extend?id=" + str(id)
    while error_count < 5:
        try:
            response = requests.get(url, headers=headers_longtext)
            if response.status_code == 200:
                tmp = response.json().get('data').get('longTextContent')
                return pq(tmp).text()
        except RequestException:
            error_count += 1
            print('【长文本】请求失败', error_count, id)
            time.sleep(random.random())
            continue

# 根据since_id 获取 此id之后的十条（或者20条？）微博
# since_id 为'' 时，获取最新的微博
def parse_page(since_id):
    headers = {
        "Host": 'm.weibo.cn',
        "keep": "close",
        "Referer": "https://m.weibo.cn/p/index?containerid=10080889902a1e60cd81187b008223d86da809&extparam=%E6%8A%97%E7%96%AB%E6%B1%82%E5%8A%A9",
        "User-Agent": 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Mobile Safari/537.36',
    }
    page_url = 'https://m.weibo.cn/api/container/getIndex?containerid=10080889902a1e60cd81187b008223d86da809_-_sort_time&extparam=%E6%8A%97%E7%96%AB%E6%B1%82%E5%8A%A9'
    params = {
        'since_id': since_id,
        'containerid': '10080889902a1e60cd81187b008223d86da809_-_sort_time',
        'page': 1
    }
    error_count = 0

    while error_count < 3:
        try:
            response = requests.get(page_url, headers=headers, params=params)
            if response.status_code == 200:
                print('【爬虫】页面爬取成功')
                return response.json()
        except RequestException:
            error_count += 1
            print('【爬虫】页面爬取失败', error_count)
            time.sleep(random.random())
            continue

# 解析数据
def get_page(json_data):
    all_data = []
    cards = json_data.get('data').get('cards')
    for item in cards:
        if item.get('card_type') == "11" and isinstance(item.get('card_group'),list) and len(item.get('card_group'))>0:
            for groups in item.get('card_group'):
                sub_item = groups.get('mblog')
                if sub_item and sub_item.get('isLongText'):
                    tmp = parse_long_content(sub_item.get('id'))
                    data = {
                        'wid': sub_item.get('id'),
                        'text': formatStr(tmp),
                        'publish_time': time_formater(sub_item.get('created_at')),
                    }
                    # data['geocode'] = baiduapi.getInfo(data.get('text'))
                    data['address'] = gaodeapi.requestgaode(getLocation(data.get('text')))
                    data['contact'] = getphone(data.get('text'))
                    all_data.append(data)
                elif sub_item:
                    tmp = pq(sub_item.get('text')).text()
                    data = {
                        'wid': sub_item.get('id'),
                        'text': formatStr(tmp),
                        'publish_time': time_formater(sub_item.get('created_at')),
                    }
                    # data['geocode'] = baiduapi.getInfo(data.get('text'))
                    data['address'] = gaodeapi.requestgaode(getLocation(data.get('text')))
                    data['contact'] = getphone(data.get('text'))
                    all_data.append(data)
    return all_data