// Toggle menu function for burger icon
function toggleMenu(burger) {
  burger.classList.toggle("open");
  document.querySelector(".nav-links").classList.toggle("menu-active");
}

// Show/hide password functionality for both fields (check if elements exist)
const passwordField = document.getElementById('password');
const confirmPasswordField = document.getElementById('confirmPassword');
const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

// Show the eye icon only when user starts typing in the password field
if (passwordField && togglePassword) {
  passwordField.addEventListener('input', () => {
    togglePassword.style.display = passwordField.value ? 'block' : 'none';
  });

  togglePassword.addEventListener('click', () => {
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;
    togglePassword.classList.toggle('fa-eye');
    togglePassword.classList.toggle('fa-eye-slash');
  });
}

// Show the eye icon only when user starts typing in the confirm password field
if (confirmPasswordField && toggleConfirmPassword) {
  confirmPasswordField.addEventListener('input', () => {
    toggleConfirmPassword.style.display = confirmPasswordField.value ? 'block' : 'none';
  });

  toggleConfirmPassword.addEventListener('click', () => {
    const type = confirmPasswordField.type === 'password' ? 'text' : 'password';
    confirmPasswordField.type = type;
    toggleConfirmPassword.classList.toggle('fa-eye');
    toggleConfirmPassword.classList.toggle('fa-eye-slash');
  });
}

// Function to show code container when a card is clicked
function showCodeContainer() {
  const codeContainer = document.getElementById("code-container");

  // Show the code container
  codeContainer.classList.remove("hidden");
}
// Sidebar Toggle on Mobile
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const burger = document.querySelector('.burger');

  sidebar.classList.toggle('active');
  burger.classList.toggle('active');

  // Save sidebar state in localStorage
  localStorage.setItem('sidebarActive', sidebar.classList.contains('active'));
}

// Function to Set Active Link and Open Relevant Dropdowns
function setActiveLink() {
  const path = window.location.pathname;

  // Find the active link based on URL path
  const activeLink = document.querySelector(`.sidebar a[href="${path}"]`);

  if (activeLink) {
    activeLink.classList.add('active-page');

    let parent = activeLink.closest("li[data-target]"); // Find the parent <li>

    if (parent) {
      parent.classList.add("open-style"); // Apply active styles to parent
      
      const dropdown = parent.querySelector(".dropdown");
      if (dropdown) {
        dropdown.classList.add("active"); // Ensure active dropdown is open
        
        const arrowIcon = parent.querySelector('.arrow-icon i');
        if (arrowIcon) {
          arrowIcon.style.transform = 'translateX(30px) rotate(180deg)'; // Move right & rotate up
        }

        localStorage.setItem(dropdown.id + 'Open', true);
      }
    }
  }
}

// Toggle Dropdown Menu on Click
document.addEventListener("DOMContentLoaded", function () {
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  dropdownToggles.forEach(toggle => {
    const dropdown = toggle.nextElementSibling; // Get the dropdown menu
    const parentLi = toggle.closest("li[data-target]"); // Get the parent <li>

    // Ensure dropdown is hidden by default
    if (dropdown) {
      dropdown.classList.remove("active");
    }

    toggle.addEventListener('click', function(event) {
      event.preventDefault();  // Prevent default action

      // Toggle dropdown visibility
      dropdown.classList.toggle('active');
      
      if (dropdown.classList.contains('active')) {
        parentLi.classList.add('open-style'); // Apply styles when open
      } else {
        parentLi.classList.remove('open-style'); // Remove styles when closed
      }

      // Rotate arrow icon smoothly
      const arrowIcon = toggle.querySelector('.arrow-icon i');
      if (dropdown.classList.contains('active')) {
        arrowIcon.style.transform = 'translateX(30px) rotate(180deg)';
      } else {
        arrowIcon.style.transform = 'translateX(0) rotate(0deg)';
      }

      // Save dropdown state in localStorage
      localStorage.setItem(dropdown.id + 'Open', dropdown.classList.contains('active'));
    });

    // Restore dropdown state from localStorage
    const savedState = localStorage.getItem(dropdown.id + 'Open');
    if (savedState === "true") {
      dropdown.classList.add("active");
      parentLi.classList.add("open-style");

      const arrowIcon = toggle.querySelector('.arrow-icon i');
      if (arrowIcon) {
        arrowIcon.style.transform = 'translateX(30px) rotate(180deg)';
      }
    }
  });

  setActiveLink(); // Call function to set the active link
});


// //Copy icon
document.addEventListener("DOMContentLoaded", () => {
  const copyIcon = document.querySelector(".copy .fa-copy"); // Select the copy icon
  const h3Element = document.querySelector(".copy h3"); // Select the <h3> element
  const copyMessage = document.getElementById("copyMessage"); // Select the message span

  if (copyIcon && h3Element && copyMessage) { // Check if elements exist
    copyIcon.addEventListener("click", () => {
      const textToCopy = h3Element.innerText; // Get text from the <h3> element

      // Use Clipboard API to copy text
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          // Show the "Text copied!" message
          copyMessage.style.display = "inline";
          
          // Hide the message after 2 seconds
          setTimeout(() => {
            copyMessage.style.display = "none";
          }, 2000);
        })
        .catch(err => {
          console.error("Error copying text: ", err);
        });
    });
  } else {
    console.warn("Copy icon, <h3> element, or copy message element not found.");
  }
});
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const burger = document.querySelector('.burger');

    // استعادة حالة الـ sidebar
    const sidebarActive = localStorage.getItem('sidebarActive') === 'true';
    if (sidebarActive) {
        sidebar.classList.add('active');
        burger.classList.add('active');
    }

    // استعادة حالة القوائم المنسدلة
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropdownId = dropdown.id;
        const dropdownOpen = localStorage.getItem(dropdownId + 'Open') === 'true';
        if (dropdownOpen) {
            dropdown.classList.add('active');
            const arrowIcon = dropdown.previousElementSibling.querySelector('.arrow-icon i');
            if (arrowIcon) arrowIcon.style.transform = 'rotate(180deg)';
        }
    });

    // تحديد الرابط النشط
    setActiveLink();
});