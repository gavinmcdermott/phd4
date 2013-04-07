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
  },
  'click h1' : function() {
    console.log("yo");
    Meteor.call("serveTime");
    console.log(Session.get("time"));
  }
});

Template.sidebar.players = function() {
  return Players && Players.find({}).fetch();
};

Template.add_emotion_form.photo = function() {
  return Session.get('current_photo');
};

Template.main_game_area.events({
  'keydown .emo_entry': function(e) {
    if (e.which === 13) {
      var text = e.target.value;
      var guess = {
        guess: text,
        stamp: new Date()
      };
      Guesses.insert(guess);
      $('.emo_entry').val("");
      if (text === Session.get('current_emotion')) {
        console.log('Winner!!');
        Meteor.call('clearGuesses');
        getPhoto();
      }
    }
  }
});

Template.crowd_guess_list.current_guesses = function() {
  return Guesses && Guesses.find({}, {sort: {stamp: -1}}).fetch();
};

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
          emotion: 'something'
        });
      }
    }
  });

  getPhoto = function() {
    Meteor.call('getRandPhoto', function(err, photo) {
      if (err) {
        console.log(err);
      } else {
        Session.set('current_photo', photo);
        Session.set('current_emotion', photo.emotion);
        return Session.get('current_photo');
      }
    });
  };
  // getPhoto();

  var getCurPhoto = function() {
    Meteor.call('getCurrentPhoto', function(err, photo) {
      if (err) {
        console.log(err);
      } else {
        if (!photo) {
          getPhoto();
        } else {
          Session.set('current_photo', photo);
          Session.set('current_emotion', photo.emotion);
          return Session.get('current_photo');
        }
      }
    });
  };
  getCurPhoto();

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

  Meteor.methods({
    serveTime: function() {
      var time = Date();
      console.log("serving time");
      Session.set("time", time);
    }
  });
});