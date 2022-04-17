# This Python file uses the following encoding: utf-8
from parse import *
from dbcontrol import *

def run():
    since_id = ''
    while True:
        newest = getnewest()
        data = get_page(parse_page(since_id))
        if data:
            for item in data:
                write_to_db(item)
                since_id = item.get('wid')
                print('目前id为：', since_id, '\n最新为', newest)

                if item.get('wid') < newest:
                    print('【爬虫】爬到最新数据 五分钟后重新爬取')
                    since_id = ''
                    time.sleep(300)


if __name__ == "__main__":
    run()
