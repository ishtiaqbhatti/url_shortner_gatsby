import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 40px;

  p {
    margin: 0;
    background: #ff4d3b;
    box-shadow: 0 0 4px #00000000;
    border-radius: 3px;
    padding: 2px 24px;
    box-sizing: border-box;
    display: block;
    position: relative;
  }
  min-width: 100px;
  margin-bottom: 10px;
  justify-content: center;
`

const ErrorMessage = ({ error }) => {
  return (
    <Container>
      { error && <p>{error}</p>}
    </Container>
  )
}

export default ErrorMessage
