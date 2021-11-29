import React, { useEffect, useRef, useState } from 'react'
import Layout from '../components/Layout'
import { Segment, Header, Icon, Button, Grid, Card } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import web3 from '../ethereum/web3'
import factory from '../ethereum/factory'
import { useRouter } from 'next/dist/client/router'

const elections = (props) => {

  const router = useRouter()
  const listRef = useRef()
  const [votings, setVotigs] = useState([])

  useEffect(() => {
    const getDeployedVotings = async () => {
      const result = await factory.methods.getDeployedVoting().call()
      setVotigs(result)
    }

    getDeployedVotings()
  }, [])

  function goToList() {
    listRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  const renderAllList = () => {
      const items = votings.map((element, index) => {
          return{
              header: element,
              description: <Button primary floated="left" onClick={() => router.push(`/elections/${element}`)}>View</Button>,
              fluid: true
          }
      })

      return <Card.Group items={items} />
  }

  return (
    <Layout>
      <Segment
        inverted
        textAlign="center"
        style={{ minHeight: 400, padding: '1em 0em' }}
        vertical
      >
        <Header
          as="h1"
          content="Open Elections"
          inverted
          style={{
            fontWeight: 'normal',
            marginBottom: 0,
            fontSize: '2em',
            marginTop: '3em',
          }}
        />

        <Header as="h2" content="List of all elections created" inverted />

        <Button primary size="huge" as="a" onClick={goToList}>
          View List
          <Icon name="right arrow" />
        </Button>
      </Segment>

      <section ref={listRef}>
        <Segment
          vertical
          style={{
            padding: '8em 0em',
            backgroundColor: 'white',
          }}
        >
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width textAlign="center">
                <Header as="h2" content="Elections" />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center">
                  {renderAllList()}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </section>
    </Layout>
  )
}

export default elections
