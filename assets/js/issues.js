// variables
const $searchTerm = document.querySelector("#searchTerm");
const $resultsDiv = document.querySelector("#resultsDiv");
const $moreIssues = document.querySelector("#moreIssues");
const searchTerm = document.location.search.split("=")[1];

// functions
function getAPI() {
  fetch(`https://api.github.com/repos/${searchTerm}/issues`)
  .then(function(serverResponse) {
    if (serverResponse.status !== 200) {
      alert("error!")
    } else {
      renderMore(serverResponse);
      return serverResponse.json();
    }
  })
  .then(function(data) {
    renderDivs(data);
  })
}

function renderDivs(data) {
  // build each div representing an issue
  if (!data.length) {
    $resultsDiv.textContent = `No issues associated with ${searchTerm}`;
    return;
  }

  data.forEach(function(dataObj) {
    const $a = document.createElement("a");
    // tell it what it looks like
    $a.setAttribute("href", dataObj.html_url);
    $a.setAttribute("target", "_blank");
    $a.classList = "list-group-item list-group-item-action d-flex justify-content-between";
    
    const $titleSpan = document.createElement("span");
    $titleSpan.textContent = dataObj.title;

    const $typeSpan = document.createElement("span");
    if (dataObj.pull_request) {
      $typeSpan.textContent = `(Pull Request)`;
    } else {
      $typeSpan.textContent = `(Issue)`;
    }

    $a.appendChild($titleSpan);
    $a.appendChild($typeSpan);
    $resultsDiv.append($a);
  })
}

function renderMore(serverResponse) {
  if (serverResponse.headers.get("link")) {
    const $a = document.createElement("a");
    $a.setAttribute("href", `https://github.com/${searchTerm}/issues?page=2`)
    $a.setAttribute("target", "_blank");

    $a.textContent = `To see more more issues, click here!`

    $moreIssues.appendChild($a);
  }
}

// processes
$searchTerm.textContent = searchTerm;

getAPI();