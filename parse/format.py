# This Python file uses the following encoding: utf-8
from datetime import datetime
import re
def time_formater(input_time_str):
    input_format = '%a %b %d %H:%M:%S %z %Y'
    output_format = '%Y-%m-%d %H:%M:%S'

    return datetime.strptime(input_time_str, input_format).strftime(output_format)
    
def formatStr(str):
    str = str.replace('\n', '')
    str = str.replace('\t', '')
    str = str.replace('\r', '')
    str = re.sub("@\S+", " ", str)
    str = re.sub("#\S+", " ", str)
    str = re.sub("http\S+", " ", str)
    return str