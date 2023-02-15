import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'reactstrap'
import styled from 'styled-components'

const StyledContainer = styled(Container)`
  padding-top: 48px;
  padding-bottom: 48px;
  @media (min-width: 768px) {
    padding-top: 64px;
    padding-bottom: 64px;
  }
`

function CustomContainer({ children }) {
  return <StyledContainer>{children}</StyledContainer>
}

CustomContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default CustomContainer
