Backbone = require 'backbone'
Backbone.$ = $ = require 'jquery'
Muscle = require 'muscle'

module.exports = Muscle.ModelView.extend do
  class-name: 'todo-item'
  tag-name: 'li'
  template: -> require '../templates/item'

