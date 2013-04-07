Meteor.startup(function () {
  var currentPhoto;
  // Photos.remove({});
  // Guesses.remove({});

  Meteor.methods({

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


