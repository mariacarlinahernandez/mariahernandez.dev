import React from 'react'
import PropTypes from "prop-types"
import { AboutPageTemplate } from "../../templates/about-page"

const AboutPagePreview = ({ entry }) => {

  return <AboutPageTemplate
      page={entry.getIn(['data']).toJS()}
      content={entry.getIn(["data", "body"])}
    />
};

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
};

export default AboutPagePreview;