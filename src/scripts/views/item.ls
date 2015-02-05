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
    'click .remove': 'remove'

  done: (e) ->
    @model.toggle-done-state!

  edit: (e) ->
    new-description = $ e.target .text!
    if new-description is not ''
      @model.edit new-description

  remove: (e) ->
    e?.prevent-default?!
    if @model.collection
      @model.collection.remove [@model]
    else
      @model.destroy!
    @$el.remove!

