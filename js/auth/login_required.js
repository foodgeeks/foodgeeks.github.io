mixpanel.track("Login required.");
$("#login_submit").click(function() {
  mixpanel.track("Login form submitted.");
});