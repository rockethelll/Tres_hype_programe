const searchValue = document.getElementById('search')

const PageList = (argument = "") => {
  const preparePage = () => {

    const cleanedArgument = argument.trim().replace(/\s+/g, "-")

    const displayResults = (articles) => {
      const resultsContent = articles.slice(0, 9).map(
        (article) =>
          `
        <article class="card" data-id="${article.id}">
        <img src="${article.background_image}" alt="${article.name}" class="card__img"/>
        <h3>${article.name}</h3>
        <h4>${article.released}</h4>
        <a href="#pagedetail/${article.id}">${article.id}</a>
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

    fetchList(`https://api.rawg.io/api/games?key=${process.env.API_TOKEN
  }`, cleanedArgument)
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

searchValue.addEventListener('input', (e) => {
  PageList(e.target.value)
})



export default PageList