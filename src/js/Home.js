const Home = (argument = "") => {

  const render = () => {
    pageContent.innerHTML = `
    <div id="welcome__wrapper">
      <h2 id="welcome__title">Welcome,</h2>
      <p id="welcome__content">The Hyper Progame is the world's premier event for computer and video games and related products. At the Hyper Progamen the video game industry's top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best, brightest, and most innovatiive in the interactive entertainment industry. For three excitingdays, leading-edge companies, groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure.</p>
    </div>
    `
  }
  render()
}



export default Home