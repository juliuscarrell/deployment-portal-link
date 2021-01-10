"use strict";
var mysubmit = document.getElementById("subButton"); // Grab Button
console.log(mysubmit);
var myemail = document.getElementById("email"); // Grab emai input box
console.log(myemail);
var mytoken = document.getElementById("token"); // Grab token input box
console.log(mytoken);
var emailAddressNode = document.getElementById("user_email_address");
var emailAddress = emailAddressNode.textContent;
console.log("User email address is " + emailAddress);
var mysent = document.getElementById("my_form_sent"); // Grab emai input box
var mysuccess = document.getElementById("my_form_success"); // Grab emai input box
var myfail = document.getElementById("my_form_failure"); // Grab emai input box
mysent.style.display = "none";
mysuccess.style.display = "none";
myfail.style.display = "none";
// Sent info to deployment portal URL
function submittedstring(event) {
    var submitemail;
    var submittoken;
    submitemail = emailAddress;
    submittoken = mytoken.value;
    console.log(submitemail);
    console.log(submittoken);
    if (submittoken && submitemail) {
        var myForm = document.getElementById("myForm");
        myForm.style.display = "none";
        mysent.style.display = "block";
        postToken(submittoken, submitemail);
        // window.open(
        //   "https://www.w3schools.com/?token=" +
        //     submittoken +
        //     "/?email=" +
        //     emailAddress
        // );
    }
    else {
        submissionProblem();
    }
}
mysubmit.addEventListener("click", submittedstring); //Event listener on Submit Button
function haveParams(token, email) {
    console.log("Auto submitting");
    var submitemail;
    var submittoken;
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
var queryString = window.location.search;
console.log(queryString);
var urlParams = new URLSearchParams(queryString);
var grabbedtoken = urlParams.get("token");
console.log(grabbedtoken);
// grabbedtoken && grabbedemail ? { haveParams()} : { noParams()};
if (grabbedtoken) {
    haveParams(grabbedtoken, emailAddress);
}
else
    noParams();
function postToken(token, email) {
    var targetUrl = "www.w3schools.com";
    var data = {
        token: token,
        notificationEmail: email
    };
    var databody = JSON.stringify(data);
    console.log("Doing request with ..." + databody);
    var otherParams = {
        headers: { "content-type": "application/json ; charset=UTF-8 " },
        body: databody,
        method: "POST"
    };
    fetch(targetUrl, otherParams)
        .then(function (data) {
        return data.json;
    })
        .then(function (res) {
        console.log(res);
    })
        .catch(function (error) {
        console.log(error);
    });
}
function submissionProblem() { }
function handleResponse(response) {
    if (response.status == "SUCCESS") {
        mysuccess.style.display = "block";
    }
    else if (response.status == "FAILURE") {
        myfail.style.display = "block";
    }
}
