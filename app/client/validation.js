Template.login.onRendered(function(){ 
    var validator = $('.login').validate({
        submitHandler: function(event){
            var email = $('[name=email]').val();
            var password = $('[name=password]').val();
            Meteor.loginWithPassword(email, password, function(error){
	                if(error){
					    if(error.reason == "User not found"){
					        validator.showErrors({
					            email: error.reason    
					        });
					    }
					    if(error.reason == "Incorrect password"){
					        validator.showErrors({
					            password: error.reason    
					        });
					    }
					} else {
                        var currentRoute = Router.current().route.getName();
                        if(currentRoute == "login"){
                            Router.go("home");
                        }
                }
            });
        }
    });
});

Template.register.onRendered(function(){
    var validator = $('.register').validate({
        submitHandler: function(event){
            var email = $('[name=email]').val();
            var password = $('[name=password]').val();
            Accounts.createUser({
                email: email,
                password: password
            }, function(error){
                if(error){
				    if(error.reason == "Email already exists."){
				        validator.showErrors({
				            email: "That email already belongs to a registered user."   
				        });
				    }
				} else {
                    Router.go("home");
                }
            });
        }    
    });
});

$.validator.setDefaults({
    rules: {
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minlength: 6
        }
    },
    messages: {
        email: {
            required: "You must enter an email address.",
            email: "You've entered an invalid email address."
        },
        password: {
            required: "You must enter a password.",
            minlength: "Your password must be at least {0} characters."
        }
    }
});

/*
When defining rules, there’s quite a few different options available:

required - Makes the element required.
remote - Requests a resource to check the element for validity.
minlength - Makes the element require a given minimum length.
maxlength - Makes the element require a given maximum length.
rangelength - Makes the element require a given value range.
min - Makes the element require a given minimum.
max - Makes the element require a given maximum.
range - Makes the element require a given value range.
email - Makes the element require a valid email
url - Makes the element require a valid url
date - Makes the element require a date.
dateISO - Makes the element require an ISO date.
number - Makes the element require a decimal number.
digits - Makes the element require digits only.
creditcard - Makes the element require a credit card number.
equalTo - Requires the element to be the same as another one
*/