var $ = require("jquery")
var Backbone = require("backbone")
var migawari = require("migawari")
var hljs = require("highlight.js")
var pd = require("pretty-data").pd


Backbone.$ = $;

var ResultView = Backbone.View.extend({
  el : ".result",
  refresh : function(text){
    var html = migawari(text).toString()
    html = pd.xml(html)
    this.$el.text(html)
    hljs.highlightBlock(this.$el.get(0))
  }
})
var MigawariView = Backbone.View.extend({
  initialize: function(){
    this.resultView = new ResultView()
    this.$input = $("input.selector")
  },
  el : ".console",
  events: {
    "keydown input.selector" : "refresh",
    "change input.selector" : "refresh"
  },
  refresh : function(){
    this.resultView.refresh(this.$input.val())
  },
})
var migawariView = new MigawariView()
migawariView.refresh()
