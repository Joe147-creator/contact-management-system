const API = "http://localhost:3000";

const form = document.getElementById('contactForm');
const message = document.getElementById('message');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;

  fetch(`${API}/add-contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, phone, email })
  })
  .then(res => res.json())
  .then(data => {
    form.reset();

    // Show success message with animation
    message.textContent = data.message;
    message.style.opacity = "1";

    // Hide after 3 seconds
    setTimeout(() => {
      message.style.opacity = "0";
    }, 3000);
  })
  .catch(() => {
    message.textContent = "Error saving contact";
    message.style.color = "red";
    message.style.opacity = "1";
  });
});