displayView = function(){
	if (localStorage.getItem("loggedinusers") == null || localStorage.getItem("loggedinusers") == "") {
		document.getElementById('content').innerHTML = document.getElementById('welcomeview').innerHTML;
	}
	else {
		token = localStorage.getItem("loginusertocken");
		if (token && JSON.parse(localStorage.getItem("loggedinusers"))[token] != undefined) {
			already_login();
		}
		else {
			document.getElementById('content').innerHTML = document.getElementById('welcomeview').innerHTML;
		}
	}
};

window.onload = function() {
	displayView();
};


function checkpw(id1,id2,message_id,button){
  if (document.getElementById(id1).value == document.getElementById(id2).value) {
      document.getElementById(message_id).innerHTML = '';
      document.getElementById(button).disabled = false;
  } else {
      document.getElementById(message_id).style.color = 'red';
      document.getElementById(message_id).innerHTML = 'Password not matching';
      document.getElementById(button).disabled = true;
  }
}

function login(formdata){  
  var email = formdata.login_email.value;
  var password = formdata.login_password.value;
  var currentcontacts = localStorage.getItem("users");  
  if(currentcontacts && currentcontacts != ""){    
    var message = serverstub.signIn(email,password);
    if(message.success){
      localStorage.setItem("loginusertocken",message.data)
      element = document.getElementById("tabs1");
      display_tab(element);
    }else{
      document.getElementById('log-error-message').innerHTML = message.message;      
    }
  }else{    
    document.getElementById('log-error-message').innerHTML ="Wrong username or password.";
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
  if(firstname!="" && familyname!="" && gender!="" && country!="" && email!="" && validateEmail(email) && password!="" && (password.length>4)){
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
      document.getElementById("sign-up-form").reset();
      document.getElementById('message').innerHTML = message.message;
      document.getElementById('message').style.color = 'green';
    }else{
      document.getElementById('message').innerHTML = message.message;
      document.getElementById('message').style.color = 'red';
    }
  }else{
    document.getElementById('message').innerHTML = "Please fill mandatory data.";
    document.getElementById('message').style.color = 'red';
  }    
}

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

var already_login = function() {
  token =  localStorage.getItem("loginusertocken");
	email_member = JSON.parse(localStorage.getItem("loggedinusers"))[token];
	password_member = JSON.parse(localStorage.getItem("users"))[email_member].password;

	//member = localStorage.setItem("member", JSON.stringify(serverstub.signIn(email_member, password_member)));
	//answer = JSON.parse(localStorage.getItem("member"));

	if (email_member != null) {
		document.getElementById('content').innerHTML = document.getElementById('logged_in').innerHTML;
    showCurrentTab();
   /** var currenttab = localStorage.getItem("currentTab");
    if(currenttab && currenttab != null){
      document.getElementById(currenttab).style.display = 'block';
    }else{
      document.getElementById("tabs-1").style.display = 'block';
    } */
		user_data();
		post_to_wall();
	}
	else {
		document.getElementById('span_test_3').innerHTML = answer.message;
	}
}

var display_tab = function(element)  {
  var tab_panels = document.getElementsByClassName('tab_panel');
  for (var i = 0; i < tab_panels.length; i++) {
      tab_panels[i].style.display = 'none';
     if( document.getElementById("tabs"+(i+1)).classList.contains("activeBtn")){
        document.getElementById("tabs"+(i+1)).classList.remove("activeBtn");
      } 
  }

  document.getElementById(element.id).classList.add("activeBtn");
  var tabContentIdToShow = element.id.replace(/(\d)/g, '-$1');
  localStorage.setItem("currentTab",tabContentIdToShow);
  document.getElementById(tabContentIdToShow).style.display = 'block';
}

function showCurrentTab(){
  var tabContentIdToShow = localStorage.getItem("currentTab");
  if(tabContentIdToShow && tabContentIdToShow!=null){
    var tab_panels = document.getElementsByClassName('tab_panel');
    for (var i = 0; i < tab_panels.length; i++) {
        tab_panels[i].style.display = 'none';
        if(document.getElementById("tabs"+(i+1)).classList.contains("activeBtn")){
          document.getElementById("tabs"+(i+1)).classList.remove("activeBtn");
        }
    }
    var tabbuttonid = tabContentIdToShow.replace("-","")
    document.getElementById(tabbuttonid).classList.add("activeBtn");
    document.getElementById(tabContentIdToShow).style.display = 'block';
  }else{
    document.getElementById('content').innerHTML = document.getElementById('welcomeview').innerHTML;
    document.getElementById("tabs1").classList.add("activeBtn");
  }

}

var changing_password = function() {
  token =  localStorage.getItem("loginusertocken");
  old_PSW = document.getElementById("change_old_psw").value;
  new_PSW = document.getElementById("change_new_psw").value;

  var msg = serverstub.changePassword(token,old_PSW,new_PSW);
  if(msg.success){
    document.getElementById('span_test_4').innerHTML =msg.message;
    document.getElementById('span_test_4').style.color="green";
    document.getElementById("change_old_psw").value="";
    document.getElementById("change_new_psw").value="";
    document.getElementById("repeat_new_psw").value="";
  }else{
    document.getElementById('span_test_4').innerHTML =msg.message;
    document.getElementById('span_test_4').style.color="red";
  }
}


var signOut = function() {
  token =  localStorage.getItem("loginusertocken");
  signout_data = localStorage.setItem("signout_data", JSON.stringify(serverstub.signOut(token)));
  signout_output = JSON.parse(localStorage.getItem("signout_data"));
  if (signout_output.success) {
    document.getElementById('content').innerHTML = document.getElementById('welcomeview').innerHTML;
  }
}

var user_data = function() {
  document.getElementById("personal-error-msg").innerHTML = "";

  token = localStorage.getItem("loginusertocken");
  var getuser_output = serverstub.getUserDataByToken(token);

  if(getuser_output.success){
    document.getElementById("email_output").innerHTML = getuser_output.data.email;
    document.getElementById("name_output").innerHTML = getuser_output.data.firstname;
    document.getElementById("familyname_output").innerHTML = getuser_output.data.familyname;
    document.getElementById("gender_output").innerHTML = getuser_output.data.gender;
    document.getElementById("city_output").innerHTML = getuser_output.data.city;
    document.getElementById("country_output").innerHTML = getuser_output.data.country;
  }else{
    document.getElementById("personal-error-msg").innerHTML = getuser_output.message;
    document.getElementById("search-error").style.color="red";
  }

}

var user_data_2 = function() {
    document.getElementById("search-error").innerHTML = "";
    token = localStorage.getItem("loginusertocken");
    email = document.getElementById("search_member").value;
    document.getElementById("theTextarea").innerHTML = "";

    var getuser_output_other = serverstub.getUserDataByEmail(token,email);

    if(getuser_output_other.success){
      document.getElementById("email_output_2").innerHTML = getuser_output_other.data.email;
      document.getElementById("name_output_2").innerHTML = getuser_output_other.data.firstname;
      document.getElementById("familyname_output_2").innerHTML = getuser_output_other.data.familyname;
      document.getElementById("gender_output_2").innerHTML = getuser_output_other.data.gender;
      document.getElementById("city_output_2").innerHTML = getuser_output_other.data.city;
      document.getElementById("country_output_2").innerHTML = getuser_output_other.data.country;
  
      post_to_wall_2();
    }else{
      document.getElementById("search-error").innerHTML = getuser_output_other.message;
      document.getElementById("search-error").style.color="red";
    }

}

var post_to_wall = function(status=false) {
  document.getElementById("wall-post-error-1").innerHTML = "";
  token = localStorage.getItem("loginusertocken");
  email = JSON.parse(localStorage.getItem("loggedinusers"))[token];
  message = document.getElementById("wall_thoughts").value;

  if(status && message==""){
    document.getElementById("wall-post-error-1").innerHTML ="Please type a message.";
    document.getElementById('wall-post-error-1').style.color="red";
    
  }else{
    var wall_data = serverstub.postMessage(token, message, email);
    if(wall_data.success){
      document.getElementById("wall_thoughts").value="";
      read_wall();
    }else{
      document.getElementById("wall-post-error-1").innerHTML =user_message.message;
      document.getElementById('wall-post-error-1').style.color="red";
    }
  }

 
}

var read_wall = function() {
  document.getElementById("theTextarea").innerHTML = "";
  document.getElementById("wall-post-error-1").innerHTML ="";

  token = localStorage.getItem("loginusertocken");
  user_output = serverstub.getUserMessagesByToken(token);

  if(user_output.success){
    var text = ""
    for (i = 0; i < user_output.data.length; i++) {
      if (user_output.data[i].content != "") {
        text += "<b>" + user_output.data[i].writer + "</b>" + ":" + user_output.data[i].content + "<br><br>";
      }
    }
    document.getElementById("theTextarea").innerHTML = text;
  }else{
    document.getElementById("theTextarea").innerHTML = user_output.message;
    document.getElementById('theTextarea').style.color="red";
  }
}

var post_to_wall_2 = function() {
  document.getElementById("wall-post-error").innerHTML ="";
  token = localStorage.getItem("loginusertocken");
  var email = document.getElementById("search_member").value;
  var message = document.getElementById("wall_thoughts_2").value;

  if(message!=""){
    var wall_data = serverstub.postMessage(token, message, email);
    if(wall_data.success){
      document.getElementById("wall_thoughts_2").value="";
      read_wall_2();
    }else{
      document.getElementById("wall-post-error").innerHTML =wall_data.message;
      document.getElementById('wall-post-error').style.color="red";
    }
  }else{
    document.getElementById("wall-post-error").innerHTML ="Please type a message.";
    document.getElementById('wall-post-error').style.color="red";
  }

}

var read_wall_2 = function() {
  document.getElementById("theTextarea_2").innerHTML ="";
  document.getElementById("wall-post-error").innerHTML ="";
  token = localStorage.getItem("loginusertocken");
  var email = document.getElementById("search_member").value;

  var user_message = serverstub.getUserMessagesByEmail(token, email);
  if(user_message.success){
    user_output = user_message;
  
    var text = ""
    for (i = 0; i < user_output.data.length; i++) {
      if (user_output.data[i].content != "") {
        text += "<b>" + user_output.data[i].writer + "</b>" + ":" + user_output.data[i].content + "<br><br>";
      }
    }
    document.getElementById("theTextarea_2").innerHTML = text;
  }else{
    document.getElementById("theTextarea_2").innerHTML ="";
    
  }
  
}
