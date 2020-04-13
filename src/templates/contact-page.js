import React from "react"

import Layout from '../components/Layout'
import { graphql } from "gatsby"

class ContactPage extends React.Component {
  render() {
    const { data } = this.props
    const { frontmatter: contactPage } = data.markdownRemark
    const meta = {
      pageTitle: contactPage.title
    }

    return (
      <Layout siteMeta={meta}>
        <div className="inner">
          <header className="post-header">
            <h1>Contact</h1>
            <div className="post-content" dangerouslySetInnerHTML={{__html: contactPage.excerpt }} />
          </header>

          <div className="post-content">
            <form name="contact-form" action="/form-success/" method="POST" netlify-honeypot="bot-field" data-netlify="true">
              <label>
                Name
                <input type="text" name="name" id="name" />
              </label>
              <label>
                Email
                <input type="email" name="email" id="email" />
              </label>
              <label>
                Subject
                <input type="text" name="subject" id="subject" />
              </label>
              <label>
                Message
                <textarea name="message" id="message" rows="5" />
              </label>
              <input type="hidden" name="form-name" value="contact-form" />
              <input type="hidden" name="bot-field" />
              <div style={{marginTop: "1em"}}>
                <button type="submit">Send</button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    )
  }
}

export default  ContactPage

export const pageQuery = graphql`
  query ContactPageQuery {
    markdownRemark(frontmatter: {templateKey: {eq: "contact-page"}}) {
      frontmatter {
        title
        templateKey
        path
        excerpt
      }
    }
  }
`;