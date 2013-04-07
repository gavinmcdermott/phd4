Template.head.events({
  'keydown input.username' : function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      var playerName = $('input.username').val();
      var player = {name: playerName, score: 0};
      Players.insert(player);
      Session.set("current_player", player);
      amplify.store("current_player", player);
      console.log("You are: "+ player.name);
    }
  },
  'click .logout' : function() {
    var player = Players.findOne({"name": Session.get("current_player").name});
    Players.remove(player._id);
    Session.set("current_player", false);
  }
});

Template.head.current_player = function() {
  var player = Session.get("current_player");
  if (player) return player.name;
  else return false;
};

Template.head.sign_off = function() {
  var player = Players.findOne({"name": Session.get("current_player").name});
  Players.remove(player._id);
  Session.set("current_player", false);
};

Template.sidebar.players = function() {
  return Players && Players.find({}).fetch();
};

Meteor.startup(function() {
  Meteor.autorun(function() {
    var logged_in = amplify.store("current_player");
    Session.set("current_player", logged_in);
    if (logged_in) {
      console.log(logged_in);
      console.log("Sheeeeiit");
    }
  });
});