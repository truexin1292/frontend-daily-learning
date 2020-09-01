import requests

url = "https://db.leyaoyao.com/lyy/rest/group/distributor/login"

payload = 'userName=13168341703&password=e10adc3949ba59abbe56e057f20f883e'
headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Cookie': 'SESSION=d3899bbe-8cc5-404f-837a-96a796b76ad7'
}

response = requests.request("POST", url, headers=headers, data = payload)

print(response.text.encode('utf8'))
