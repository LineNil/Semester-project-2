/**
 * Function to register a new user.
 * @param {string} url - The API endpoint URL for user registration.
 * @param {User} data - User data including name, email, password, and avatar.
 * @returns {Promise<object>} A promise that resolves to the JSON response from the registration API.
 * @throws {Error} If there is an error during the registration process. 
*/



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
      alert ('Welcome to AuctionNest! Your signup was a success! (Please log in to continue)');
      localStorage.setItem('userAvatar', data.avatar || null);
      
      window.location.href = '/index.html';
      
    } else {
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
    const confirmPasswordInput = document.getElementById('confirmPassword')
    const avatarInput = document.getElementById('avatar');

    if(passwordInput.value !== confirmPasswordInput.value) {
      alert('Passwords do not match')
      return;
    }

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

    /**
   * Function to check if an email is a valid Noroff email.
   * @param {string} email - The email address to validate.
   * @returns {boolean} True if the email is a valid Noroff email, false otherwise.
   */

  function isValidEmail(email) {
    const noroffEmailRegex = /^(.+)@(stud\.)?noroff\.no$/;
    return noroffEmailRegex.test(email);
  }
});
