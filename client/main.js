Template.head.current_player = function() {
  var player = Session.get("current_player");
  if (player) return player.name;
  else return false;
};

Template.head.adding_emotion_to_image = function() {
  return Session.get('adding_emotion_to_image');
};

Template.head.guessing_answer = function() {
  return Session.get('guessing_answer');
};

Template.head.events({
  'keydown input.username' : function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      var playerName = $('input.username').val();
      var player = {
        name: playerName,
        score: 0
      };
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
  }
});

Template.sidebar.players = function() {
  return Players && Players.find({}).fetch();
};

Template.add_emotion_form.photo = function() {
  return Session.get('current_photo');
};

Template.main_game_area.events({

});

Meteor.startup(function() {

  _500px.init({
    sdk_key: '0a722b0030e8d7d4a5cc8f6f8f916d67ba9c38e8'
  });
  _500px.api('/photos/search', { term: 'funny', rpp: 100, page: 1, image_size: 3 }, function (response) {
    for (var i = 0; i < 9; i++) {
      var ran = Math.floor(Math.random() * 101);
      var url = (response.data.photos[ran].image_url);
      if (!Photos.findOne({url: url})) {
        Photos.insert({
          url: url,
          random : Math.random(),
          emotion: null
        });
      }
    }
  });

  Meteor.call('getRandPhoto', function(err, photo) {
    if (err) {
      console.log(err);
    } else {
      console.log(photo.url);
      Session.set('current_photo', photo);
      return Session.get('current_photo');
    }
  });

  Meteor.autorun(function() {
    var logged_in = amplify.store("current_player");
    Session.set("current_player", logged_in);
    if (logged_in) {
      amplify.store("guessing_answer", true);
      Session.set("guessing_answer", true);

      amplify.store("adding_emotion_to_image", true);
      Session.set("adding_emotion_to_image", true);
    }
  });
});