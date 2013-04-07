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
      amplify.store("current_player", player);
      // State.findOne("signed_in")
      console.log("You are: "+ player.name);
    }
  }
});

Template.head.current_player = function() {
  var player = amplify.store("current_player");
  if (player) return player.name;
  else return false;
};

Template.sidebar.players = function() {
  console.log(Players && Players.find({}).fetch());
  return Players && Players.find({}).fetch();
};


Meteor.startup(function() {
  // var logged_in = amplify.store();
  // Meteor.autorun(function() {
  //   if (logged_in) {
  //     console.log(logged_in);
  //     console.log("Sheeeeiit");
  //   }
  // });

});