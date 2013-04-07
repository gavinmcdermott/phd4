Players = new Meteor.Collection("players");

if (Meteor.isClient) {
  Template.head.greeting = function () {
    return "Welcome to Picture-nary";
  };

  Template.head.events({
    'keydown input.username' : function (e) {
      // template data, if any, is available in 'this'
      if (e.keyCode === 13) {
        e.preventDefault();
        var playerName = $('input.username').val();
        var player = {name: playerName, score: 0};
        Players.insert(player);
        Session.set("current_player", player);
        console.log("You are: "+ player.name);
      }
    }
  });

  Template.head.current_player = function() {
    var player = Session.get("current_player");
    if (player) return player.name;
    else return false;
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });

  Meteor.methods({
  });
}
