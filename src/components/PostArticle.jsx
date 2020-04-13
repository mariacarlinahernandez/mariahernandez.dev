import React from "react"
import PropTypes from 'prop-types';

import { getTimestamp, formatDate } from "../utils/date.helpers"

class PostArticle extends React.Component {

  render() {
    const { article } = this.props

    return (
      <article className="post">
        <header className="post-header">
          <div className="post-meta">
            <time className="published" dateTime={getTimestamp(article.published_at)}>{formatDate(article.published_at)}</time>
          </div>
          <h2 className="post-title">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              { article.title}
            </a>
          </h2>
        </header>
        <div className="post-thumbnail">
          <img src={article.cover_image ? article.cover_image : '#'} alt={article.slug} />
        </div>
        <div className="post-content" dangerouslySetInnerHTML={{__html: article.description }} />
      </article>
    )
  }
}

PostArticle.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    published_at: PropTypes.string.isRequired,
    cover_image: PropTypes.string,
    description: PropTypes.string.isRequired,
    slug: PropTypes.string
  }).isRequired
}

export default PostArticle