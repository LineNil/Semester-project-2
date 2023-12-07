/**
 * Konstant som inneholder API-URLen.
 * @constant {string}
 */
const ApiUrl = 'https://api.noroff.dev/api/v1';

/**
 * Function to fetch user profile information from local storage.
 *
 * @async
 * @function
 * @throws {Error} If there is an error during the fetching of profile information.
 * @returns {Promise<?Object>} A promise resolved with user profile information if available, otherwise null.
 */
async function fetchProfileInfo() {
  try {
     /**
     * The profile information stored in local storage.
     * @type {?string}
     */
    const storedProfile = localStorage.getItem('profile');

    if (storedProfile) {
            /**
       * The profile information as a JavaScript object.
       * @type {Object}
       */
      const profileInfo = JSON.parse(storedProfile);

      return profileInfo;
    } else {

      return null;
    }
  } catch (error) {

    return null;
  }
}
/**
 * AccessToken from local storage.
 * @type {?string}
 */
const accessToken = localStorage.getItem('accessToken');

/**
 * User profile information fetched from local storage.
 * @type {?Object}
 */
const profileInfo = await fetchProfileInfo();


/**
 * HTML element displaying the user's avatar.
 * @type {HTMLElement}
 */
const profileAvatarElement = document.getElementById('profileAvatar');

/**
 * HTML element displaying the user's name.
 * @type {HTMLElement}
 */
const profileNameElement = document.getElementById('profileName');

/**
 * HTML element displaying the user's credits.
 * @type {HTMLElement}
 */
const profileCreditsElement = document.getElementById('profileCredits');


if (profileInfo && profileInfo.name) {
  profileNameElement.textContent = `${profileInfo.name}`;
} else {
  profileNameElement.textContent = 'Unknown User';
}

if (profileInfo && profileInfo.credits) {
  profileCreditsElement.textContent = `Credits: ${profileInfo.credits}`;
} else {
  profileCreditsElement.textContent = 'Unknown Credit';
}