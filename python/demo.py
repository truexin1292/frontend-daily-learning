#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json
import random
import requests
def getimg():
    url = 'https://kyfw.12306.cn/passport/captcha/captcha-image64?login_site=E&module=login&rand=sjrand&{}'.format(random.random())
    headers = {'dataType':'jsonp','contentType':'application/json'}
    res =requests.get(url,headers=headers).json()['image']
    return res #第一步拿到bs4，传给getcheck()
def getcheck():
    bs4 = getimg() #第一个函数getimg() 传到这里勒
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36','Content-Type':'application/json'}
    data = json.dumps({"base64":bs4})
    api_url = requests.post('http://60.205.200.159/api',headers = headers,data = data).json()
    print(api_url)
    if api_url['success']: #如果为真，执行下面
        print('识别验证码成功')
        check = {'image':bs4,'token':api_url['check']}
        return check
    else: #如果为假，就再执行第一个函数
        print(u'识别验证码失败')
        getimg()
def getcode():
    img_vcode = getcheck()
    data = {
        "=": "",
        "check": img_vcode['token'],
        "img_buf": img_vcode['image'],
        "logon": 1,
        "type": "D"
    }
    url = 'http://check.huochepiao.360.cn/img_vcode'
    headers = {
        'Content-Type': 'text/plain',
        'Host': 'check.huochepiao.360.cn',
        'Referer': 'http://60.205.200.159/',
        'Origin': 'http://60.205.200.159',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
    }
    html = requests.post(url,headers = headers,data = json.dumps(data)).json()
    return html
if __name__ == '__main__':
    #拿到验证码的坐标了。
    print(getcode())
