import "./style/index.scss"
import "./js/PageDetail.js"
import "./js/PageList.js"
import "./js/Home.js"
import routes from "./js/routes.js"

const callRoute = () => {
  const { hash } = window.location
  const pathParts = hash.substring(1).split("/")

  const pageName = pathParts[0]
  const pageArgument = pathParts[1] || ""
  const pageFunction = routes[pageName]

  if (pageFunction !== undefined) {
    pageFunction(pageArgument)
  }
}

window.addEventListener("hashchange", () => callRoute())
window.addEventListener("DOMContentLoaded", () => callRoute())
