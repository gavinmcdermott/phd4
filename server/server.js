Meteor.startup(function () {
  var currentTime;
  // var currentTime = new Date();
  Meteor.setInterval(function(){
    currentTime = new Date();
  }, 1000);
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
  }

  Meteor.methods({

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


