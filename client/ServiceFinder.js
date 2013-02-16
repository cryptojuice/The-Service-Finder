if (Meteor.isClient) {
  Meteor.Router.add({
    '/': 'services',
    '/add': 'serviceForm',
    '/:id': function(id) {
      Session.set('currentServiceId', id);
      return 'showService'
    }
  });

  Services = new Meteor.Collection("test-services");  

  Template.services.service = function ()   {
    if(Session.get('search_query') === undefined || Session.get('search_query') === "") {
      return Services.find();
    }
    return Services.find({'name': {$regex: Session.get("search_query"), $options: 'i'}});
  };

  Template.showService.service = function () {
    console.log(Services.findOne({'_id':Session.get('currentServiceId')}));
    return Services.findOne({'_id':Session.get('currentServiceId')});
  };


  Template.body.events = {
    'click #submit': function(event){
      var converter = new Showdown.converter();

      var name = $('#name').val();
      var description = $('#description').val();

      var markedDesc = converter.makeHtml(description); 

      Services.insert({'name': name, 'description':markedDesc});
    },
    'click .icon-trash': function(event){
      var confirmed = (confirm("Are you sure?"));
      if (confirmed) {
      Services.remove({_id:Session.get('currentServiceId')});
      }
    },
    'keyup #search': function(event){
      console.log(event.currentTarget.value);
      Session.set("search_query", event.currentTarget.value);
    }

  };
}
