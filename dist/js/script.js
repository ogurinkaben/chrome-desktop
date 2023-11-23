const pageSize = 18;
let currentPage = 1;
const articleTags = [
  { name: "All", value: "all" },
  { name: "JavaScript", value: "javascript" },
  { name: "Web Development", value: "webdev" },
  { name: "Beginners", value: "beginners" },
  { name: "Tutorial", value: "tutorial" },
  { name: "React", value: "react" },
  { name: "Vue", value: "vue" },
];
let selectedArticleTag = articleTags[0].value;
const tagSelect = createTagSelect();
function shortenString(str, maxLength = 70) {
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.substring(0, maxLength - 3) + "...";
  }
}
tagSelect.addEventListener("change", async function () {
  currentPage = 1;
  selectedArticleTag = tagSelect.value;
  displayArticles(currentPage, selectedArticleTag);
});
function createTagSelect() {
  const articleSelectList = document.getElementById("articleTags");
  const selectElement = document.createElement("select");
  selectElement.classList.add("ex-select-input");
  selectElement.id = "tagSelect";
  articleTags.forEach((tag) => {
    const option = document.createElement("option");
    option.value = tag.value;
    option.text = tag.name;
    selectElement.appendChild(option);
  });

  articleSelectList.appendChild(selectElement);

  return selectElement;
}

function showLoader() {
  const loader = document.getElementById("loader");
  const pagination = document.querySelector(".ex-pagination");
  loader.style.display = "flex";
  if (pagination) {
    pagination.style.display = "none";
  }
}

function hideLoader() {
  const loader = document.getElementById("loader");
  const pagination = document.querySelector(".ex-pagination");
  loader.style.display = "none";
  if (pagination) {
    pagination.style.display = "flex";
  }
}

async function displayArticles(page, tag) {
  try {
    const articles = await fetchDevToArticles(page, tag);
    console.log(articles);
    const contentWrapper = document.getElementById("contentWrapper");
    contentWrapper.innerHTML = "";

    articles.forEach((article) => {
      const articleElement = document.createElement("div");
      const tagList = article.tag_list.map(
        (tag) => `<span class='article-tag'>#${tag}</span>`
      );
      articleElement.classList.add("col-lg-4");
      articleElement.innerHTML = `
        <div class='article-card'>
          <a href="${
            article.url
          }" target="_blank" class='article-card__link'></a>
          <img src='${article.social_image}' alt='${
        article.title
      }' class='article-image'/>
          <div class='article-content'>
  <div class='article-content__tag-list'>${tagList.join(" ")}</div>
            <h2 class='article-content__title'>${shortenString(
              article.title,
              50
            )}</h2>
            <p class='article-content__description'>${shortenString(
              article.description
            )}</p>
          
          </div>
        </div>`;
      contentWrapper.appendChild(articleElement);
    });
    const paginationDiv = document.createElement("div");
    paginationDiv.classList.add("ex-pagination");
    const prevButton = document.createElement("button");
    prevButton.innerHTML = ` <i class="bi bi-arrow-left"></i> Previous`;
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        displayArticles(currentPage, selectedArticleTag);
      }
    });
    const nextButton = document.createElement("button");
    nextButton.innerHTML = `Next <i class="bi bi-arrow-right"></i>`;
    nextButton.addEventListener("click", () => {
      currentPage++;
      displayArticles(currentPage, selectedArticleTag);
    });
    paginationDiv.appendChild(prevButton);
    paginationDiv.appendChild(nextButton);
    contentWrapper.appendChild(paginationDiv);
  } catch (error) {
    console.error("Error:", error);
  }
}
async function fetchDevToArticles(page, tag) {
  showLoader();
  try {
    const response = await fetch(
      `https://dev.to/api/articles?page=${page}&per_page=${pageSize}&tag=${
        tag != "all" ? tag : ""
      }&top=30`
    );
    const data = await response.json();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  } finally {
    hideLoader();
  }
}

displayArticles(currentPage, selectedArticleTag);
