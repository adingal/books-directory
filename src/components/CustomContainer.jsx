import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'reactstrap'

function CustomContainer({ children }) {
  return <Container className="py-3 py-md-4 py-lg-5">{children}</Container>
}

CustomContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default CustomContainer
