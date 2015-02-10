Backbone = require 'backbone'
Backbone.$ = $ = require 'jquery'
Muscle = require 'muscle'

module.exports = Muscle.ModelView.extend do
  class-name: 'todo-item'
  tag-name: 'li'
  template: -> require '../templates/item'

  events:
    'change .check': 'done'
    'blur .description': 'edit'
    'click .remove': 'exclude'

  done: (e) ->
    @model.toggle-done-state!

  edit: (e) ->
    new-description = $ e.target .text!
    if new-description is not ''
      @model.edit new-description

  exclude: (e) ->
    e?.prevent-default?!
    @model.destroy!

