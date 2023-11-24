window.onload = pageLoad;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);


function pageLoad() {
    document.getElementById("addData").onsubmit = clickAdd;

    document.getElementById("updateData").onsubmit = updateData;

    if (urlParams.get("error") == 1) {
        if (window.location.href.split('/').pop() == "index.html?error=1") {
            document.getElementById('display').innerHTML = "Username is already use.";
        }
    }
    else if (urlParams.get("error") == 2) {
        if (window.location.href.split('/').pop() == "index.html?error=2") {
            document.getElementById('display').innerHTML = "Record not found";
        }
    }
}
async function clickAdd() {
  var x = document.getElementById("addData");
    let response = await fetch("/regisDB", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: x.elements['user'].value,
        password: x.elements['password'].value,
      }),
    });
    let content = await response.json();
  }


async function updateData() {
  var x = document.getElementById("updateData");
    let response = await fetch("/Updatedata", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: x.elements['user'].value,
        password: x.elements['password'].value,
      }),
    });
    let content = await response.json();
  }
  