Players = new Meteor.Collection("players");

if (Meteor.isClient) {
  Template.head.greeting = function () {
    return "Welcome to phd4.";
  };

  Template.head.events({
    'keyup input.username' : function (e) {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        Session.set("name") = $('input.username').val();
        console.log("You are: "+ name);
    }
  });

  Template.head.current_player = function() {
    var name = Session.get("name");
    if (name !== undefined) return name;
    else return 'new player';
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
