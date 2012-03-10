var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', "text!templates/app_menubar.tmpl.html"], function($, _, Backbone, _view_menubar) {
  "use strict";  return ThreeNodes.AppMenuBar = (function(_super) {

    __extends(AppMenuBar, _super);

    function AppMenuBar() {
      this.on_link_click = __bind(this.on_link_click, this);
      AppMenuBar.__super__.constructor.apply(this, arguments);
    }

    AppMenuBar.template = _view_menubar;

    AppMenuBar.prototype.initialize = function() {
      var self,
        _this = this;
      this.$el.menubar();
      self = this;
      $("a", this.$el).click(function(event) {
        var url;
        if ($(this).next().is("ul")) return false;
        url = $(this).attr('href').substr(1);
        return self.on_link_click(event, this, url);
      });
      return $("#main_file_input_open").change(function(e) {
        return ThreeNodes.events.trigger("LoadFile", e);
      });
    };

    AppMenuBar.prototype.on_link_click = function(event, link, url) {
      var is_exception;
      is_exception = (function() {
        switch ($(link).text().toLowerCase()) {
          case "new":
            ThreeNodes.events.trigger("ClearWorkspace");
            Backbone.history.navigate("", false);
            return true;
          case "open":
            $("#main_file_input_open").click();
            return true;
          case "save":
            ThreeNodes.events.trigger("SaveFile");
            return true;
          case "export to code":
            ThreeNodes.events.trigger("ExportCode");
            return true;
          case "export image":
            ThreeNodes.events.trigger("ExportImage", "exported-image.png");
            return true;
          case "rebuild all shaders":
            ThreeNodes.events.trigger("RebuildAllShaders");
            return true;
          case "remove selected node(s)":
            ThreeNodes.events.trigger("RmoveSelectedNodes");
            return true;
          default:
            return false;
        }
      })();
      if (is_exception === true) {
        event.preventDefault();
        return true;
      }
      return true;
    };

    return AppMenuBar;

  })(Backbone.View);
});