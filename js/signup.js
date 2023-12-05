const ApiUrl = 'https://api.noroff.dev';

async function registerUser(url, data) {
  try {
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    const json = await response.json();

    if (response.ok) {

      console.log('Avatar URL:', data.avatar);
      localStorage.setItem('userAvatar', data.avatar || null);
      // Handle successful registration (optional)
      window.location.href = '/profile/index.html';
    } else {
      // Handle registration error (optional)
      console.error('Registration failed:', json.message);
    }
    return json;
  } catch (error) {
    console.error('Error during registration:', error);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const registrationForm = document.getElementById('registrationForm');
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailError');

  registrationForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const passwordInput = document.getElementById('password');
    const avatarInput = document.getElementById('avatar');

    const user = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      avatar: avatarInput.value,
    };

    const isValidNoroffEmail = isValidEmail(user.email);

    if (!isValidNoroffEmail) {
      emailError.style.display = 'block';
      return;
    }
    emailError.style.display = 'none';


    await registerUser(`${ApiUrl}/api/v1/auction/auth/register`, user);
  });

  function isValidEmail(email) {
    const noroffEmailRegex = /^(.+)@(stud\.)?noroff\.no$/;
    return noroffEmailRegex.test(email);
  }
});
