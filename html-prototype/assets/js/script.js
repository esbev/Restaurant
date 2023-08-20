$("#password, #confirm-password").on("keyup", function () {

  if ($("#password").val() == $("#confirm-password").val()) {
    $("#password-message").html("Passwords match!").css("color", "green");
    $("#save").removeClass("disabled");
  } else {
    $("#password-message").html("Passwords do not match!").css("color", "red");
    $("#save").addClass("disabled");
  }
});