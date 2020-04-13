import React from "react"

import Layout from "../components/Layout"

class FormSuccessPage extends React.Component {

  render() {
    const meta = {
      pageTitle: "Success!!"
    }

    return (
      <Layout siteMeta={meta}>
        <section className="site-main outer">
          <div className="inner">
            <h1>Success!!</h1>
            <p>The form has been submitted. We'll be in touch soon!</p>
          </div>
        </section>
      </Layout>
    )
  }
}

export default FormSuccessPage