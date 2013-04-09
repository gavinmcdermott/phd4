Meteor.startup(function () {
  var parsedTime = null,
      timePlusOneMin = null,
      count = 0;

  // var currentTime = new Date();
  // Meteor.setInterval(function(){
  //   currentTime = new Date();
  // }, 1000);
  // Photos.remove({});
  // Guesses.remove({});

  var getCurrentPhoto = function() {
    var cur = SharedState.findOne({"type": "current_photo"});
    var currentPhoto = cur && Photos.findOne(cur.data._id);
    if (currentPhoto) {
      console.log("will return current: ", currentPhoto);
      return currentPhoto;
    } else {
      return false;
    }
  };

  var setCurrentPhoto = function(photo) {
    var oldPhoto = getCurrentPhoto();
    if (oldPhoto) {
      console.log("Old photo was: " + oldPhoto.url);
      SharedState.remove({"type": "current_photo"});
    } else {
      console.log("No current photo upon set: ", oldPhoto);
      SharedState.remove({"type": "current_photo"});
      // SharedState.insert({type: "current_photo", data: photo})
    }
    if (photo) SharedState.insert({type: "current_photo", data: photo});
  };

  Meteor.methods({

    getCurrentGameTime: function() {
      parsedTime = new Date().valueOf();
        // count = count + 1;
        // var diff = (60 - parsedTime.getSeconds());
      if (parsedTime < timePlusOneMin) {
        console.log(parsedTime);
        console.log(timePlusOneMin);
        return Math.round((timePlusOneMin - parsedTime)/1000);
      } else {
        timePlusOneMin = parsedTime + 60000;
        // parsedTime = null;
        // timePlusOneMin = null;
        // count = 0;
        return 60;
      }
    },

    startGameRound: function() {
      // var time = new Date();
      parsedTime = new Date().valueOf();
      // count = 0;
      timePlusOneMin = parsedTime + 60000;
    },
    getNewGameTime: function() {
      // console.log(currentTime);
      return currentTime;
    },

    getCurrentPhoto: getCurrentPhoto,

    setCurrentPhoto: setCurrentPhoto,

    getRandPhoto: function() {
      var results = Photos.find({}).fetch();
      var range = _.size(results);
      var rand = Math.floor(Math.random() * range);
      var photo = results[rand];
      console.log("randPhoto: ", photo, "\n");
      setCurrentPhoto(photo);
      return photo;
    },

    clearGuesses: function() {
      Guesses.remove({});
    }

  });

});


