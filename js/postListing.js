/*const ApiUrl = 'https://api.noroff.dev/api/v1';

async function createNewListing(listingTitle, listingDeadline, listingContent, listingMedia, accessToken) {
  try {
    const listingData = {
      title: listingTitle,
      deadline: listingDeadline,
      body: listingContent,
      media: listingMedia
    };

    if (!accessToken) {
      return;
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

      console.log('New Listing:', newListing);

      alert(`A listing has been made (ID ${newListing.id})`);
      return newListing;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export { createNewListing };
*/