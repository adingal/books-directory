import React, { useContext } from 'react'
import { Spinner } from 'reactstrap'
import styled from 'styled-components'

// Context
import UserContext from '../context/UserContext'

const SpinnerContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
`

function Loader() {
  const { isLoading } = useContext(UserContext)
  const spinnerStyle = {
    height: '80px',
    width: '80px',
  }

  if (!isLoading) return null

  return (
    <SpinnerContainer>
      <Spinner color="dark" style={spinnerStyle}>
        Loading...
      </Spinner>
    </SpinnerContainer>
  )
}

export default Loader
