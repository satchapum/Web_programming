window.onload = pageLoad;

function pageLoad(){
	var form = document.getElementById("myForm");
	form.onsubmit = validateForm;
}

function validateForm() {
    var password = document.forms["myForm"]["password"];
    var password1 = document.forms["myForm"]["password1"];

    if (password.value != password1.value){
        document.getElementById("errormsg").innerHTML = "password not recognised";
        return false;
    }
}
