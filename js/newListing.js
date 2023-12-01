const ApiUrl = 'https://api.noroff.dev/api/v1';

// Funksjon for å hente brukerprofilinformasjon fra lokal lagring
async function fetchProfileInfo() {
  try {
    const storedProfile = localStorage.getItem('profile');

    if (storedProfile) {
      const profileInfo = JSON.parse(storedProfile);
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

// Funksjon for å laste opp mediefiler til serveren
async function uploadMedia(files, accessToken) {
  try {
    const formData = new FormData();
    for (const file of files) {
      formData.append('media', file);
    }
    const response = await fetch(`${ApiUrl}/auction/listings/media`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (response.ok) {
      const mediaUrls = await response.json();
      console.log('Media URLs:', mediaUrls);
      return mediaUrls;
    } else {
      console.error('Error uploading media:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error uploading media:', error);
    return null;
  }
}

// Funksjon for å opprette en ny auksjonsoppføring
async function createNewListing(listingTitle, listingDeadline, listingContent, listingMedia, accessToken) {
  try {
    const endsAtDate = new Date(listingDeadline);

    // Sjekk om sluttdatoen er gyldig
    if (!(endsAtDate instanceof Date) || isNaN(endsAtDate) || endsAtDate <= new Date()) {
      console.error('Invalid endsAt date');
      return null;
    }

    // Last opp mediefiler hvis de er inkludert
    const mediaUrls = Array.isArray(listingMedia) ? await uploadMedia(listingMedia, accessToken) : [];

    // Opprett auksjonsdataobjekt
    const listingData = {
      title: listingTitle,
      endsAt: endsAtDate.toISOString(),
      description: listingContent,
      media: mediaUrls,
    };

    // Sjekk om accessToken er definert
    if (!accessToken) {
      return null;
    }

    // Utfør en POST-forespørsel til auksjons-APIet med auksjonsdataene
    const response = await fetch(`${ApiUrl}/auction/listings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(listingData),
    });

    if (response.ok) {
      const newListing = await response.json();
      console.log('New Listing:', newListing);
      alert(`A listing has been made (ID ${newListing.id})`);
      return newListing;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error creating listing:', error);
    return null;
  }
}

// Logging for accessToken
const accessToken = localStorage.getItem('accessToken');
console.log('AccessToken:', accessToken);

// Logging for profileInfo
const profileInfo = await fetchProfileInfo(accessToken);
console.log('ProfileInfo:', profileInfo);

// Hent HTML-elementer
const profileNameElement = document.getElementById('profileName');
const profileCreditsElement = document.getElementById('profileCredits');
const listingForm = document.getElementById('listingForm');

// Vis brukerinformasjon på siden
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

// Event listener for auksjonsformularet
listingForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const listingTitle = document.getElementById('listingTitle').value;
  const listingDeadline = document.getElementById('listingDeadline').value;
  const listingContent = document.getElementById('listingContent').value;
  const listingMediaInput = document.getElementById('listingMedia');
  const mediaUrl = listingMediaInput.value.trim();

  // Sjekk om media URL er gyldig
if (mediaUrl) {
  // Legg til logikk for å håndtere den innsendte media URL-en
  console.log('Media URL:', mediaUrl);
} else {
  console.error('Media URL is required');
  // Eventuell alternativ håndtering, for eksempel gi brukeren en feilmelding
}

  // Sjekk om accessToken er definert
  if (!accessToken) {
    console.error('Access token is undefined');
    // Du kan håndtere dette tilfellet, for eksempel ved å omdirigere brukeren til påloggingssiden.
    return;
  }

  // Opprett en ny auksjonsoppføring
  const newListing = await createNewListing(listingTitle, listingDeadline, listingContent, listingMediaInput, accessToken);
  console.log('New Listing:', newListing); 

  if (newListing) {
    // Opprett HTML-elementer for den nye auksjonsoppføringen
    const auctionContainer = document.getElementById('auctionContainer');

    const auctionDiv = document.createElement('div');
    auctionDiv.classList.add('row', 'pt3', 'right-col', 'mt-5');

    const listingsDiv = document.createElement('div');
    listingsDiv.classList.add('col-md-6', 'me-4', 'bg-listing', 'p-3', 'ps-5', 'pe-5', 'g-0');
    auctionDiv.appendChild(listingsDiv);

console.log('Media URLs in newListing:', newListing.media);
    const auctionImg = document.createElement('img');
    // Sjekk om media informasjon er tilgjengelig og gyldig
    if (newListing.media && newListing.media.length > 0 && newListing.media[0]) {
      auctionImg.src = newListing.media[0];
    } else {
      console.error('Media information missing or invalid in newListing');
      // Eventuell alternativ håndtering, for eksempel en standardbilde URL
      // auctionImg.src = 'https://eksempel.com/standard-bilde.jpg';
    }
    
    auctionImg.classList.add('listing-img');
    listingsDiv.appendChild(auctionImg);
    console.log('Media URL:', newListing.media[0]);


    const auctionTitle = document.createElement('h4');
    auctionTitle.textContent = `Title: ${newListing.title}`;
    auctionTitle.classList.add('listing-heading', 'pt-2');
    listingsDiv.appendChild(auctionTitle);

    const auctionDescription = document.createElement('p');
    auctionDescription.textContent = `Description: ${newListing.description}`;
    auctionDescription.classList.add('listing-description', 'mt-3');
    listingsDiv.appendChild(auctionDescription);

    // Legg til den nye auksjonsoppføringen på siden
    auctionContainer.appendChild(auctionDiv);

    // Tøm skjemafeltene
    document.getElementById('listingTitle').value = '';
    document.getElementById('listingDeadline').value = '';
    document.getElementById('listingContent').value = '';
    document.getElementById('listingMedia').value = '';
  }
});