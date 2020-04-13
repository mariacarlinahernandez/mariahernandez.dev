import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"

import Layout from '../components/Layout'
import PressEntry from "../components/PressEntry"
import { sortByDate } from "../utils/date.helpers"
import styles from './press-page.module.css'

export const PressPageTemplate = ({ entries }) => {
  // sorting descending date the press entries
  const sortedEntries = sortByDate(entries, 'desc')

  return (
    <>
      <header className="post-feed-title inner">
        <h1>Press</h1>
      </header>
      <div className="post-feed inner-wide">

        {entries.length > 0 ? (
          <div className={styles.pressEntries}>
            {sortedEntries.map((entry, index) => {
              return (
                <PressEntry entry={entry} key={index} />
              )
            })}

          </div>
        ): (
          <p className="info">No press found.</p>
        )}
      </div>

    </>
  )
}

class PressPage extends React.Component {

  getEntries(edges) {
    return  edges.map(edge => {
      return { ...edge.node.frontmatter}
    })
  }

  render() {
    const { data } = this.props
    const { frontmatter: pressPage } = data.markdownRemark
    const presEntries = this.getEntries(data.allMarkdownRemark.edges)
    const meta = {
      pageTitle: pressPage.title
    }

    return (
      <Layout siteMeta={meta} homePage={false}>
        <PressPageTemplate entries={presEntries} />
      </Layout>
    )
  }
}

PressPage.propTypes = {
  pressEntries: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  })
};

export default PressPage

export const pageQuery = graphql`
  query PressPageQuery {
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/press/i"}, frontmatter: {templateKey: {nin: "press-page"}}}) {
      edges {
        node {
          frontmatter {
            title
            excerpt
            thumbnail
            date(formatString: "YYYY-MM-DD")
            url
          }
        }
      }
    }
    markdownRemark(frontmatter: {templateKey: {eq: "press-page"}}) {
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