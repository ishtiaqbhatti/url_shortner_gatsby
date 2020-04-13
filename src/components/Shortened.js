import React, { useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import styled from 'styled-components'

const Container = styled.div`
  height: 200px;
  min-width: 100px;
`

const Url = styled.a`
  color: #b72b2b;
  padding: 8px 10px;
`

const Copy = styled.button`
  border: none;
  background: white;
  &:hover {
    background: #efefef;
  }
  border-left: 1px solid #f5f5f5;
  cursor: pointer;
  outline: none;
  padding: 10px;
  position: relative;
`

const Result = styled.div`
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #fefefe;
  box-shadow: 0 0 4px #00000059;
`

const CopiedTooltip = styled.p`
    position: absolute;
    background: #252424;
    color: white;
    top: 40px;
    margin: 0;
    left: -15px;
    padding: 5px 9px;
    border-radius: 4px;
    box-shadow: 0 0 4px #00000047;
`

const Shortened = ({ url })  => {
  const [copied, setCopied] = useState(false)
  const myTimeout = useRef(null)

  const onCopy = () => {
    setCopied(true)
    if(myTimeout.current) {
      clearTimeout(myTimeout.current)
    }
    myTimeout.current = setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <Container>
      {url &&
        <Result>
          <Url target="_blank" href={url}>{url}</Url>
          <CopyToClipboard text={url} onCopy={onCopy}>
            <Copy title='Copy to clipboard'>
              <img width='20px' alt='Copy to clipboard' src='https://icongr.am/clarity/copy.svg'/>
              { copied && <CopiedTooltip>Copiado</CopiedTooltip> }
            </Copy>
          </CopyToClipboard>
        </Result>
      }
    </Container>
  )
}

export default Shortened
