import React from 'react'
import { Container, Segment } from 'semantic-ui-react'
import Header from './Header'

const Layout = (props) => {
  return (
    <div style={{ backgroundColor: '#343a40' }}>
      <Header />
        {props.children}
    </div>
  )
}

export default Layout
