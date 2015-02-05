Backbone = require 'backbone'

module.exports = Backbone.Model.extend do
  defaults:
    done: no

  toggle-done-state: ->
    already-done = @get \done
    @set done: if already-done then no else yes

  edit: (new-description) ->
    old-description = @get \description
    @set description: new-description if new-description is not old-description
