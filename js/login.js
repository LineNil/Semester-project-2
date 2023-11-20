const ApiUrl = 'https://api.noroff.dev';

/**
 * Function to access token after logging in
 * @param {string} accessToken 
 */

function saveUserData(accessToken) {
  localStorage.setItem('accessToken', accessToken);

}

/**
 * Attempts to log in a user by sending a POST request to the specified URL with user data.
 *
 * @async
 * @param {string} url - The URL to which the POST request is sent.
 * @param {Object} data - User data to be sent as the request payload.
 * @param {string} data.email - The user's email address.
 * @param {string} data.password - The user's password.
 * @throws {Error} If there is an issue with the network request or the response.
 * @returns {Promise<Object>} A Promise that resolves to the response JSON data.
 */

async function loginUser(url, data) {
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

      const accessToken = json.accessToken;
      
      saveUserData(accessToken);

      window.location.href = '/profile/index.html';
    } else {

      const errorMessage = document.getElementById('error-message');
      errorMessage.textContent = 'Wrong email or password, please try again.';
    }
    return json;
  } catch (error) {
  }
}

/**
 * Attaches an event listener to the DOMContentLoaded event, which handles form submission
 * for user login when the document is fully loaded.
 *
 * @param {Event} event - The DOMContentLoaded event.
 */

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('emailLogIn');
    const passwordInput = document.getElementById('passwordLoggIn');

    const { name, email, password } = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };

    await loginUser(`${ApiUrl}/api/v1/social/auth/login`, { name, email, password });
  });
});
