import webapp2

class Mainpage(webapp2.RequestHandler):
    def get (self):

        for i in range(1,11):
            self.response.write(10)
            self.response.write("X")
            self.response.write(i)
            self.response.write("=")
            self.response.write(10*i)
            self.response.write("<br>")


app = webapp2.WSGIApplication(
        [("/",Mainpage)],
        debug = True
    )