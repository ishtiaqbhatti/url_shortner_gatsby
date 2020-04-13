import axios from 'axios'
import { graphql } from 'gatsby'
import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import ErrorMessage from '../components/ErrorMessage'
import Input from '../components/Input'
import Layout from '../components/Layout'
import Shortened from '../components/Shortened'
import { isValidUrl, generateFullURLCode } from '../utils'
import { config } from '../config'

export const IndexPage = ({ location }) => {
  const [ loading, setLoading ] = useState(false)
  const [ originalUrl, setOriginalUrl ] = useState('')
  const [ error, setError ] = useState('')
  const [ generatedUrl, setGeneratedUrl ] = useState('')

  const handleGenerate = () => {
    if(loading) return
    if(!isValidUrl(originalUrl)) {
      setError('Url is not valid')
      return
    }
    setLoading(true)
    axios({
      url: `${config.LAMBDA_ENDPOINT}/create`,
      method: 'post',
      data: {
        originalUrl
      },
    })
      .then(({ data }) => {
        const url = generateFullURLCode(location, data.urlCode)
        setGeneratedUrl(url)
      })
      .catch(err => {
        setError('Unexpected error')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const onChangeUrl = (event) => {
    setError('')
    setGeneratedUrl('')
    setOriginalUrl(event.target.value)
  }

  return (
    <Layout>
      <Container>
        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
          <h1 style={{ margin: 0 , fontSize: '50px'}}><span aria-label='Logo' role='img'>🌐</span> URL Shortener</h1>
          <Input placeholder='Your URL here' value={originalUrl} onKeyDown={e => {
            if(e.key === 'Enter') {
              handleGenerate()
            }
          }} onChange={onChangeUrl}/>
          <Button disabled={loading} onClick={handleGenerate}>Generar</Button>
          <ErrorMessage error={error}/>
          <Shortened url={generatedUrl}/>
        </div>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #ffffff;
  height: 100vh;
  background-color: #330000;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Cdefs%3E%3CradialGradient id='a' cx='396' cy='281' r='514' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23D18'/%3E%3Cstop offset='1' stop-color='%23330000'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='400' y1='148' x2='400' y2='333'%3E%3Cstop offset='0' stop-color='%23FA3' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23FA3' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='400'/%3E%3Cg fill-opacity='0.25'%3E%3Ccircle fill='url(%23b)' cx='267.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='532.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='400' cy='30' r='300'/%3E%3C/g%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover;
  box-sizing: border-box;
  padding: 10px;
  padding-top: 20vh;
`

export const indexAbout = graphql`
  query IndexAbout {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default IndexPage
