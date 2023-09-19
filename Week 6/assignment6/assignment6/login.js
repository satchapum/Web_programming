window.onload = loginLoad;

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);
const firstname = urlParams.get('firstname')
const lastname = urlParams.get('lastname')
const gender = urlParams.get('gender')
const bday = urlParams.get('bday')
const email = urlParams.get('email')
const username = urlParams.get('username')
const password = urlParams.get('password')
const password1 = urlParams.get('password1')

function loginLoad(){
	var form = document.getElementById("myLogin");
	form.onsubmit = checkLogin;
}

function checkLogin(){

	if(document.forms["myLogin"]["username"].value == username){
		if(document.forms["myLogin"]["password"].value == password){
			alert("Login Already");
		}
		else{
			alert("Wrong password");
		}
	}
	else{
		alert("no username in system");
	}
	//ถ้าตรวจสอบแล้วพบว่ามีการ login ไม่ถูกต้อง ให้ return false ด้วย
}

			