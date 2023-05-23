import webapp2 

import urllib2 

import json 

class mainpage(webapp2.RequestHandler):
    def get(self):

        self.response.write("<html><body>") 
        self.response.write("<h1> Table Input</h1>") 
        self.response.write('<form action="/result" method="post">') 
        self.response.write('Enter Number1 : <input type="text" name="num"><br><br>') 
        self.response.write('<input type="submit" value="submit">') 
        self.response.write("</form></body></html>") 

    
class resultpage(webapp2.RequestHandler):
    def post(self):

        num = self.request.get('num') 
        num = int(num) 

        for i in range(1,11):
            self.response.write(str(num) + " " + "X " + str(i) + " = " + str(num*i) + "<br>") 
        


    

app = webapp2.WSGIApplication(
    [('/',mainpage),('/result',resultpage)],
    debug = True
)