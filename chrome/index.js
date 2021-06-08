function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

// Get ticket title and ticket number
function init() {
  if (
    document.querySelector(
      'h1[data-test-id="issue.views.issue-base.foundation.summary.heading"]'
    )
  ) {
    var heading = document.querySelector(
      'h1[data-test-id="issue.views.issue-base.foundation.summary.heading"]'
    );
    var ticketLink = document.querySelector(
      'div[data-test-id="issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container"] div:nth-child(2) a span'
    ).innerText;
    var ticketNr = ticketLink.substring(ticketLink.lastIndexOf("/") + 1);

    // Construct branch name
    var branchName = `${ticketNr}-${slugify(heading.innerText)}`;

    var css = ".branch-from-ticket { margin-bottom: 1rem; margin-top: 1rem; }",
      head = document.head || document.getElementsByTagName("head")[0],
      style = document.createElement("style");

    head.appendChild(style);
    style.appendChild(document.createTextNode(css));

    var node = document.createElement("div");

    var button = document.createElement("button");

    button.style.color = "rgb(66, 82, 110)";
    button.style.padding = "0.25rem .75rem";

    button.style.height = "2.28571em";
    button.style.lineHeight = "2.28571em";
    button.style.padding = "0px 8px";

    button.style.backgroundColor = "rgba(9, 30, 66, 0.04)";
    button.style.border = "none";
    button.style.display = "flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "flex-start";
    button.style.flexDirection = "row-reverse";
    button.style.borderRadius = "6px";
    button.innerText = "Copy branch name";

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "3");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.style.marginRight = ".5rem";

    var svgContents =
      '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>';
    svg.innerHTML = svgContents;

    button.appendChild(svg);
    node.appendChild(button);

    node.classList.add("branch-from-ticket");
    document.querySelector("#jira-issue-header").appendChild(node);

    button.addEventListener("click", (event) => {
      event.preventDefault();

      navigator.clipboard.writeText(branchName).then(function () {
        button.style.backgroundColor = "#56ce19";
        button.style.color = "white";
        svg.setAttribute("stroke", "#fff");

        setTimeout(() => {
          svg.setAttribute("stroke", "currentColor");
          button.style.backgroundColor = "rgba(9, 30, 66, 0.04)";
          button.style.color = "black";
        }, 1000);
      });
    });
  }
}

setTimeout(() => {
  init()
}, 300)
