Backbone = require 'backbone'
Backbone.$ = $ = require 'jquery'
home-view = require '../views/home'

module.exports = ->
  @layout = new home-view
  @layout.app = @
  $ \body .html @layout.el
  @layout.render!
