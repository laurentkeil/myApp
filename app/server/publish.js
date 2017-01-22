  //publish pour Read les players du server pour récup niveau client de manière secure seulement ceux du user
  Meteor.publish('thePlayers', function(){
      var currentUserId = this.userId;
      return PlayersList.find({createdBy: currentUserId}); 
  });

  Meteor.publish('theLists', function(){
      return Lists.find({}); 
  });

  Meteor.publish('todos', function(currentList){
      var currentUser = this.userId;
      return Todos.find({ createdBy: currentUser, listId: currentList })
  });