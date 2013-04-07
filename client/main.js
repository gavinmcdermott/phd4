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
      localStorage.setItem("current_player", player._id);
      console.log("Your name: "+ player.name + " your id: " + player._id);
    }
  }
});

Template.head.current_player = function() {
  var player = localStorage.getItem("current_player");
  if (player && player != "undefined") return Players.find(player).fetch()[0].name;
  else return false;
};

Template.sidebar.players = function() {
  console.log(Players && Players.find({}).fetch());
  return Players && Players.find({}).fetch();
};


Meteor.startup(function() {
  // _500px.init({
  //   sdk_key: '8f9e1716ef34c4b9f771cef66ebaee3de2ce99e0'
  // });

  // _500px.api('/photos/search', function (response) {
  //   if (response.success) {
  //     console.log('There are ' + response.data.photos.length + ' photos.');
  //   } else {
  //     console.log('Unable to complete request: ' + response.status + ' - ' + response.error_message);
  //   }
  // });

  // _500px.getAuthorizationStatus(function (status) {
  //   if (status == 'not_logged_in' || status == 'not_authorized') {
  //     _500px.login();
  //   }
  // });
});