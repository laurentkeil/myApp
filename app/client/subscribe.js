  console.log("Hello client");

  // counter starts at 0
  Session.setDefault('counter', 0);

  //suscribe au players de la BD provenant du serveur (only appropriate user)
  Meteor.subscribe('thePlayers');
  Meteor.subscribe('theLists');
  Meteor.subscribe('todos');

  Template.lists.onCreated(function () {
    this.subscribe('lists');
  });

/* 
    Command lines :

  curl https://install.meteor.com/ | sh : install meteor
  npm install caman : install caman.js (front-end)
  meteor create app_name
  meteor run : run app
  PlayersList.find().fetch(); : taper en console client pour connaitre la liste players
  iron deploy app_name.meteor.com : déployer en ligne (test) 
  meteor bundle app_name.tgz : télécharger sous forme d'archive

  npm install -g iron-meteor : installer iron, outil de structuration de projet
  iron create app_name : creer un projet avec une bonne structure
  iron run : run app with auto load config files

  iron * : * remplacé par toute commande meteor
  iron add accounts-password : ajouter le module account-password
  iron add accounts-ui : idem -ui
  iron reset : reset DB
  iron remove autopublish : sécurité full - pas d'accès BD
  iron remove insecure : retirer les autorisations à CRUD sur BD
  iron add iron:router : ajouter le module de routeur
  iron add ejson : module pour iron:router
  iron add themeteorchef:jquery-validation : module de validation avec module jQuery
  iron add check : module pour ajouter les check server
  iron add jquery
  iron add mizzao:jquery-ui
  iron add nerdmed:camanjs (client-side)
  iron add richsilv:owl-carousel
  iron add twbs:bootstrap 
*/