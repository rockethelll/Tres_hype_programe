const PageList = (argument = "") => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-")

    const displayResults = (articles) => {
      const resultsContent = articles.slice(0, 9).map(
        (article) =>
          `
        <article class="card" data-id="${article.id}">
        <div class="card__container">
          <img src="${article.background_image}" alt="${article.name}" class="card__img"/>
          <p class="text">Teste affichage P</p>
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
          console.log(responseData)
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
      <section class="page-list">
        <div class="articles">Loading...</div>
      </section>
    `

    preparePage()
  }

  render()
}

export default PageList
