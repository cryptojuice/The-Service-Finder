if (Meteor.isClient) {
  Meteor.Router.add({
    '/': 'services',
    '/add': 'newServiceForm'
  });

  Services = new Meteor.Collection("test-services");  

  Template.services.service = function ()   {
    return Services.find();
  };

  Template.services.events = {
    'click .delete': function(event){
      Services.remove({_id:this._id});
    }
  };

  Template.newServiceForm.events = {
    'click #submit': function(event){
      var name = $('#name').val();
      var description = $('#description').val();
      Services.insert({'name': name, 'description':description});
      }
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
