const ApiUrl = 'https://api.noroff.dev';

/**
 * Registers a user by sending a POST request to the specified URL with user registration data.
 *
 * @param {string} url - The URL to send the registration request to.
 * @param {Object} data - The user registration data to be sent in the request body.
 * @returns {Promise<Object>} A Promise that resolves to the response JSON data.
 * @throws {Error} If there is an error during the registration process.
 */

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
      window.location.href = '/profile/index.html';
    } else {
    }
    return json;
  } catch (error) {
  }
}

/**
 * Registers a user by handling form submission and validation.
 * @param {string} url - The URL to which the registration data will be sent.
 * @param {object} data - The user registration data, including name, email, and password.
 */

document.addEventListener('DOMContentLoaded', function () {
  const registrationForm = document.getElementById('registrationForm');
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailError');

  registrationForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const passwordInput = document.getElementById('password');

    const user = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };

    const isValidNoroffEmail = isValidEmail(user.email);

    if (!isValidNoroffEmail) {
      emailError.style.display = 'block';
      return; 
    }
    emailError.style.display = 'none';

    await registerUser(`${ApiUrl}/api/v1/social/auth/register`, user);
  });

  function isValidEmail(email) {
    const noroffEmailRegex = /^(.+)@noroff\.no$/;
    return noroffEmailRegex.test(email);
  }
  
});