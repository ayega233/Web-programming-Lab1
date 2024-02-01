displayView = function(){
  // the code required to display a view
};

window.onload = function(){
  console.log()
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
  var currentcontacts = JSON.parse(localStorage.getItem("contacts"));
  var loginstate;
  if(currentcontacts != null){
      for(i=0; i< currentcontacts.length; i++){
        var contact =currentcontacts[i];
        if(contact.email === email){
            if(contact.password === password){
              var loginuser = {
                email : email,
                password : password
              }
              localStorage.setItem("loginuser",JSON.stringify(loginuser));
              document.getElementById("save-form").reset();
              loginstate = true;
              msg="";
              break;
            }else{
              loginstate =false;
              msg="User Name and PW is not matching.";
            }
        }else{
          loginstate = false;
          msg="Please,Sign Up";
        }
      }
  }else{
    loginstate = false;
  }
  localStorage.setItem("loginstate",loginstate);
  document.getElementById('log-error-message').innerHTML = msg;
  document.getElementById('log-error-message').style.color = 'red';
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
      password: password,
      repassword:repassword

    };

    var contacts = localStorage.getItem("contacts");
    if (contacts == null){
      contacts = [];
    }else{
      contacts = JSON.parse(contacts);
    }
    contacts.push(contact);
    localStorage.setItem("contacts",JSON.stringify(contacts));
    document.getElementById("sign-up-form").reset();
}
