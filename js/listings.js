/**
 * Constants containing the API URL.
 * @constant {string}
 */
const ApiUrl = 'https://api.noroff.dev/api/v1';
const listingsUrl = '/auction/listings?_bids=true';

/**
 * Logs out the user by removing relevant items from local storage and redirecting to the login page.
 *
 * @function
 * @returns {void}
 */
function logoutUser(){
  localStorage.removeItem('accessToken');
  localStorage.removeItem('profile');
  localStorage.removeItem('userAvatar');

  window.location.href = '../index.html';
}

/**
 * Asynchronously fetches data from a specified URL using a Bearer token for authorization.
 *
 * @async
 * @function
 * @param {string} url - The URL to fetch data from.
 * @throws {Error} If there is an issue with the fetch operation.
 * @returns {Promise<void>} A Promise that resolves when the fetch operation is complete.
 */
export async function fetchWithToken(url) {
  try {
    const token = localStorage.getItem('accessToken');
    const getData = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, getData);
    const json = await response.json();

    const auctionContainer = document.getElementById('auctionContainer');

    json.forEach((auction) => {
      if (auction.title && auction.media && auction.media.length) {





///row 2 auctions
    const auctionDiv = document.createElement('div');
    auctionDiv.classList.add('row', 'pt3', 'right-col', 'mt-5');

    const listingsDiv = document.createElement('div');
    listingsDiv.classList.add('col-md-6', 'bg-listing', 'p-3', 'ps-5', 'pe-5', 'g-0');
    auctionDiv.appendChild(listingsDiv);
      

if (auction.media && auction.media.length > 0) {
  auction.media.forEach((mediaUrl) => {
    const auctionImg = document.createElement('img');
    auctionImg.src = mediaUrl;
    auctionImg.classList.add('listing-img', 'profile-img');
    listingsDiv.appendChild(auctionImg);
  });
}

    const auctionTitle = document.createElement('h4');
    auctionTitle.textContent = `Title: ${auction.title}`;
    auctionTitle.classList.add('listing-heading', 'pt-2');
    listingsDiv.appendChild(auctionTitle);

    const auctionDescription = document.createElement('p');
    auctionDescription.textContent = `Description: ${auction.description}`;
    auctionDescription.classList.add('listing-description', 'mt-3');
    listingsDiv.appendChild(auctionDescription);
     


  //row 3 bids


    const bidsDiv = document.createElement('div');
    bidsDiv.classList.add('col-md-5', 'bg-listing','font-bid', 'g-0');

    const bidsContainer = document.createElement('div');
    bidsContainer.classList.add('container', 'p-4');
    bidsDiv.appendChild(bidsContainer);

    const deadlineRow = document.createElement('div');
    deadlineRow.classList.add('row');
    bidsContainer.appendChild(deadlineRow);

    const deadlineDiv = document.createElement('div');
    deadlineDiv.classList.add('col-md-12', 'd-flex', 'justift-content-center');
    deadlineRow.appendChild(deadlineDiv);

    const deadline = document.createElement('p');
    deadline.textContent = `Closes in:`;
    deadline.classList.add('deadline', 'pe-1', 'm-0');
    deadline.id = 'deadline';
    deadlineDiv.appendChild(deadline);

    const deadlineCount = document.createElement('p');
    deadlineCount.textContent = `${auction.endsAt}`;
    deadlineCount.classList.add('deadline', 'm-0');
    deadlineDiv.appendChild(deadlineCount);

    const deadlineWarning = document.createElement('p');
    deadlineWarning.textContent = `No bids will be placed after bid end.`;
    deadlineWarning.classList.add('bid-Warning');
    deadlineRow.appendChild(deadlineWarning);

//Place bids

    const placeBidContainer = document.createElement('div');
    placeBidContainer.classList.add('container');
    bidsDiv.appendChild(placeBidContainer);

    const bidCard = document.createElement('div');
    bidCard.classList.add('bid-card', 'p-3');
    bidsDiv.appendChild(bidCard);

    const bidForm = document.createElement('form');
    bidCard.appendChild(bidForm);

    const formGroupDiv = document.createElement('div');
    formGroupDiv.classList.add('form-group');
    bidForm.appendChild(formGroupDiv);

    const bidLabel = document.createElement('label');
    bidLabel.textContent = 'Your Bid:';
    bidLabel.setAttribute('for', 'bidAmount');
    bidLabel.classList.add('mb-2');
    formGroupDiv.appendChild(bidLabel);

    const bidInput = document.createElement('input');
    bidInput.type = 'text';
    bidInput.classList.add('form-control');
    bidInput.id = 'bidAmount';
    bidInput.placeholder = 'Enter your bid amount - NOK';
    bidInput.required = true;
    bidLabel.appendChild(bidInput);

    const placeBidButton = document.createElement('button');
    placeBidButton.type = 'button';
    placeBidButton.classList.add('btn', 'place-bid-btn', 'mt-4');
    placeBidButton.textContent = 'Place bid';
    bidForm.appendChild(placeBidButton);

    placeBidButton.addEventListener('click', async function () {
      try {
      const bidAmount = bidInput.value.trim();

      if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
        alert('Invalid bid amount');
      return;
     }

    const bidData = {
      amount: parseFloat(bidAmount),
    };

    const response = await fetch(`${ApiUrl}/auction/listings/${auction.id}/bids`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(bidData),
    });

    if (response.ok) {
      const newBid = await response.json();
      console.log('New Bid:', newBid);
      alert('Bid placed successfully!');
    
    } else {
      alert('Listing ended. No bids can be placed!');
      
    }
  } catch (error) {
    alert('An error occurred while placing the bid. Please try again later.');
    
  }
});

    const bidWarningDiv = document.createElement('div');
    bidWarningDiv.classList.add('d-flex', 'mt-3');
    bidForm.appendChild(bidWarningDiv);

  const questionIcon = document.createElement('i');
  questionIcon.classList.add('fa-regular', 'fa-circle-question');
  bidWarningDiv.appendChild(questionIcon);

  const bidWarningText = document.createElement('p');
  bidWarningText.textContent = 'Bidding info';
  bidWarningText.classList.add('bid-warning', 'ms-2');
  bidWarningDiv.appendChild(bidWarningText);   

  const previousBidsDiv = document.createElement('div');
  previousBidsDiv.classList.add('previous-bids', 'pt-3');
  bidsDiv.appendChild(previousBidsDiv);
      
  const previousBidsP = document.createElement('p');
  previousBidsP.textContent = 'Previous bids';
  previousBidsDiv.appendChild(previousBidsP);
      
  const commentBidContainer = document.createElement('div');
  commentBidContainer.classList.add('comment-bid-container', 'd-flex', 'flex-column', 'ms-4');
  previousBidsDiv.appendChild(commentBidContainer);
      
      
  if (auction._count && auction._count.bids > 0 && auction.bids && auction.bids.length > 0) {
    auction.bids.forEach((bid) => {
      const bidderBid = document.createElement('div');
      bidderBid.textContent = `${bid.bidderName}: ${bid.amount}`;
      bidderBid.classList.add('active-bid', 'me-2');
      commentBidContainer.appendChild(bidderBid);
    });
    } else {
    const noBidsMessage = document.createElement('div');
    noBidsMessage.textContent = 'No previous bids';
    commentBidContainer.appendChild(noBidsMessage);
    }


    auctionContainer.appendChild(auctionDiv);
    auctionDiv.appendChild(bidsDiv);
    bidsDiv.appendChild(placeBidContainer);
  }
});
  } catch (error) {
    alert('An error occurred. Please try again later.');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', logoutUser);
  }

  fetchWithToken(ApiUrl  + listingsUrl);
});
