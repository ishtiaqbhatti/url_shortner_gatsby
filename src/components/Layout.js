import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, darkTheme, lightTheme } from '../global-styles'

const LayoutWrapper = styled.div`
  background: ${props => (props ? props.theme.background : null)};
  color: ${props => (props ? props.theme.color : null)};
`

// const ButtonSelectTheme = styled.button`
//   position: fixed;
//   top: 0;
//   right: 0;
//   background: gray;
//   border: 0;
//   box-shadow: none;
//   border-radius: 4px;
//   padding: 10px 0;
//   font-weight: 600;
//   cursor: pointer;
//   width: 60px;
//   &:focus {
//     outline: none;
//   }
// `

export default class Layout extends React.Component {
  state = {
    isDarkTheme: true,
  }

  componentDidMount() {
    if ('isDarkTheme' in localStorage) {
      this.setState({
        isDarkTheme: localStorage.isDarkTheme === 'false' ? false : true,
      })
    }
  }

  handleChangeTheme = () => {
    const newTheme = !this.state.isDarkTheme
    this.setState({ isDarkTheme: newTheme })
    localStorage.setItem('isDarkTheme', newTheme)
  }

  render() {
    return (
      <React.Fragment>
        <Helmet defaultTitle="URL Shortener by dantehemerson">
          <link
            href="https://fonts.googleapis.com/css?family=Play"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
            integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
            crossorigin="anonymous"
          />
        </Helmet>
        {/* <ButtonSelectTheme onClick={this.handleChangeTheme}>
          {this.state.isDarkTheme ? 'LIGHT' : 'DARK'}
          {this.state.isDarkTheme ? (
            <i className={`fas fa-toggle-on`} />
          ) : (
            <i className={`fas fa-toggle-off`} />
          )}
        </ButtonSelectTheme> */}
        <ThemeProvider theme={true || this.state.isDarkTheme ? darkTheme : lightTheme}>
          <React.Fragment>
            <GlobalStyles />
            <LayoutWrapper>{this.props.children}</LayoutWrapper>
          </React.Fragment>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}
