import React from "react"

import { getDevArticles } from "../utils/devto.helper"
import PostArticle from "./PostArticle"
import style from "./DevtoArticlesPaginated.module.css"

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
  let i = from
  const range = []

  while (i <= to) {
    range.push(i)
    i += step
  }

  return range
}

class DevtoArticlesPaginated extends React.Component {
  constructor(props) {
    super(props)

    const { pageLimit = 5, maxPages = 6 } = props

    this.state = {
      currentPage: 1,
      devtoArticles: [],
      totalRecords: 0,
      totalPages: 0,
      pageLimit,
      maxPages,
    }
  }

  componentWillMount() {
    // getting the articles from Dev.to
    getDevArticles().then(articles => {
      this.setState({
        devtoArticles: articles,
        totalRecords: articles.length,
        totalPages: Math.ceil(articles.length / this.state.pageLimit),
      })
    })
  }

  fetchPageNumbers = () => {
    const { totalPages, maxPages } = this.state

    if (totalPages <= 0) return []

    const lastPage = Math.max(1, Math.min(maxPages, totalPages))
    return range(1, lastPage)
  }

  changePage = page => {
    this.setState({ currentPage: page })
  }

  render() {
    const { currentPage, totalRecords, pageLimit } = this.state

    if (!totalRecords)
      return (
        <div className="post-feed inner-wide">
          <p className="info">No posts from Dev.to - Work in Progress!.</p>
        </div>
      )
    // get the array of page numbers for the pagination
    const pages = this.fetchPageNumbers()
    // getting the articles that should be displayed for the current page
    let offset = (currentPage - 1) * pageLimit
    const articlesToRender = this.state.devtoArticles.slice(
      offset,
      offset + pageLimit
    )

    return (
      <div className="post-feed inner-wide">
        {articlesToRender.map((article, index) => {
          return <PostArticle article={article} key={index} />
        })}

        <div className={style.pagination}>
          {pages.map((page, index) => {
            const classes = currentPage === index + 1 ? style.active : ""
            return (
              <span
                key={index}
                className={classes}
                onClick={() => this.changePage(page)}
              >
                {page}
              </span>
            )
          })}
        </div>
      </div>
    )
  }
}

export default DevtoArticlesPaginated
