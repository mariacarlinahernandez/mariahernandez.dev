import React from 'react'
import PropTypes from 'prop-types'

import { HomePageTemplate } from '../../templates/home-page'

const HomePagePreview = ({ entry }) => {
  const home = entry.getIn(["data"]).toJS()
  return <HomePageTemplate home={home} preview={true}/>
}

HomePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
};

export default HomePagePreview