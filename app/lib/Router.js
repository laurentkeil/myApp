Router.configure({
    layoutTemplate: 'main',
    loadingTemplate: 'loading'
});

Router.route('/', {
    name: 'home',
    template: 'home',
    /*waitOn: function(){
        return Meteor.subscribe('lists');
    }*/
});

Router.route('/register');
Router.route('/login');

Router.route('/list/:_id', {
    name: 'listPage',
    template: 'listPage',
    data: function(){
        var currentList = this.params._id;
        var currentUser = Meteor.userId();
        return Lists.findOne({ _id: currentList, createdBy: currentUser });
    },
    waitOn: function(){
        var currentList = this.params._id;
	    return Meteor.subscribe('todos', currentList);
    },
    onBeforeAction: function(){
        console.log("You triggered 'onBeforeAction' for 'listPage' route.");
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next();
        } else {
            this.render("login");
        }
    }
});
