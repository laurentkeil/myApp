  /*
  Fonction pour donner un nom par defaut à une liste vide
  */
  function defaultName(currentUser) {
    var nextLetter = 'A'
    var nextName = 'List ' + nextLetter;
    while (Lists.findOne({ name: nextName, createdBy: currentUser })) {
        nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
        nextName = 'List ' + nextLetter;
    }
    return nextName;
  }

  //method - call pour CUD 
  Meteor.methods({
    'insertPlayerData': function(playerNameVar){
        var currentUserId = Meteor.userId();
        PlayersList.insert({
            name: playerNameVar,
            score: 0,
            createdBy: currentUserId
        });
    },
    'insertListData': function(listName){        
        var currentUser = Meteor.userId();
        check(listName, String);
        if(listName == ""){
            listName = defaultName(currentUser);
        }
        var data = {
                name: listName,
                createdBy: currentUser
        }
        if(!currentUser){
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        }
        return Lists.insert(data);
    },
    'insertTodoData' : function(todoName, currentList){
        check(todoName, String);
        check(currentList, String);

        var currentUser = Meteor.userId();
        var data = {
            name: todoName,
            completed: false,
            createdAt: new Date(),
            createdBy: currentUser,
            listId: currentList
        }

        if(!currentUser){
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        }
        var currentList = Lists.findOne(currentList);
        if(currentList.createdBy != currentUser){
            throw new Meteor.Error("invalid-user", "You don't own that list."); //Warning
        }

        return Todos.insert(data);
    },

    'removePlayerData': function(selectedPlayer){
        var currentUserId = Meteor.userId();
        PlayersList.remove({_id: selectedPlayer, createdBy: currentUserId});
    },
    'removeTodoData': function(documentId){
        var currentUser = Meteor.userId();
        var data = {
            _id: documentId,
            createdBy: currentUser
        }
        if(!currentUser){
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        }
        Todos.remove(data);
    },

    'modifyPlayerScore': function(selectedPlayer, scoreValue){
        var currentUserId = Meteor.userId();
        PlayersList.update( {_id: selectedPlayer, createdBy: currentUserId}, 
                                {$inc: {score: scoreValue} }); //$set pour incrémenter une seule fois
    },
    'modifyTodoData': function(documentId, todoItem){
        check(todoItem, String);
        var currentUser = Meteor.userId();
        var data = {
            _id: documentId,
            createdBy: currentUser
        }
        if(!currentUser){
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        }
        Todos.update(data, {$set: { name: todoItem }});
    },
    'modifyTaskCompleted': function(documentId, status){
        check(status, Boolean);
        var currentUser = Meteor.userId();
        var data = {
            _id: documentId,
            createdBy: currentUser
        }
        if(!currentUser){
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        }
            Todos.update(data, {$set: { completed: status }});
        }
  });