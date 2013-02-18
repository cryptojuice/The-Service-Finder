if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Services = new Meteor.Collection("test-services");
    if (Services.find().count() === 0) {
      for (var i = 0; i < 50; i++) {
        Services.insert({name: "Initial data " + i, description: "This is test data"});
      };
    };
  });
}
