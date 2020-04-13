import React from "react"
import { Link } from "gatsby"

const BlogEntry = ({ entry }) => {
  return (
    <article className="post">
      <header className="post-header">
        <div className="post-meta">
          <time className="published" dateTime={entry.date}>{entry.date}</time>
        </div>
        <h2 className="post-title">
          <Link to={entry.slug}>
            { entry.title }
          </Link>
        </h2>
      </header>
      <div className="post-thumbnail">
        <img src={entry.image} alt={entry.title} />
      </div>
      <div className="post-content" dangerouslySetInnerHTML={{__html: entry.description }} />
    </article>
  )
}

export default  BlogEntry