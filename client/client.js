if (Meteor.isClient) {
  Meteor.Router.add({
    '/': 'services',
    '/add': 'newServiceForm'
  });

  Services = new Meteor.Collection("test-services");  

  Template.services.service = function ()   {
    if(Session.get('search_query') === undefined || Session.get('search_query') === "") {
      return Services.find();
    }
    return Services.find({'name': {$regex: Session.get("search_query"), $options: 'i'}});
  };

  Template.services.events = {
    'click .icon-trash': function(event){
      var confirmed = (confirm("Are you sure?"));
      if (confirmed) {
      Services.remove({_id:this._id});
      }
    },
    'keyup #search': function(event){
      console.log(event.currentTarget.value);
      Session.set("search_query", event.currentTarget.value);
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
