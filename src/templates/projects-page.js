import React from "react"

import Layout from '../components/Layout'
import Projects from "../components/Projects"
import { graphql } from "gatsby"

export const ProjectsPageTemplate = ({ page, projects }) => {
  return (
    <div className="inner">
      <header className="post-feed-title">
        <h1>Projects</h1>
        <div className="post-content" dangerouslySetInnerHTML={{__html: page.excerpt }} />
      </header>

      <div className="post-content">
        <Projects projects={projects} />
      </div>
    </div>
  )
}

class ProjectsPage extends React.Component {
  getEntries(edges) {
    return edges.map(edge => {
      return { ...edge.node.frontmatter}
    })
  }

  render() {
    const { data } = this.props
    const { frontmatter: projectsPage } = data.markdownRemark
    const meta = {
      pageTitle: projectsPage.title
    }
    const projects = this.getEntries(data.allMarkdownRemark.edges)

    return (
      <Layout siteMeta={meta} homePage={false}>
        <ProjectsPageTemplate page={projectsPage} projects={projects} />
      </Layout>
    )
  }
}

export default  ProjectsPage

export const pageQuery = graphql`
  query ProjectsPageQuery {
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/projects/i"}, frontmatter: {templateKey: {nin: "projects-page"}}}) {
      edges {
        node {
          frontmatter {
            title
            name
            date(formatString: "YYYY-MM-DD")
            description
          }
        }
      }
    }
    markdownRemark(frontmatter: {templateKey: {eq: "projects-page"}}) {
      frontmatter {
        title
        templateKey
        path
        image
      }
      html
    }
  }  
`;