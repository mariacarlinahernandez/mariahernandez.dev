import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"

class NotFoundPage extends React.Component {
  render() {
    const meta = {
      pageTitle: "404: Not Found"
    }

    return (
      <Layout siteMeta={meta} homePage={false}>
        <section className="site-main outer">
          <div className="inner">
            <h1>Not Found</h1>
            <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
          </div>
        </section>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
