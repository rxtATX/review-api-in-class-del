// global variables
// selectors
const $searchForm = document.querySelector("#userNameSearchForm");
const $searchInput = document.querySelector("#userNameInput");
const $buttonGroup = document.querySelector("#buttonsList");
const $searchSpan = document.querySelector("#searchField");
const $resultsDiv = document.querySelector("#resultsDiv");

// functions

function clickEventHandler(event) {
  let searchInput = event.target.getAttribute("data-language");

  const requestUrl = `https://api.github.com/search/repositories?q=` + searchInput;

  getAPI(requestUrl);
  
  $searchSpan.textContent = searchInput;
}

function submitEventHandler(event) {
  event.preventDefault();
  
  let searchInput = $searchInput.value;
  
  const requestUrl = `https://api.github.com/users/${searchInput}/repos`;
  
  getAPI(requestUrl);

  $searchSpan.textContent = searchInput;
}

function getAPI(request) {
  fetch(request)
  .then(function(serverResponse) {
    return serverResponse.json();
  })
  .then(function(data) {
    // if my user searched by username, the array will be immediate
    // if they searched by button click, we need to access the items property to get the array
    
    if (data.items) {
      renderDivs(data.items);
    } else {
      renderDivs(data);
    }
  });
}

function renderDivs(data) { // once data exists, we need to show it to the user
  // FOR LOOP, dummy
  $resultsDiv.innerHTML = "";

  data.forEach(function(currentDataObj) {
    const creator = currentDataObj.owner.login;
    const repoName = currentDataObj.name;
    const issues = currentDataObj.open_issues_count;
  
//   <a href="#" class="list-group-item list-group-item-action">
//     The current link item
//   </a>
    // create element
    const $a = document.createElement("a");
    // tell it what it looks like
    $a.setAttribute("href", "#");
    $a.classList = "list-group-item list-group-item-action d-flex justify-content-between";

    const $nameSpan = document.createElement("span");
    const $issueSpan = document.createElement("span");
    $nameSpan.textContent = `${creator}/${repoName}`
    // when the open issues is 0 then show green checkmark here otherwise, show red x with this number
    if (issues === 0) {
      $issueSpan.textContent = `✔️`;
    } else {
      $issueSpan.textContent = `❌ ${issues}`;
    }

    $a.append($nameSpan);
    $a.append($issueSpan);
    // where it lives on the dom
    $resultsDiv.append($a);
  });
}

//processes
$searchForm.addEventListener("submit", submitEventHandler);
$buttonGroup.addEventListener("click", clickEventHandler);