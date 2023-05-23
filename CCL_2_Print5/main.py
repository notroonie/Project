import webapp2


class Mainpage(webapp2.RequestHandler):
    def get(self):

        # self.response.write("Naman : Naman Damani")
        for i in range(5):
            self.response.write("Naman : Naman Damani<br>")
            self.response.write("Dept : IT<br>")
            self.response.write("Seat No : T190058547<br>") 
    




app = webapp2.WSGIApplication(
    [("/",Mainpage)], 
    debug=True
)