Backbone = require 'backbone'
Backbone.$ = $ = require 'jquery'
Muscle = require 'muscle'

module.exports = Muscle.ModelView.extend do
  class-name: 'todo-item'
  tag-name: 'li'
  template: -> require '../templates/item'

  events:
    'change input[type="checkbox"]': 'done'
    'click span': 'enabledEdit'
    'blur': 'edit'

  done: (e) ->
    @model.toggle-done-state!

  enable-edit: (e) ->
    @$el.attr \contenteditable, yes

  edit: (e) ->
    new-description = $ e.target .find 'span' .inner-text!
    if new-description is not ''
      @model.edit new-drecription

