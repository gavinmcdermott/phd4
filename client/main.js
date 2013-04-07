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
    amplify.store("current_player", false);
    Session.set("current_player", false);
  },
  'click h1' : function() {
    console.log("yo");
    Meteor.call("serveTime");
    console.log(Session.get("time"));
  }
});

Template.head.current_player = function() {
  var player = Session.get("current_player");
  if (player) return player.name;
  else return false;
};

Template.sidebar.players = function() {
  return Players && Players.find({}).fetch();
};

Meteor.startup(function() {

  _500px.init({
    sdk_key: '0a722b0030e8d7d4a5cc8f6f8f916d67ba9c38e8'
  });
  _500px.api('/photos/search', { term: 'funny', rpp: 100, page: 1, image_size: 3 }, function (response) {
    for (var i = 0; i < 5; i++) {
      var ran = Math.floor(Math.random() * 101);
      console.log(ran);
      var url = (response.data.photos[ran].image_url);
      $('body').append('<img src="'+url+'" />');
    }
  });

  Meteor.autorun(function() {
    var logged_in = amplify.store("current_player");
    Session.set("current_player", logged_in);
    if (logged_in) {
      console.log(logged_in);
      console.log("Sheeeeiit");
    }
  });

  Meteor.methods({
    serveTime: function() {
      var time = Date();
      console.log("serving time");
      Session.set("time", time);
    }
  });
});