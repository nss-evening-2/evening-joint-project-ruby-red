requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../lib/bower_components/jquery/dist/jquery.min',
    'lodash': '../lib/bower_components/lodash/lodash.min',
    'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
    'q': '../lib/bower_components/q/q',
    'firebase': '../lib/bower_components/firebase/firebase'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      'exports': 'Firebase'
    }
  }
});

requirejs(
  ["jquery", "hbs", "bootstrap", "firebase", "homepage", "get-users", "authenticate", "login", "register", "haunt"],
  function($, Handlebars, bootstrap, Firebase, homepage, getUsers, authenticate, login, register, haunt) {

  var firebaseRef = new Firebase("https://monster-dating.firebaseio.com/");

  login.load();

  //click event for loading register hbs
  $(document).on('click', "#registerButton", function() {
    //load register.hbs
    register.load();
    $('#register').show();
    $("#loginRegister").hide();
  });

  //click event to register user
  $(document).on('click', "#loginButton", function() {
    authenticate.logInUser(firebaseRef);
  });

  //click event to login user
  $(document).on('click', "#registerUserButton", function() {
    authenticate.createUser(firebaseRef);
  });

  //click event to logout
  $(document).on('click', '#logoutButton', function() {
    $('#homepage').remove();
    $("#loginRegister").show();
  });

  $(document).on('click', ".hauntButton", function() {
    $(this).attr("src", "../images/haunted.png");
    var hauntButtonID = $(this).attr("id");
    console.log("hauntButtonID", hauntButtonID);
    var userKeyArray = hauntButtonID.split("#");
    console.log("userKeyArray", userKeyArray);
    var userKey = userKeyArray[1];
    console.log("userKey", userKey);
    haunt.like(userKey);
  });
});