import React from "react"
import { formatDate, sortByDate } from "../utils/date.helpers"

const Projects = (props) => {
  const { projects } = props
  // sorting projects by date, descending
  const sortedProjects = sortByDate(projects, 'desc')

  return (
    <article className="post page">
      <div className="post-content">
        {projects.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Start Date</th>
                <th>Project Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
            {sortedProjects.map((project, index) => {
              return (
                <tr key={index}>
                  <td>{ formatDate(project.date) }</td>
                  <td>{ project.name }</td>
                  <td>{ project.description }</td>
                </tr>
              )
            })}
            </tbody>
          </table>
        ) : (
          <p className="info">No projects found.</p>
        )}
      </div>
    </article>
  )
}

export default Projects