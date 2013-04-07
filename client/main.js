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
      amplify.store("current_player", player);
      // State.findOne("signed_in")
      console.log("You are: "+ player.name);
    }
  }
});

Template.head.current_player = function() {
  var player = Session.get("current_player");
  if (player) return player.name;
  else return false;
};

Template.sidebar.players = function() {
  // console.log(Players && Players.find({}).fetch());
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