Backbone = require 'backbone'
Backbone.$ = $ = require 'jquery'
Muscle = require 'muscle'
list-view = require '../views/list'
Todos = require '../collections/todos'

module.exports = Muscle.View.extend do
  id: 'to-do-list-app'
  tag-name: 'div'
  template: -> require '../templates/home'

  events:
    'submit .create-todo': 'add'

  DOMControl: ->
    @list = new list-view collection: new Todos
    @list.app = @app
    console.log @$el
    @$el.append @list.el
    @list.render!

  add: (e) ->
    e?.prevent-default?!
    $input = $ e.target .find 'input'
    text = $input.val!
    if text is not ''
      @list.collection.push description: text
      $input.val ''
