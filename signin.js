const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

// Toggle between forms
signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});
signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});

// Register Handler
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const body = Object.fromEntries(formData.entries());

  try {
    const res = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      alert("✅ Account created! You can now sign in.");
      container.classList.remove("right-panel-active");
    } else {
      const msg = await res.text();
      alert("❌ Registration failed: " + msg);
    }
  } catch (err) {
    alert("⚠️ Error: " + err.message);
  }
});

// Login Handler
document.getElementById('signin-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const body = Object.fromEntries(formData.entries());

  // Get selected role from radio buttons
  const selectedRole = document.querySelector('input[name="role"]:checked')?.value;
  if (!selectedRole) {
    alert("⚠️ Please select a role (Customer or Farmer).");
    return;
  }

  body.role = selectedRole;

  try {
	alert("✅ Login successful!");
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
		console.log(res);
    if (!res.ok) {
      const msg = await res.text();
      alert("❌ Login failed: " + msg);
      return;
    }

    alert("✅ Login successful!");

    // Redirect based on selected role
    if (selectedRole === 'farmer') {
      window.location.href = '/farmer-dashboard.html';
    } else if (selectedRole === 'customer') {
      window.location.href = '/home.html';
    } else {
      alert("⚠️ Unknown role selected.");
    }
  } catch (err) {
    alert("⚠️ Error: " + err.message);
  }
});
