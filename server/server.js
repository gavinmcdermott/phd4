Meteor.startup(function () {

  // Photos.remove({});
  // Guesses.remove({});

  Meteor.methods({

    getRandPhoto: function() {
      var results = Photos.find({}).fetch();
      var range = _.size(results);
      var rand = Math.floor(Math.random() * range);
      var photo = results[rand];
      return photo;
    },

    clearGuesses: function() {
      Guesses.remove({});
    }

  });

});


