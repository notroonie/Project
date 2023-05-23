import webapp2 
import urllib2 

import json 


class Mainpage(webapp2.RequestHandler):
    def get(self):

        self.response.write("<html><body>")
        self.response.write("<h1> Weather Forecast </h1>") 
        self.response.write('<form action="/result" method="post">') 
        self.response.write('Enter Latitude : <input type = "text" name="latitude" ><br><br>') 
        self.response.write('Enter Longitude : <input type = "text" name="longitude" ><br><br>') 
        self.response.write('<input type = "submit" value="submit">') 
        self.response.write("</form></body></html>")


class resultpage(webapp2.RequestHandler):
    def post(self):
        latitude = self.request.get('latitude') 
        longitude = self.request.get('longitude') 
        

        flag = 0 
        # self.response.write(latitude)
        for i in latitude:
            if ((ord(i)>=48 and ord(i)<=57) or (i=='.')):
                continue
            else:
                flag=1

        for i in longitude:
            if ((ord(i)>=48 and ord(i)<=57) or (i=='.')):
                continue
            else:
                flag=1 
        
        if (flag):
            self.response.write('<html><body>') 
            self.response.write('<h1>ERROR LAVDA</h1>') 
            self.response.write('<p> Jaake vapas form bhar lavde</p>') 
            self.response.write('</body></html>')
        else:
            url = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + "&longitude=" + longitude + '&hourly=temperature_2m'
            # self.response.write(url)

            response = urllib2.urlopen(url).read()
            data = json.loads(response) 
            # self.response.write(data) 
            # self.response.write("<br>")
            # self.response.write(data['hourly'])

            x = len(data['hourly']['time']) 
            for i in range(x):
                self.response.write("DATE : " + str(data['hourly']['time'][i])[0:10] + " TIME : " + str(data['hourly']['time'][i])[11:] + " TEMP : " + str(data['hourly']['temperature_2m'][i])) 
                self.response.write("<br>") 

                 

        


app = webapp2.WSGIApplication(
    [("/",Mainpage),("/result",resultpage)],
    debug = True
)