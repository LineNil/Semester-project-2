/**
 * Constants containing the API URL.
 * @constant {string}
 */
const ApiUrl = 'https://api.noroff.dev/api/v1';
const listingsUrl = '/auction/listings?_bids=true';

/**
 * Asynchronously fetches data from a specified URL using a Bearer token for authorization,
 * and populates the DOM with auction listings.
 *
 * @async
 * @function
 * @param {string} url - The URL to fetch data from.
 * @throws {Error} If there is an issue with the fetch operation or rendering the listings.
 * @returns {Promise<void>} A Promise that resolves when the fetch operation is complete.
 */
async function fetchWithToken(url) {
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

    console.log('API Response:', json);

    const auctionContainer = document.getElementById('auctionContainer');

    json.forEach((auction) => {
      if (auction.title && auction.media && auction.media.length) {


//row 1 auctions
   const auctionDiv = document.createElement('div');
   auctionDiv.classList.add('row', 'pt3', 'right-col', 'mt-5');

   const listingsDiv = document.createElement('div');
   listingsDiv.classList.add('col-md-6', 'me-4', 'bg-listing', 'p-3', 'ps-5', 'pe-5', 'g-0', 'listing-card');
   auctionDiv.appendChild(listingsDiv);
      
    const auctionImg = document.createElement('img');
    auctionImg.src = auction.media[0];
    auctionImg.classList.add('listing-img', 'profile-img');
    listingsDiv.appendChild(auctionImg);

    const auctionTitle = document.createElement('h4');
    auctionTitle.textContent = `${auction.title}`;
    auctionTitle.classList.add('listing-heading', 'pt-2');
    listingsDiv.appendChild(auctionTitle);

    const auctionDescriptionTitle = document.createElement('p');
    auctionDescriptionTitle.textContent = `Item description:`;
    auctionDescriptionTitle.classList.add('listing-description', 'mt-3', 'listing-description-p');
    listingsDiv.appendChild(auctionDescriptionTitle);
    
    const auctionDescription = document.createElement('p');
    auctionDescription.textContent = `${auction.description}`;
    auctionDescription.classList.add('listing-description', 'pb-5');
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
    deadlineDiv.classList.add('col-md-12', 'flex-column', 'd-flex', 'justift-content-center');
    deadlineRow.appendChild(deadlineDiv);

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
    bidInput.placeholder = 'Bid amount - NOK';
    bidLabel.appendChild(bidInput);

    const placeBidButton = document.createElement('button');
    placeBidButton.type = 'button';
    placeBidButton.classList.add('btn', 'place-bid-btn', 'mt-4');
    placeBidButton.textContent = 'Place bid';
    bidForm.appendChild(placeBidButton);

    placeBidButton.addEventListener('click', function () {

      alert('You must log in to place a bid.');
    
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

    const deadlineCount = document.createElement('p');
    deadlineCount.textContent = `Closes: ${auction.endsAt}`;
    deadlineCount.classList.add('deadline', 'mb-0', 'mt-5');
    bidForm.appendChild(deadlineCount);

    const deadlineWarning = document.createElement('p');
    deadlineWarning.textContent = `No bids will be placed after bid end.`;
    deadlineWarning.classList.add('bid-warning', 'd-flex');
    bidForm.appendChild(deadlineWarning);

    const previousBidsDiv = document.createElement('div');
    previousBidsDiv.classList.add('previous-bids', 'pt-3', 'pb-5');
    bidsDiv.appendChild(previousBidsDiv);

    const previousBidsP = document.createElement('button');
    previousBidsP.textContent = 'Previous bids';
    previousBidsP.classList.add('btn', 'place-bid-btn', 'mt-4', 'mb-5')
    previousBidsDiv.appendChild(previousBidsP);

    previousBidsP.addEventListener('click', function () {
    alert('You must log in to view previous bids.');
});

    auctionContainer.appendChild(auctionDiv);
    auctionDiv.appendChild(bidsDiv);
    bidsDiv.appendChild(placeBidContainer);
  }
});

  } catch (error) {
    const errorMessage = 'An error occurred. Please try again later.';
    alert(errorMessage);
  }
}
  fetchWithToken(ApiUrl  + listingsUrl);

