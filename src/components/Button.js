import styled from 'styled-components'

const Button = styled.button`
  background: #f9b51b;
  &:hover {
    background: #dea115;
  }
  &:disabled {
    opacity: 0.7;
  }
  transition: .4s;
  color: white;
  border: none;
  border-radius: 2rem;
  font-size: 14px;
  padding: 10px 10px;
  width: 220px;
  cursor: pointer;
  margin-bottom: 10px;
  outline: none;
  margin-top: 20px;
  font-weight: 600;
`

export default Button
