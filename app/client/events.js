  Template.leaderboard.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }, 
    'click .player': function () {
      var playerId = this._id;
      Session.set('selectedPlayer', playerId); 
    },
    'click .increment': function () {  
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('modifyPlayerScore', selectedPlayer, 5);
    },
    'click .decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer'); 
      Meteor.call('modifyPlayerScore', selectedPlayer, -5);
    }, 
    'click .remove': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('removePlayerData', selectedPlayer); //accès BD remove via appel server
    }
  });

  Template.addPlayerForm.events({
    'submit form': function(event){
        event.preventDefault();
        var playerNameVar = event.target.playerName.value;
        Meteor.call('insertPlayerData', playerNameVar); //accès BD insert via appel server
    }
  });

  Template.addList.events({
    'submit form': function(event){
      event.preventDefault();
      var listName = $('[name=listName]').val();
      Meteor.call('insertListData', listName, function(){
        if(error){
            console.log(error.reason);
        } else {
            Router.go('listPage', { _id: results });
            $('[name=listName]').val('');
        }
      }); //accès BD insert via appel server
    }
  });

  Template.addTodo.events({
    'submit form': function(event){
      event.preventDefault();
      var todoName = $('[name="todoName"]').val();
      var currentList = this._id;
      Meteor.call('insertTodoData', todoName, currentList, function(error){
          if(error){
              console.log(error.reason);
          } else {
              $('[name="todoName"]').val('');
          }
      });
    }
  });
  Template.todoItem.events({
    'click .delete-todo': function(event){
        event.preventDefault();
        var documentId = this._id;
        var confirm = window.confirm("Delete this task?");
        if(confirm){
          Meteor.call('removeTodoData', documentId); //accès BD remove via appel server
        }
    },
    'keyup [name=todoItem]': function(event){
        var documentId = this._id;
        var todoItem = $(event.target).val();
        Meteor.call('modifyTodoData', documentId, todoItem);
        console.log("Task changed to: " + todoItem);
    }, 
    'change [type=checkbox]': function(){
        var documentId = this._id;
        var status = this.completed;
        if(status){
          Meteor.call('modifyTaskCompleted', documentId, false);
        } else {
          Meteor.call('modifyTaskCompleted', documentId, true);
        }
    }
  });

  Template.navigation.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
  });

  Template.register.events({
    'submit form': function(event){
        event.preventDefault();
    }
  });

  Template.login.events({
    'submit form': function(event){
        event.preventDefault();
    }
  });