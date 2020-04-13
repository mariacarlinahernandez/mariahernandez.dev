import React from 'react'

import { getTimestamp } from "../utils/date.helpers"
import style from './AwCertEntry.module.css'

const AwCertEntry = ({ entry }) => {
  return (
    <article className={style.entry} data-timestamp={getTimestamp(entry.date)}>
      <div className={style.entryAvatar}>
        <img src={entry.thumbnail} alt={entry.title} />
      </div>
      <div className={style.entryContent}>
        <h3 className={style.entryHeader}>
          {entry.url ? (
            <a href={entry.url} target="_blank" rel="noopener noreferrer">{ entry.title }</a>
          ) : (
            <span>{entry.title}</span>
          )}
          </h3>
        <div dangerouslySetInnerHTML={{__html: entry.excerpt }} />
      </div>
    </article>
  )
}

export default AwCertEntry