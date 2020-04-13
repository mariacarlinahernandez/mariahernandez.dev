import React from "react"
import { formatDate, sortByDate } from "../utils/date.helpers"

const Speaking = props => {
  const { title, speaking } = props
  // sorting speaking by date descending
  const sortedSpeaking = sortByDate(speaking, "desc")

  return (
    <article className="post page">
      <header className="post-feed-title">
        <h3 className="post-title">{title}</h3>
      </header>
      <div className="post-content">
        {speaking.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Event</th>
                <th>Location</th>
                <th>Media</th>
              </tr>
            </thead>
            <tbody>
              {sortedSpeaking.map((speaking, index) => {
                return (
                  <tr key={index}>
                    <td>{formatDate(speaking.date)}</td>
                    <td>
                      <a
                        href={speaking.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {speaking.event}
                      </a>
                    </td>
                    <td>{speaking.location}</td>
                    <td style={{ textAlign: "center" }}>
                      {speaking.slideUrl ? (
                        <a
                          href={speaking.slideUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          [Slides]
                        </a>
                      ) : (
                        ""
                      )}

                      {speaking.videoUrl ? (
                        <a
                          href={speaking.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          [Video]
                        </a>
                      ) : (
                        ""
                      )}

                      {!speaking.slideUrl && !speaking.videoUrl ? "--" : ""}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <p className="info">No events found.</p>
        )}
      </div>
    </article>
  )
}

export default Speaking
