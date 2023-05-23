import webapp2 

import urllib2 
import json 

class Mainpage(webapp2.RequestHandler):
    def get(self):
        self.response.write("<html><body>") 
        self.response.write("<h1> Find Nearest Post Office</h1>")
        self.response.write('<form action="/result_1" method="post">') 
        self.response.write('Zip code : <input type = "text" name="zipcode"<br><br>') 
        self.response.write('<input type = "submit" value="submit">') 
        self.response.write("</form></body></html>")


class resultpage(webapp2.RequestHandler):
    def post(self):
        zipcode = self.request.get('zipcode')

        if (len(zipcode)!=6 or (not zipcode.isdigit())):
            self.response.write('<html><body>') 
            self.response.write('<h1>ERROR LAVDA</h1>') 
            self.response.write('<p> Jaake vapas form bhar lavde</p>') 
            self.response.write('</body></html>')

        else:
            
            url = 'https://api.postalpincode.in/pincode/' + zipcode 

            respone = urllib2.urlopen(url).read() 


            data = json.loads(respone) 

            if (data[0]["Status"] == 'Error'):
                self.response.write('<html><body>') 
                self.response.write('<h1>ERROR LAVDA1</h1>') 
                self.response.write('<p> Jaake vapas form bhar lavde</p>') 
                self.response.write('</body></html>')
            else:
                
                for i in data[0]['PostOffice']:
                    self.response.write("PinCode" + ": " + zipcode + "<br>") 
                    self.response.write("District" + ": " + i["District"]+ "<br>")
                    self.response.write("State" + ": " + i["State"]+ "<br>") 
                    self.response.write("Country" + ": " + i["Country"]+ "<br>")









app=webapp2.WSGIApplication(
    [("/",Mainpage),("/result_1",resultpage)],
    debug = True 
)
