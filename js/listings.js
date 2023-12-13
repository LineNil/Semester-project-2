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
    auctionDiv.classList.add('row', 'pt3', 'right-col', 'mt-5', 'pt-4');




    const listingsDiv = document.createElement('div');
    listingsDiv.classList.add('col-md-6', 'bg-listing', 'p-3', 'ps-5', 'pe-5', 'g-0');
    auctionDiv.appendChild(listingsDiv);


    if (auction.media && auction.media.length > 0) {
  
      const mainAuctionImg = document.createElement('img');
      mainAuctionImg.src = auction.media[0];
      mainAuctionImg.classList.add('listing-img', 'profile-img');
      listingsDiv.appendChild(mainAuctionImg);


      const imgButton = document.createElement('button');
      imgButton .type = 'button';
      imgButton.classList.add('btn', 'view-img-btn', 'img-Button')
      imgButton.textContent = 'View more images';
      listingsDiv.appendChild(imgButton);

    
      const modal = document.createElement('div');
      modal.classList.add('modal');
      document.body.appendChild(modal);

  
      const openModal = () => {
      modal.innerHTML = '';
    
      
if (auction.media.length > 1) {
  auction.media.slice(1).forEach((mediaUrl) => {
    const img = document.createElement('img');
    img.src = mediaUrl;
    img.classList.add('modal-image');
    modal.appendChild(img);
  });
}else{
  alert('No more images available.');
}

modal.style.display = 'flex';
  };

imgButton.addEventListener('click', openModal);


window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

}

const auctionTitle = document.createElement('h4');
auctionTitle.textContent = `${auction.title}`;
auctionTitle.classList.add('listing-heading', 'pt-2', 'mb-4');
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

  let isCommentBidContainerVisible = false;

  const commentBidContainer = document.createElement('div');
  commentBidContainer.classList.add('comment-bid-container', 'd-flex', 'flex-column', 'ms-4');
  previousBidsDiv.appendChild(commentBidContainer);

  previousBidsP.addEventListener('click', function() {
    isCommentBidContainerVisible = !isCommentBidContainerVisible;

    commentBidContainer.innerHTML = '';

    if (isCommentBidContainerVisible) {
      if (auction._count && auction._count.bids > 0 && auction.bids && auction.bids.length > 0) {
        auction.bids.forEach((bid) => {
          const bidderBid = document.createElement('div');
          bidderBid.textContent = `${bid.bidderName}: ${bid.amount}`;
          bidderBid.classList.add('active-bid', 'mb-2');
          commentBidContainer.appendChild(bidderBid);
        });
      } else {
        const noBidsMessage = document.createElement('div');
        noBidsMessage.textContent = 'No previous bids';
        commentBidContainer.appendChild(noBidsMessage);
        }

        commentBidContainer.style.display = 'block';

    }else{
      commentBidContainer.style.display = 'none';
    }
  });

  commentBidContainer.style.display = 'none';

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


