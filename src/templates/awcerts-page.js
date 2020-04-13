import React from "react"
import { graphql } from "gatsby"
import { sortByDate } from "../utils/date.helpers"

import Layout from '../components/Layout'
import AwCertEntry from "../components/AwCertEntry"

export const AwCertsPageTemplate = ({ awcerts }) => {
  const { awards, certs } = awcerts

  return (
    <div className="inner">
      {awards.length > 0 &&
        <section>
          <header className="post-feed-title">
            <h2>Awards</h2>
          </header>

          {awards.map((award, index) => {
            return (
              <AwCertEntry key={index} entry={award} />
            )
          })}
        </section>
      }
      {certs.length > 0 &&
        <section>
          <header className="post-feed-title">
            <h2>Certifications</h2>
          </header>

          {certs.map((cert, index) => {
            return (
              <AwCertEntry key={index} entry={cert} />
            )
          })}
        </section>
      }
    </div>
  )
}

class AwCertsPage extends React.Component {

  getEntries(edges) {
    return edges.map(edge => {
      return {...edge.node.frontmatter}
    })
  }

  getCertifications(edges) {
    // get the entries
    let entries = this.getEntries(edges)

    return entries.filter(entry => {
      return (entry.type === 'cert')
    })
  }

  getAwards(edges) {
    // get the entries
    let entries = this.getEntries(edges)

    return entries.filter(entry => {
      return (entry.type === 'awards')
    })
  }

  render() {
    const { data } = this.props
    const { frontmatter: awCertsPage } = data.markdownRemark
    const meta = {
      pageTitle: awCertsPage.title
    }
    const lists = {
      awards: sortByDate(this.getAwards(data.allMarkdownRemark.edges), 'desc'),
      certs: sortByDate(this.getCertifications(data.allMarkdownRemark.edges), 'desc'),
    }

    return (
      <Layout siteMeta={meta} homePage={false}>
        <AwCertsPageTemplate awcerts={lists}/>
      </Layout>
    )
  }
}

export default AwCertsPage

export const pageQuery = graphql`
  query AwCertsPageQuery {
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/awcerts/i"}, frontmatter: {templateKey: {nin: "awcerts-page"}}}) {
      edges {
        node {
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            url
            type
            title
            thumbnail
            excerpt
          }
        }
      }
    }
    markdownRemark(frontmatter: {templateKey: {eq: "awcerts-page"}}) {
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