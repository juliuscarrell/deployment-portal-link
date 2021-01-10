var mysubmit = document.getElementById("subButton"); // Grab Button
console.log(mysubmit);
var myemail = document.getElementById("email"); // Grab emai input box
console.log(myemail);
var mytoken = document.getElementById("token") as HTMLInputElement; // Grab token input box
console.log(mytoken);

var emailAddressNode = document.getElementById("user_email_address");

var emailAddress = emailAddressNode!.textContent;

console.log("User email address is " + emailAddress);

var mysent = document.getElementById("my_form_sent"); // Grab emai input box
var mysuccess = document.getElementById("my_form_success"); // Grab emai input box
var myfail = document.getElementById("my_form_failure"); // Grab emai input box

mysent!.style.display = "none";
mysuccess!.style.display = "none";
myfail!.style.display = "none";

// Sent info to deployment portal URL

function submittedstring(event: any) {
  let submitemail;
  let submittoken;
  submitemail = emailAddress;
  submittoken = mytoken.value;
  console.log(submitemail);
  console.log(submittoken);

  if (submittoken && submitemail) {
    let myForm = document.getElementById("myForm");
    myForm!.style.display = "none";

    mysent!.style.display = "block";

    postToken(submittoken, submitemail);

    // window.open(
    //   "https://www.w3schools.com/?token=" +
    //     submittoken +
    //     "/?email=" +
    //     emailAddress
    // );
  } else {
    submissionProblem();
  }
}

mysubmit!.addEventListener("click", submittedstring); //Event listener on Submit Button

function haveParams(token: string, email: string) {
  console.log("Auto submitting");
  let submitemail;
  let submittoken;
  submitemail = email;
  submittoken = token;
  console.log(submitemail);
  console.log(submittoken);

  // window.open(
  //   "https://www.w3schools.com/?token=" +
  //     submittoken +
  //     "/?email=" +
  //     emailAddress
  // );
}
function noParams() {
  console.log("No credentials supplied submitting");
}

// Get Query Params
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const grabbedtoken = urlParams.get("token");
console.log(grabbedtoken);

// grabbedtoken && grabbedemail ? { haveParams()} : { noParams()};
if (grabbedtoken) {
  haveParams(grabbedtoken, emailAddress!);
} else noParams();

function postToken(token: string, email: string) {
  let targetUrl: string = "www.w3schools.com";

  let data: object = {
    token: token,
    notificationEmail: email
  };

  let databody: string = JSON.stringify(data);

  console.log("Doing request with ..." + databody);

  let otherParams = {
    headers: { "content-type": "application/json ; charset=UTF-8 " },
    body: databody,
    method: "POST"
  };
  fetch(targetUrl, otherParams)
    .then(data => {
      return data.json;
    })
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
}

function submissionProblem() {}

function handleResponse(response: { status: string; message: string }) {
  if (response.status == "SUCCESS") {
    mysuccess!.style.display = "block";
  } else if (response.status == "FAILURE") {
    myfail!.style.display = "block";
  }
}
