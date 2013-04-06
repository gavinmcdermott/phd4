Players = new Meteor.Collection("players");

if (Meteor.isClient) {
  Template.head.greeting = function () {
    return "Welcome to phd4";
  };

  Template.head.events({
    'keydown input.username' : function (e) {
      // template data, if any, is available in 'this'
      if (e.keyCode === 13) {
        e.preventDefault();
        player = $('input.username').val();
        Session.set("current_player", player);
        console.log("You are: "+ player);
      }
    }
  });

  Template.head.current_player = function() {
    var name = Session.get("current_player");
    if (name) return name;
    else return false;
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
