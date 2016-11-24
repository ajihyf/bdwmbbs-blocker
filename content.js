const OP_NONE = 0;
const OP_HIDE = 1;

function retrievePostsFromDOM() {
  const postsDOM = document.querySelectorAll('.post-card');
  return [...postsDOM].map(postDOM => { // 必须使用...语法，因为posts是NodeList
    const usernameContainer = postDOM.querySelector('.username > a');
    const username = usernameContainer.textContent;
    const quoteHead = postDOM.querySelector('.quotehead');
    const quoteUsername = quoteHead ? quoteHead.dataset.username : null;
    return { username, quoteUsername };
  });
}

function hideSpecifiedPosts(operations) {
  const postsDOM = document.querySelectorAll('.post-card');
  operations.forEach((op, index) => {
    if (op === OP_HIDE) {
      postsDOM.item(index).style.display = 'none';
    }
  });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.type) {
      case 'GET_POSTS': {
        const posts = retrievePostsFromDOM();
        sendResponse(posts);
        break;
      }
      case 'FILTER_POSTS':
        hideSpecifiedPosts(request.operations);
        break;
      default:
    }
  }
);
//
// document.addEventListener('DOMContentLoaded', hideSpecifiedPosts, false);
// window.addEventListener('transitionend', hideSpecifiedPosts, false);
