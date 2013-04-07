Players = new Meteor.Collection("players");

if (Meteor.isServer) {
  Meteor.startup(function () {
    // _500px.init({
    //   sdk_key: '8f9e1716ef34c4b9f771cef66ebaee3de2ce99e0'
    // });
    // _500px.api('/photos', { feature: 'popular', page: 1 }, function (response) {
    //   console.log(response.data.photos);
    // });

    _500px.init({
      sdk_key: '0a722b0030e8d7d4a5cc8f6f8f916d67ba9c38e8'
    });

    _500px.api('/photos/search', { term: 'funny', rpp: 100, page: 1, image_size: 3 }, function (response) {
      for (var i = 0; i < 5; i++) {
        var ran = Math.floor(Math.random() * 101);
        console.log(ran);
        var url = (response.data.photos[ran].image_url);
        $('body').append('<img src="'+url+'" />');
      };
    });


  });

  // Meteor.methods({
  //   search500Px: function() {

  //   }
  // });
}
