import React from 'react'
import { Container, Segment, Grid, List, Header } from 'semantic-ui-react'
import MyHeader from './Header'

const Layout = (props) => {
  return (
    <div style={{ backgroundColor: '#343a40' }}>
      <MyHeader />
      {props.children}
      <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="About" />
                <List link inverted>
                  <List.Item>Santiago Martínez</List.Item>
                  <List.Item>Junior Software Developer</List.Item>
                  <List.Item>Tel: (+57) 3209254411</List.Item>
                  <List.Item>Bogotá-Colombia</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Services" />
                <List link inverted>
                  <List.Item>FrontEnd Developer</List.Item>
                  <List.Item>BackEnd Developer</List.Item>
                  <List.Item>BlockChain Developer</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as="h4" inverted>
                  Me
                </Header>
                <p>Work on what amuses you and makes you happier</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </div>
  )
}

export default Layout
