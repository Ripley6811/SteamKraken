#!/usr/bin/env python

import os
import webapp2
from template_manager import render_template

# Load javascript files from these folders in this order. Ends with main program
game_files = [
    "ThirdParty/Box2dWeb-2.1.a.3.min.js",
    "ThirdParty/easeljs-0.6.1.min.js",
    "ThirdParty/preloadjs-0.3.1.min.js",
    "ThirdParty/tweenjs-0.4.1.min.js",

    "Game/main.js",
]
game_canvas = [
    "canvas",
#    ,"debug"
]

class MainHandler(webapp2.RequestHandler):
    def get(self):
        # Information front page
        self.response.out.write(os.path.join(os.path.dirname(__file__), "main.py"))
        self.redirect("/gamemain")

class GameHandler(webapp2.RequestHandler):
    def get(self):
        # Game canvas page
        title = "Aelik: Fleet Runner"
        self.response.out.write(render_template("base.html", title=title, scripts=game_files, canvas=game_canvas))


app = webapp2.WSGIApplication([
    ('/', MainHandler),
#    ('/g_login', GLogin)
    ('/gamemain', GameHandler)
], debug=True)
