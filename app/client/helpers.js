Template.leaderboard.helpers({
    counter: function () {
      return Session.get('counter');
    },
    player: function () {
      var currentUserId = Meteor.userId();
      return PlayersList.find({}, {sort: {score: -1, name: 1} })
    },
    selectedClass: function () { 
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if(playerId == selectedPlayer){
          return "selected"
      } 
    },
    'showSelectedPlayer': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne(selectedPlayer);
    }
});

Template.lists.helpers({
    'list': function(){
        var currentUser = Meteor.userId();
        return Lists.find({createdBy: currentUser}, {sort: {name: 1}});
    }
});

Template.todos.helpers({
    'todo': function(){
        var currentList = this._id;
        var currentUser = Meteor.userId();
        return Todos.find({ listId: currentList, createdBy: currentUser}, {sort: {createdAt: -1}})
    }
});

Template.todoItem.helpers({
    'checked': function(){
        var isCompleted = this.completed;
        if(isCompleted){
            return "checked";
        } else {
            return "";
        }
    }
});

Template.todosCount.helpers({
    'totalTodos': function(){
        var currentList = this._id;
        return Todos.find({ listId: currentList }).count();
    },
    'completedTodos': function(){
        var currentList = this._id;
        return Todos.find({ listId: currentList, completed: true }).count();
    }
});