document.addEventListener('DOMContentLoaded', function() {
  const profileIcon = document.querySelector('.action_container');
  const profileModal = document.getElementById('profileModal');
  const closeModalBtn = document.getElementById('closeModal');
  const clickevent= document.getElementById('.profile-icon');
document.addEventListener("DOMContentLoaded", function () {
  const profileIcon = document.querySelector(".action_container");
  const profileModal = document.getElementById("profileModel");
  const closeModalBtn = document.getElementById("closeModel");
  const clickevent = document.getElementById(".profile-icon");

 

  profileIcon.addEventListener("click", function () {
    profileModal.style.display = "block";
  });

  closeModalBtn.addEventListener("click", function () {
    profileModal.style.display = "none";
  });
});

// const profileIcon = document.getElementById('profile-icon');
// const sidebar = document.getElementById('profileModal');

// profileIcon.addEventListener('click', () => {
//     sidebar.classList.toggle('active');
// });

// function displayprofile() {
//   let profileElement = document.querySelector(".model");

//   let innerHTML = "";

//   innerHTML += `<div class="first_div">
//   <div class="customer_info">
//     <div class="profile_photo">
//       <img src="images/ethere_logo.jpg" alt="" />
//     </div>
//     <h2 class="customer_name"> Hey Shreyas Patil</h2>
//   </div>

//   <div id="closeModel">
//     <span class="material-symbols-outlined"> close </span>
//   </div>`;
// }
