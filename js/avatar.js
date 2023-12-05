const apiUrl = 'https://api.noroff.dev/api/v1';

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

document.addEventListener('DOMContentLoaded', async function () {
  const profileInfo = await fetchProfileInfo();
  const profileAvatarElement = document.getElementById('profileAvatar');
  const newAvatarUrlInput = document.getElementById('avatarUrl');
  const updateAvatarBtn = document.getElementById('updateAvatarBtn');
  const avatarForm = document.getElementById('avatarForm');

  const userAvatar = localStorage.getItem('userAvatar');

  if (userAvatar) {
    profileAvatarElement.src = userAvatar;
  } else {
    profileAvatarElement.style.display = 'none';
  }

  updateAvatarBtn.addEventListener('click', function () {
    handleUpdateAvatar();
  });

  avatarForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    console.log('Submit event handler is working!');
    handleUpdateAvatar();
  });

  async function handleUpdateAvatar() {
    const newAvatarUrl = newAvatarUrlInput.value.trim();

    if (newAvatarUrl) {
      try {
        await updateAvatarOnServer(newAvatarUrl, profileInfo);
        saveAvatarToLocal(newAvatarUrl, profileInfo);
      } catch (error) {
        console.error('Error updating avatar:', error);
        alert('There was a problem updating your avatar.');
      }
    } else {
      alert('Please enter a valid avatar URL.');
    }
  }

  async function updateAvatarOnServer(newAvatarUrl, profileInfo) {
    const token = localStorage.getItem('accessToken');

    const response = await fetch(`${apiUrl}/auction/profiles/${profileInfo.name}/media`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ avatar: newAvatarUrl }),
    });

    if (!response.ok) {
      throw new Error(`Error updating avatar: ${response.statusText}`);
    }
  }

  function saveAvatarToLocal(newAvatarUrl, profileInfo) {
    localStorage.setItem('userAvatar', newAvatarUrl);
    console.log(newAvatarUrl);

    profileAvatarElement.src = newAvatarUrl;

    const storedProfile = localStorage.getItem('profile');

    if (storedProfile) {
      const updatedProfileInfo = { ...profileInfo, avatar: newAvatarUrl };
      localStorage.setItem('profile', JSON.stringify(updatedProfileInfo));
    }

    newAvatarUrlInput.value = '';
  }
});
