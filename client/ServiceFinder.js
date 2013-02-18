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
    return Services.findOne({'_id':Session.get('currentServiceId')});
  };


  Template.body.events = {
    'click #submit': function(event){
      var converter = new Showdown.converter();

      var name = $('#name').val();
      var description = $('#description').val();

      var markedDesc = converter.makeHtml(description); 

      if (name === "" || name === undefined) {
        $('#formAlert').append('<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Please fill in the "Name" field.</strong></div>');
      } else {
        
        Services.insert({'name': name, 'description':markedDesc, 'description_md':description});
        $('#formAlert').html('<div class="alert alert-success"><strong>Success</strong></div>');
      }
    },
    'click .icon-trash': function(event){
      var confirmed = (confirm("Are you sure?"));
      if (confirmed) {
      Services.remove({_id:Session.get('currentServiceId')});
      }
    },
    'keyup #search': function(event){
      Session.set("search_query", event.currentTarget.value);
    },
    'keyup #description': function(event){
      var converter = new Showdown.converter();
      var description = $('#description').val();
      var markedDesc = converter.makeHtml(description);

      $('.preview').html(markedDesc);
    },
    'click #editme': function(event){
      $('.postcontainer').html('<div class="form-horizontal"><legend>Add a new Service or Application</legend><div class="control-group"><label>Service Name:</label><input type="text" id="name" placeholder="Example: A&PO" required></div><div class="control-group"><label>Description:</label><textarea class="field span12" rows="8" id="description"></textarea><button id="update" class="btn">Update</input></div></div><div class="preview"></div><div id="formAlert"></div>');

      $('#name').val(Services.findOne({'_id':Session.get('currentServiceId')}).name); 
      $('#description').val(Services.findOne({'_id':Session.get('currentServiceId')}).description_md); 
    },
    'click #update': function(event){
      console.log('updating');
      var converter = new Showdown.converter();
      var name = $('#name').val();
      var description = $('#description').val();
      var markedDesc = converter.makeHtml(description);

      Services.update({'_id':Session.get('currentServiceId')},{'name': name, 'description':markedDesc, 'description_md':description});
    }
  };
}
