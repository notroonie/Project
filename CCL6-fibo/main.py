import webapp2

class Mainpage(webapp2.RequestHandler):
    def get (self):

        a = 0
        b = 1

        for i in range(8):
           
            c = a+b

            self.response.write(c)
            a=b
            b=c

            self.response.write("<br>")
            


app = webapp2.WSGIApplication(
        [("/",Mainpage)],
        debug = True
    )