Meteor.startup(function () {
  var currentPhoto,
      currentTime;
  // var currentTime = new Date();
  Meteor.setInterval(function(){
    currentTime = new Date();
  }, 1000);
  // Photos.remove({});
  // Guesses.remove({});

  Meteor.methods({

    getNewGameTime: function() {
      // console.log(currentTime);
      return currentTime;
    },

    getCurrentPhoto: function() {
      console.log(currentPhoto);
      if (currentPhoto) {
        return currentPhoto;
      } else {
        return false;
      }
    },

    getRandPhoto: function() {
      var results = Photos.find({}).fetch();
      var range = _.size(results);
      var rand = Math.floor(Math.random() * range);
      var photo = results[rand];
      currentPhoto = photo;
      return photo;
    },

    clearGuesses: function() {
      Guesses.remove({});
    }

  });

});


