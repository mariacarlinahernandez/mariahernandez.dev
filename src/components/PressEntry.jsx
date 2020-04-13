import React from "react"

import style from './PressEntry.module.css'
import { getTimestamp } from "../utils/date.helpers"

const PressEntry = ({ entry }) => {

  return (
    <article className="post" data-timestamp={getTimestamp(entry.date)}>
      <header className="post-header">
        <h3 className="post-title">
          {entry.url ? (
            <a href={entry.url} target="_blank" rel="noopener noreferrer">
              { entry.title }
            </a>
          ): (
            <>{ entry.title }</>
          )}
        </h3>
      </header>
      <div className="post-thumbnail">
        <img src={ entry.thumbnail } alt={ entry.title } />
      </div>
      <div className="post-content" dangerouslySetInnerHTML={{__html: entry.excerpt }} />
    </article>
  )
}

export default  PressEntry