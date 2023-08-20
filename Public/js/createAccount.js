const createAccountFormHandler = async (event) => {
    event.preventDefault();
  
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    console.log(firstName)
    console.log(lastName)
    console.log(username)
    console.log(password)
  
    if (firstName && lastName && username && password) {
      console.log("got the info")

      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/login');
      } else {
        alert('Failed to create account');
      }
    }
  };
  
  document
  .querySelector('.create-account-form')
  .addEventListener('submit', createAccountFormHandler);

  $("#password, #confirm-password").on("keyup", function () {

    if ($("#password").val() == $("#confirm-password").val()) {
      $("#password-message").html("Passwords match!").css("color", "green");
      $("#save").removeClass("disabled");
    } else {
      $("#password-message").html("Passwords do not match!").css("color", "red");
      $("#save").addClass("disabled");
    }
  });