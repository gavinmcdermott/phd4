Players = new Meteor.Collection("players");

if (Meteor.isServer) {
  Meteor.startup(function () {
    // _500px.init({
    //   sdk_key: '8f9e1716ef34c4b9f771cef66ebaee3de2ce99e0'
    // });
    // _500px.api('/photos', { feature: 'popular', page: 1 }, function (response) {
    //   console.log(response.data.photos);
    // });
  });

  // Meteor.methods({
  //   search500Px: function() {

  //   }
  // });
}
