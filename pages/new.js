import React, { useRef, useState } from 'react'
import Layout from '../components/Layout'
import 'semantic-ui-css/semantic.min.css'
import {
  Header,
  Icon,
  Segment,
  Button,
  Grid,
  Form,
  Message,
} from 'semantic-ui-react'
import web3 from '../ethereum/web3'
import factory from '../ethereum/factory'

const newElection = (props) => {
  const [loading, setLoading] = useState(false)
  const [succ, setSucc] = useState(false)
  const [err, setErr] = useState(false)
  const [description, setDescription] = useState('')
  const [purpose, setPurpose] = useState('')
  const [message, setMessage] = useState('')

  const createRef = useRef()

  function goToCreate() {
      createRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  const handlerDescription = (event) => {
    setDescription(event.target.value)
  }

  const handlerPurpose = (event) => {
    setPurpose(event.target.value)
  }

  const createElection = async () => {
    try {
      setSucc(false)
      setErr(false)
      setLoading(true)
      setMessage('Processing the transaction...')
      const accounts = await web3.eth.getAccounts()
      await factory.methods.createVoting(description, purpose).send({
        from: accounts[0],
      })
      setLoading(false)
      setSucc(true)
      setMessage('Successfully transaction!!!')
    } catch (error) {
      setLoading(false)
      setSucc(false)
      setErr(true)
      setMessage('Error to create the election!!!')
      console.log(error)
    }
  }

  return (
    <Layout>
      <Segment
        textAlign="center"
        style={{ minHeight: 400, padding: '1em 0em' }}
        vertical
      >
        <Header
          as="h1"
          content="Create Election"
          style={{
            fontWeight: 'normal',
            marginBottom: 0,
            fontSize: '2em',
            marginTop: '3em',
            color: 'white',
          }}
        />

        <Header
          as="h2"
          content="Create the election have a cost"
          style={{ color: 'white' }}
        />

        <Button primary size="huge" as="a" onClick={goToCreate}>
          Create
          <Icon name="right arrow" />
        </Button>
      </Segment>

      <section ref={createRef}>
        <Segment
          style={{
            padding: '8em 0em',
            backgroundColor: 'white',
          }}
          vertical
        >
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <Form>
                  <h3>Creation Form</h3>
                  <Form.Field>
                    <label>Description</label>
                    <input onChange={handlerDescription} />
                  </Form.Field>
                  <Form.Field>
                    <label>Purpose</label>
                    <input onChange={handlerPurpose} />
                  </Form.Field>
                  <Button primary loading={loading} onClick={() => createElection()}>
                    Create
                  </Button>
                </Form>
                {err ? (
                  <Message negative header="ERROR" content={message} />
                ) : loading ? (
                  <Message info header="Transaction" content={message} />
                ) : succ ? (
                  <Message
                    positive
                    header="Success Transaction"
                    content={message}
                  />
                ) : null}
              </Grid.Column>

              <Grid.Column width={6} floated="right">
                <Header as="h3" style={{ fontSize: '2em' }}>
                  In VotingChain you only have to pay for the gas that you use!!
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  We take care to manage all the transactions and result in the
                  elections, if you want to finish the elections you have to be
                  the persone who create the elections
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </section>
    </Layout>
  )
}

export default newElection
