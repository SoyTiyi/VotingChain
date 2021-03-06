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
  Card,
  Table,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { useRouter } from 'next/dist/client/router'

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
  const addVoteRef = useRef()

  const [name, setName] = useState('')
  const [studies, setStudies] = useState('')
  const [desc, setDesc] = useState('')
  const [rightWing, setRightWing] = useState(false)
  const [succ, setSucc] = useState(false)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(false)
  const [message, setMessage] = useState('')
  const [info, setInfo] = useState(true)
  const [loadVote, setLoadVote] = useState(false)
  const [voteMessage, setVoteMessage] = useState('')

  const router = useRouter()

  console.log(candidates.length)

  const voteToCandidate = async (index) => {
    try {
      setLoadVote(true)
      setVoteMessage('Processing the vote...')
      const accounts = await web3.eth.getAccounts()
      const voting = Voting(address)
      await voting.methods.addVote(index).send({
        from: accounts[0],
      })
      setLoadVote(false)
      setVoteMessage('Successfully vote!!!')
      router.push(`/elections/${address}`)
    } catch (error) {
      setLoadVote(false)
      setVoteMessage('Error to process the vote!!!')
    }
  }

  const renderCandidatesToVote = () => {
    const items = candidates.map((element, index) => {
      return (
        <Table.Row key={index}>
          <Table.Cell>{index + 1}</Table.Cell>
          <Table.Cell>{element.name}</Table.Cell>
          <Table.Cell textAlign="center">
            <Button
              color="green"
              loading={loadVote}
              onClick={() => voteToCandidate(index)}
              content="Vote"
            />
          </Table.Cell>
        </Table.Row>
      )
    })

    return items
  }

  const createCandidate = async () => {
    try {
      setErr(false)
      setSucc(false)
      setInfo(false)
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
      router.push(`/elections/${address}`)
    } catch (error) {
      setLoading(false)
      setErr(true)
      setMessage('Error to proccess the transaction!!!')
    }
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

  function goToAddVote() {
    addVoteRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  const renderCandidates = () => {
    if (candidates.length === 0) {
      return <p style={{ marginTop: '10px' }}>Not Candidates yet</p>
    } else {
      const items = candidates.map((element, index) => {
        return {
          header: element.name,
          description: (
            <div style={{ color: 'black' }}>
              <p>Votes: {element.votes}</p>
              <p>Studies: {element.studies}</p>
              <p>Description: {element.description}</p>
              <p>Right Wing: {element.right_wing ? 'yes' : 'no'}</p>
            </div>
          ),
          meta: element.candidateAddress.slice(0, 8) + '...',
        }
      })
      return <Card.Group items={items} />
    }
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
                      <Button
                        content="Add vote"
                        secondary
                        onClick={goToAddVote}
                      />
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
          <Grid
            container
            stackable
            verticalAlign="middle"
            style={{ marginTop: '10px' }}
          >
            <Grid.Row columns="4">{renderCandidates()}</Grid.Row>
          </Grid>
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
                    ) : info ? (
                      <Message>
                        <Message.Header>Restrictions</Message.Header>
                        <p>
                          Only you can enrol as candidate one time, if you try
                          to re-enrol the application go to show a error
                          message, you have to be honest to fill this form!!!
                        </p>
                      </Message>
                    ) : null}
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </section>

      <section ref={addVoteRef}>
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
            content="Add Candidate"
            textAlign="center"
            style={{
              fontWeight: 'normal',
              marginBottom: 0,
              fontSize: '2em',
              color: '#3a86ff',
            }}
          />
          <h3>Request List</h3>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column>
                <Table celled>
                  <Table.Header>
                    <Table.Row textAlign="center">
                      <Table.HeaderCell>ID</Table.HeaderCell>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Vote</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>{renderCandidatesToVote()}</Table.Body>
                </Table>
                {<p style={{color: 'white'}}>{voteMessage}</p>}
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
