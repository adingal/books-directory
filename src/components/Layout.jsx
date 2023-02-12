import React from 'react'
import PropTypes from 'prop-types'
import CustomContainer from './CustomContainer'

function Layout({ children }) {
  return <CustomContainer>{children}</CustomContainer>
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
