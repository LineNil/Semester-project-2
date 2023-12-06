// profile.js

const ApiUrl = 'https://api.noroff.dev/api/v1';

// Funksjon for å hente brukerprofilinformasjon fra lokal lagring
async function fetchProfileInfo() {
  try {
    const storedProfile = localStorage.getItem('profile');

    if (storedProfile) {
      const profileInfo = JSON.parse(storedProfile);
      console.log('Profile data found in local storage:', profileInfo);
      return profileInfo;
    } else {
      console.error('Profile data not found in local storage.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching profile info:', error);
    return null;
  }
}

// Logging for accessToken
const accessToken = localStorage.getItem('accessToken');
console.log('AccessToken:', accessToken);

// Logging for profileInfo
const profileInfo = await fetchProfileInfo();
console.log('ProfileInfo:', profileInfo);

// Hent HTML-elementer
const profileAvatarElement = document.getElementById('profileAvatar');
const profileNameElement = document.getElementById('profileName');
const profileCreditsElement = document.getElementById('profileCredits');

// Vis brukerinformasjon på siden

// viser navn
if (profileInfo && profileInfo.name) {
  profileNameElement.textContent = `${profileInfo.name}`;
} else {
  profileNameElement.textContent = 'Unknown User';
}

// viser credit
if (profileInfo && profileInfo.credits) {
  profileCreditsElement.textContent = `Credits: ${profileInfo.credits}`;
} else {
  profileCreditsElement.textContent = 'Unknown Credit';
}