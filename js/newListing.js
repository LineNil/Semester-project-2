/**
 * Constant containing the API URL.
 * @constant {string}
 */
const ApiUrl = 'https://api.noroff.dev/api/v1';


/**
 * Creates a new auction listing.
 *
 * @param {string} listingTitle - The title of the auction listing.
 * @param {string} listingDeadline - The deadline for the auction listing.
 * @param {string} listingContent - The description content of the auction listing.
 * @param {string[]} mediaUrls - An array of media URLs associated with the auction listing.
 * @param {string} accessToken - The access token for authorization.
 * @returns {Promise<Object | null>} A promise that resolves to the new auction listing object or null if there is an error.
 */

async function createNewListing(listingTitle, listingDeadline, listingContent, mediaUrls, accessToken) {
  try {
    const endsAtDate = new Date(listingDeadline);

    if (!(endsAtDate instanceof Date) || isNaN(endsAtDate) || endsAtDate <= new Date()) {
      alert('Date: must be newer than todays date.');
      return null;
    }

    const mediaArray = mediaUrls && mediaUrls.length > 0 ? mediaUrls : [];

    const listingData = {
      title: listingTitle,
      endsAt: endsAtDate.toISOString(),
      description: listingContent,
      media: mediaArray,
    };

    if (!accessToken) {
      return null;
    }

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
      alert(`A listing has been made (ID:  ${newListing.id})`);
      return newListing;
    } else {
      return null;
    }
  } catch (error) {
    alert('Error creating listing');
    return null;
  }
}

const listingForm = document.getElementById('listingForm');

listingForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const listingTitle = document.getElementById('listingTitle').value;
  const listingDeadline = document.getElementById('listingDeadline').value;
  const listingContent = document.getElementById('listingContent').value;
  const listingMediaInput = document.getElementById('listingMedia');
  const mediaUrls = listingMediaInput.value.split(',').map(url => url.trim());

  if (mediaUrls.length > 0 && mediaUrls[0] !== '') {
  } else {
    alert('At least one Media URL is required'); 
    return;
  }

  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return;
  }

  const newListing = await createNewListing(listingTitle, listingDeadline, listingContent, mediaUrls, accessToken);

  if (newListing) {

    const auctionContainer = document.getElementById('auctionContainer');

    const auctionDiv = document.createElement('div');
    auctionDiv.classList.add('row', 'pt3', 'right-col', 'mt-5');

    const listingsDiv = document.createElement('div');
    listingsDiv.classList.add('col-md-6', 'me-4', 'bg-listing', 'p-3', 'ps-5', 'pe-5', 'g-0');
    auctionDiv.appendChild(listingsDiv);

    const auctionImg = document.createElement('img');

    if (newListing.media && newListing.media.length > 0 && newListing.media[0]) {
      auctionImg.src = newListing.media[0];
    } else {
      auctionImg.src = '../images/judgehammer.jpg';
    }

    auctionImg.classList.add('listing-img');
    listingsDiv.appendChild(auctionImg);

    const auctionTitle = document.createElement('h4');
    auctionTitle.textContent = `Title: ${newListing.title}`;
    auctionTitle.classList.add('listing-heading', 'pt-2');
    listingsDiv.appendChild(auctionTitle);

    const auctionDescription = document.createElement('p');
    auctionDescription.textContent = `Description: ${newListing.description}`;
    auctionDescription.classList.add('listing-description', 'mt-3');
    listingsDiv.appendChild(auctionDescription);

  
    auctionContainer.appendChild(auctionDiv);

    document.getElementById('listingTitle').value = '';
    document.getElementById('listingDeadline').value = '';
    document.getElementById('listingContent').value = '';
    document.getElementById('listingMedia').value = '';
  }
});