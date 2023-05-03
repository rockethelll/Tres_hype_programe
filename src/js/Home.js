const Home = (argument = "") => {
  let articlesToDisplay = 9
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-")
    const displayResults = (articles) => {
      const resultsContent = articles.slice(0, articlesToDisplay).map(
        (article) =>
          `
        <article class="card" data-id="${article.id}">
        <div class="card__container">
          <img src="${article.background_image}" alt="${article.name}" class="card__img"/>
          <div class="text__container">
            <p class="text">${article.released}</p>
            <p class="text">${article.rating}/${article.rating_top} - ${article.ratings_count} votes</p>
          </div>

        </div>
        <a href="#pagedetail/${article.slug}">
          <h3>${article.name}</h3>
          </a>
        </article>`
      )
      const resultsContainer = document.querySelector(".page-list .articles")
      resultsContainer.innerHTML = resultsContent.join("\n")
    }

    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : url
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results)
        })
    }

    fetchList(
      `https://api.rawg.io/api/games?key=${process.env.API_TOKEN}`,
      cleanedArgument
    )
  }
  const render = () => {
    pageContent.innerHTML = `
    <div id="welcome__wrapper">
      <h2 id="welcome__title">Welcome,</h2>
      <p id="welcome__content">The Hyper Progame is the world's premier event for computer and video games and related products. At the Hyper Progamen the video game industry's top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best, brightest, and most innovatiive in the interactive entertainment industry. For three excitingdays, leading-edge companies, groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure.</p>
    </div>
    <br/>
    <section class="page-list">
      <div class="articles">Loading...</div>
    </section>
    <div class="btn-show-more">
      <a class="show-more">Show more</a>
    </div>
    `
    const showMoreBtn = document.querySelector(".show-more")
    showMoreBtn.addEventListener("click", () => {
      if (articlesToDisplay === 18) {
        showMoreBtn.style.display = "none"
      }
      if (articlesToDisplay <= 18) {
        articlesToDisplay += 9
        preparePage()
      }
    })

    preparePage()
  }
  render()
}

export default Home
