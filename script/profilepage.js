document.addEventListener('DOMContentLoaded', function() {
  const profileIcon = document.querySelector('.action_container');
  const profileModal = document.getElementById('profileModal');
  const closeModalBtn = document.getElementById('closeModal');
  const clickevent= document.getElementById('.profile-icon');

  profileIcon.addEventListener('click', function() {
      profileModal.style.display = 'block';
  });

  closeModalBtn.addEventListener('click', function() {
      profileModal.style.display = 'none';
  });
});

// const profileIcon = document.getElementById('profile-icon');
// const sidebar = document.getElementById('profileModal');

// profileIcon.addEventListener('click', () => {
//     sidebar.classList.toggle('active');
// });


