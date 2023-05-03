const PageDetail = (argument) => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-")

    const displayGame = (gameData) => {
      const { background_image_additional, rating, rating_top, ratings_count, name, released, description, developers, platforms, publishers, genres, tags, website } = gameData
      const articleDOM = document.querySelector(".page-detail .article")

      articleDOM.querySelector("img").src = background_image_additional
      articleDOM.querySelector(".link").setAttribute('href', website)
      articleDOM.querySelector("p.note").innerHTML = `${rating} / ${rating_top} - ${ratings_count} votes`
      articleDOM.querySelector("h1.title").innerHTML = name
      articleDOM.querySelector("p.description").innerHTML = description
      articleDOM.querySelector("p.release__date span").innerHTML = released
      articleDOM.querySelector("p.developer__name").innerHTML = developers.map((dev) => dev.name).join(', ')
      articleDOM.querySelector("p.platforms__name").innerHTML = platforms.map((platform) => platform.platform.name).join(' ,')
      articleDOM.querySelector("p.publisher__name").innerHTML = publishers.map((publisher) => publisher.name).join(' ,')
      articleDOM.querySelector("p.genre__name").innerHTML = genres.map((genre) => genre.name).join(' ,')
      articleDOM.querySelector("p.tags__name").innerHTML = tags.map((tag) => tag.name).join(', ')
    }

    const fetchGame = (url, argument) => {
      fetch(`${url}/${argument}?key=${process.env.API_TOKEN}`)
        .then((response) => response.json())
        .then((responseData) => {
          displayGame(responseData)
        })
        .catch((error) => error.message)
    }

    const displayScreenshots = (gameData) => {
      const { results } = gameData
      const articleDOM = document.querySelector(".page-detail .article")

      articleDOM.querySelector(".screen__img1").src = results[0].image
      articleDOM.querySelector(".screen__img2").src = results[1].image
      articleDOM.querySelector(".screen__img3").src = results[2].image
      articleDOM.querySelector(".screen__img4").src = results[3].image

    }

    const fetchGameScreenshots = (url, argument) => {
      fetch(`${url}/${argument}/screenshots?key=${process.env.API_TOKEN}`)
        .then((response) => response.json())
        .then((responseData) => {
          displayScreenshots(responseData)
        })
        .catch((error) => error.message)
    }

    fetchGame("https://api.rawg.io/api/games", cleanedArgument)
    fetchGameScreenshots("https://api.rawg.io/api/games", cleanedArgument)
  }

  const render = () => {
    pageContent.innerHTML = `
    <section class="page-detail">
    <div class="article">
      <div class="hero-screenshot">
        <img src="" alt="" />
        <a class="link">Check Website<span>&#9654;</span></a>
      </div>
      <div class="head">
        <h1 class="title"></h1>
        <p class="note"></p>
      </div>
      <p class="description"></p>
      <div class="game-info">
        <div class="release">
          <p class="card-title">Release date</p>
          <p class="release__date"><span></span></p>
        </div>
  
        <div class="developer">
          <p class="card-title">Developer</p>
          <p class="developer__name"></p>
        </div>
  
        <div class="platforms">
          <p class="card-title">Platforms</p>
          <p class="platforms__name"></p>
        </div>
  
        <div class="publisher">
          <p class="card-title">Publisher</p>
          <p class="publisher__name"></p>
        </div>
        <div class="genre">
          <p class="card-title">Genre</p>
          <p class="genre__name"></p>
        </div>
        <div class="tags">
          <p class="card-title">Tags</p>
          <p class="tags__name"></p>
        </div>
      </div>

      <div class="game-buy-trailer">
        <div class="buy">
          <h2 class="buy__title">BUY</h2>
          <a class="buy__stores">PlayStation Store</a>
        </div>

        <div class="trailer">
          <h2 class="trailer__title">TRAILER</h2>
          <p>Non disponible en version gratuite de l'API.</p>
        </div>

        <div class="screen">
          <h2 class="screen__title">SCREENSHOTS</h2>
          <div class="container_img">
            <img src ="" class="screen__img1"/>
            <img src ="" class="screen__img2"/>
            <img src ="" class="screen__img3"/>
            <img src ="" class="screen__img4"/>
          </div>
        </div>
      </div>

    </div>
  </section>
    `

    preparePage()
  }

  render()
}

export default PageDetail
