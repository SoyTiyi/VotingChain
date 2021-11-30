import React, { useRef, useState } from 'react'
import Voting from '../../../ethereum/voting'
import Layout from '../../../components/Layout'
import web3 from '../../../ethereum/web3'
import {
  Segment,
  Header,
  Button,
  Icon,
  Grid,
  Form,
  Checkbox,
  Message,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const electionsDetails = ({
  address,
  description,
  purpose,
  manager,
  votesCount,
  candidatesCount,
  candidates,
}) => {
  const detailRef = useRef()
  const candidatesRef = useRef()
  const addCandidateRef = useRef()

  const [name, setName] = useState('')
  const [studies, setStudies] = useState('')
  const [desc, setDesc] = useState('')
  const [rightWing, setRightWing] = useState(false)
  const [succ, setSucc] = useState(false)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(false)
  const [message, setMessage] = useState('')

  const createCandidate = async () => {
    try {
      setErr(false)
      setSucc(false)
      setLoading(true)
      setMessage('Loading your transaction...')
      const accounts = await web3.eth.getAccounts()
      const voting = await Voting(address)
      await voting.methods
        .addCandidate(name, studies, desc, rightWing)
        .send({ from: accounts[0] })
      setLoading(false)
      setSucc(true)
      setMessage('Successfully transaction!!!')
    } catch (error) {}
  }

  const handlerNameInput = (event) => {
    setName(event.target.value)
  }

  const handlerStudiesInput = (event) => {
    setStudies(event.target.value)
  }

  const handlerDescriptionInput = (event) => {
    setDesc(event.target.value)
  }

  function goToDetails() {
    detailRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  function goToCandidates() {
    candidatesRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  function goToAddCandidates() {
    addCandidateRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  const renderCandidates = () => {
    return <p style={{ marginTop: '10px' }}>Not Candidates yet</p>
  }

  const handlerRightWingInput = () => {
    setRightWing(!rightWing)
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
          content={address}
          inverted
          style={{
            fontWeight: 'normal',
            marginBottom: 0,
            fontSize: '2em',
            marginTop: '3em',
          }}
        />

        <Header as="h2" content="Address of the election" inverted />
        <Header
          as="h3"
          content="In this page we have the election details"
          inverted
        />

        <Button primary size="huge" as="a" onClick={goToDetails}>
          View Details
          <Icon name="right arrow" />
        </Button>
      </Segment>

      <section ref={detailRef}>
        <Segment
          vertical
          style={{
            padding: '8em 0em',
            backgroundColor: 'white',
          }}
        >
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Header
                  as="h2"
                  content="DETAILS"
                  style={{ color: '#3a86ff' }}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h3" style={{ fontSize: '2em' }}>
                  Owner of the Elections
                </Header>
                <p style={{ fontSize: '1.33em' }}>{manager}</p>
                <Header as="h3" style={{ fontSize: '2em' }}>
                  Description
                </Header>
                <p style={{ fontSize: '1.33em' }}>{description}</p>
                <Header as="h3" style={{ fontSize: '2em' }}>
                  Purpose
                </Header>
                <p style={{ fontSize: '1.33em' }}>{purpose}</p>
                <Button
                  primary
                  content="Show Candidates"
                  onClick={goToCandidates}
                />
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                <Grid.Row>
                  <Grid.Column>
                    <Header
                      as="h3"
                      style={{ fontSize: '2em', color: '#3a86ff' }}
                      textAlign="center"
                    >
                      Elections Summary
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ marginTop: '20px' }}>
                  <Grid.Column>
                    <Header as="h3" style={{ fontSize: '2em' }}>
                      Candidates:
                    </Header>
                    <p style={{ fontSize: '1.33em' }}>{candidatesCount}</p>
                    <Header as="h3" style={{ fontSize: '2em' }}>
                      Votes:
                    </Header>
                    <p style={{ fontSize: '1.33em' }}>{votesCount}</p>
                    <div>
                      <Button
                        content="Add Candidate"
                        primary
                        onClick={goToAddCandidates}
                      />
                      <Button content="Add vote" secondary />
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </section>

      <section ref={candidatesRef}>
        <Segment
          vertical
          inverted
          textAlign="center"
          style={{
            padding: '2em 0em',
          }}
        >
          <Header
            as="h2"
            content="Candidates"
            inverted
            style={{
              fontWeight: 'normal',
              marginBottom: 0,
              fontSize: '2em',
              marginTop: '3em',
              color: '#3a86ff',
            }}
          />
          <Header
            as="h3"
            content="If you want to enrol as candidate scroll up"
            style={{
              fontWeight: 'normal',
              marginBottom: 0,
              fontSize: '2em',
              color: 'white',
            }}
          />

          {renderCandidates()}
        </Segment>
      </section>

      <section ref={addCandidateRef}>
        <Segment
          vertical
          style={{
            padding: '2em 0em',
            backgroundColor: 'white',
          }}
        >
          <Header
            as="h2"
            content="Add Candidate"
            textAlign="center"
            style={{
              fontWeight: 'normal',
              marginBottom: 0,
              fontSize: '2em',
              color: '#3a86ff',
            }}
          />
          <Header
            as="h4"
            content="Add this form if you wanna be a Candidate"
            textAlign="center"
            style={{
              fontWeight: 'normal',
              marginBottom: 0,
              fontSize: '2em',
              color: '#6c757d',
            }}
          />
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <Form>
                  <h3>Create Candidate</h3>
                  <Form.Field>
                    <label>Full Name: </label>
                    <input onChange={handlerNameInput} />
                  </Form.Field>
                  <Form.Field>
                    <label>Studies: </label>
                    <input onChange={handlerStudiesInput} />
                  </Form.Field>
                  <Form.Field>
                    <label>Description: </label>
                    <input onChange={handlerDescriptionInput} />
                  </Form.Field>
                  <Form.Field>
                    <label>right-wing: </label>
                    <Checkbox toggle onChange={handlerRightWingInput} />
                  </Form.Field>
                  <Button
                    primary
                    content="Create"
                    onClick={() => createCandidate()}
                  />
                </Form>
              </Grid.Column>
              <Grid.Column width={6} textAlign="center" floated="right">
                <Grid.Row>
                  <Grid.Column>
                    <Message>
                      <Message.Header>Restrictions</Message.Header>
                      <p>
                        Only you can enrol as candidate one time, if you try to
                        re-enrol the application go to show a error message, you
                        have to be honest to fill this form!!!
                      </p>
                    </Message>
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </section>
    </Layout>
  )
}

electionsDetails.getInitialProps = async (props) => {
  const address = props.query.address
  const voting = Voting(address)
  const summary = await voting.methods.getSummary().call()
  const candidates = await Promise.all(
    Array(parseInt(summary[4]))
      .fill()
      .map((element, index) => {
        return voting.methods.candidates(index).call()
      }),
  )

  return {
    address: address,
    description: summary[0],
    purpose: summary[1],
    manager: summary[2],
    votesCount: summary[3],
    candidatesCount: summary[4],
    candidates: candidates,
  }
}

export default electionsDetails
