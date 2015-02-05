Backbone = require 'backbone'

module.exports = Backbone.Model.extend do
  defaults:
    done: no

  toggle-done-state: ->
    already-done = @get \done
    @set done: if already-done then no else yes
