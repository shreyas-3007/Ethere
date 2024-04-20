function validateForm() {
  var username = document.getElementById("username").value;
  var isValid = false;

  
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var phoneRegex = /^[0-9]{10}$/;

  if (emailRegex.test(username)) {
    
    isValid = true;
  } else if (phoneRegex.test(username)) {
    
    isValid = true;
  } else {
  
    alert("Please enter a valid email address or phone number.");
    isValid = false;
  }

  return isValid;
}