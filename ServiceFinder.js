if (Meteor.isClient) {
  Services = new Meteor.Collection("test-services");  
  Meteor.subscribe("test-services");

  Template.services.service = function ()   {
    return Services.find();
  };

  Template.services.events = {
    'click div': function(event){ console.log(event.currentTarget)}
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Services = new Meteor.Collection("test-services");
    if (Services.find().count() === 0) {
      Services.insert({name: "Initial data", description: "This is test data"});
    };
  });
}
