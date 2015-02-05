Backbone = require 'backbone'
Backbone.$ = $ = require 'jquery'
Muscle = require 'muscle'
item-view = require '../views/item'

module.exports = Muscle.CollectionView.extend do
  class-name: 'todo-list'
  tag-name: 'ul'
  model-view: item-view

