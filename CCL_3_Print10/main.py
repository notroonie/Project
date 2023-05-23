import webapp2 

class Mainpage(webapp2.RequestHandler):
    def get(self):
        i = 0 
        while(i<10):
            self.response.write("Naman <br>") 
            self.response.write("IT <br>")  
            i+=1 
    
app = webapp2.WSGIApplication(
    [("/",Mainpage)],
    debug = True
)
