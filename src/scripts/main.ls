Backbone = require 'backbone'
Backbone.$ = $ = require 'jquery'

app = do ->
  Application = Backbone.Router.extend do
    start: ->
      Backbone.history.start!

    initialize: ->

    routes: require './routes'

  new Application

$ -> app.start!
