function validateForm() {
  var name = document.getElementById("name").value;
  var username = document.getElementById("username").value;
  var dob = document.getElementById("dob").value;
  var gender = document.getElementById("gender").value;

  // Regular expression for email and phone number validation
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var phoneRegex = /^[0-9]{10}$/;

  // Check if username is either a valid email address or phone number
  if (!(emailRegex.test(username) || phoneRegex.test(username))) {
    alert("Please enter a valid email address or phone number.");
    return false;
  }

  // Check if date of birth is not in the future
  var today = new Date();
  var selectedDate = new Date(dob);
  if (selectedDate > today) {
    alert("Date of birth cannot be in the future.");
    return false;
  }

  // Validation successful
  return true;
}


// Password validation 

document.getElementById('password').addEventListener('input', function() {
  var password = this.value;
  var validationMessage = document.getElementById('validationMessage');

  if (password.length < 8) {
    validationMessage.textContent = 'Password must be at least 8 characters long.';
    validationMessage.style.display = 'block';
  } else if (!/[0-9]/.test(password)) {
    validationMessage.textContent = 'Password must contain at least one number.';
    validationMessage.style.display = 'block';
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    validationMessage.textContent = 'Password must contain at least one symbol.';
    validationMessage.style.display = 'block';
  } else {
    validationMessage.textContent = '';
    validationMessage.style.display = 'none';
  }
});
