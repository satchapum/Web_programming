

function myFunction(){
    alert("Hello!");
}

function changeImage(id) { 
    if(id == "image01"){
        var pokeballImg = document.getElementById("img01").ariaValueMax; 
        pokeballImg.src = "pic/pikachu.png"; 
        pokeballImg.id = "pikachu";
    }
    else{
        var pokeballImg = document.getElementById("pikachu"); 
        pokeballImg.src = "pic/pokemon-ball.png"; 
        pokeballImg.id = "img01";
    }

    
}

// var link = document.getElementById("tw-link");
// link.innerHTML = "twitter";

window.onload = twitterLink;
function twitterLink(){
    var link = document.getElementById("tw-link");
    link.innerHTML = "twitter";
}


