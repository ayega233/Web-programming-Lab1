displayView = function(){
  // the code required to display a view
};

window.onload = function(){
  console.log(localStorage.getItem("loggedinusers"));
  console.log(localStorage.getItem("users"));
  //code that is executed as the page is loaded.
  //You shall put your own custom code here.
  //window.alert() is not allowed to be used in your implementation.
  //window.alert("Hello TDDD97!");
};


function checkpw(){
  if (document.getElementById('passwordsignup').value == document.getElementById('repasswordsignup').value) {
      document.getElementById('message').innerHTML = '';
      document.getElementById('signup').disabled = false;
  } else {
      document.getElementById('message').style.color = 'red';
      document.getElementById('message').innerHTML = 'Password not matching';
      document.getElementById('signup').disabled = true;
  }
}

function login(formdata){
  var email = formdata.login_email.value;
  var password = formdata.login_password.value;
  var message = serverstub.signIn(email,password);
  if(message.success){

  }else{
    document.getElementById('log-error-message').innerHTML = message.message;
    document.getElementById('log-error-message').style.color = 'red';
  }
}

function saveContact(formData){
    var firstname = formData.firstname.value;
    var familyname = formData.familyname.value;
    var gender = formData.gender.value;
    var city = formData.city.value;
    var country = formData.country.value;
    var email = formData.emailsignup.value;
    var password = formData.passwordsignup.value;
    var repassword = formData.repasswordsignup.value;

    var contact ={
      firstname: firstname,
      familyname: familyname,
      gender: gender,
      city: city,
      country: country,
      email: email,
      password: password
    };

    var message = serverstub.signUp(contact);
    if(message.success){
      document.getElementById('message').innerHTML = message.message;
      document.getElementById('message').style.color = 'green';
    }else{
      document.getElementById('message').innerHTML = message.message;
      document.getElementById('message').style.color = 'red';
    }
    
}
