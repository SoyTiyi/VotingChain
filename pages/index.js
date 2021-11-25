import React, { useRef } from 'react'
import Layout from '../components/Layout'
import 'semantic-ui-css/semantic.min.css'
import {
  Container,
  Header,
  Icon,
  Segment,
  Button,
  Grid,
  Image,
  List,
} from 'semantic-ui-react'

const votingIndex = (props) => {

  

  const startedRef = useRef()
  const blockRef = useRef()

  function goToStarted() {
    startedRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  function goToBlock() {
    blockRef.current.scrollIntoView({ behavior: 'smooth' })
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
          content="Welcome To VotingChain"
          inverted
          style={{
            fontWeight: 'normal',
            marginBottom: 0,
            fontSize: '2em',
            marginTop: '3em',
          }}
        />
        <Header
          as="h2"
          content="The voting platform built on blockchain"
          inverted
        />
        <Button primary size="huge" as="a" onClick={goToStarted}>
          Get Started
          <Icon name="right arrow" />
        </Button>
      </Segment>

      <section ref={startedRef}>
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
                <Header as="h3" style={{ fontSize: '2em' }}>
                  VotingChain is the web application that helps to make the
                  elections in a transparent way
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  With us, Voters will feel confident that the elections will be
                  transparent and that the person who the people believe the
                  best will be elected, we want the elections in the world to be
                  fair and legal
                </p>
                <Header as="h3" style={{ fontSize: '2em' }}>
                  Blockchain as main platform
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Using blockchain technology, we can have a record of the votes
                  cast and with this that the citizens themselves verify that
                  the elections were clean
                </p>
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                <Image
                  bordered
                  rounded
                  size="large"
                  src="https://media.istockphoto.com/vectors/blockchain-icon-concept-on-white-background-cryptocurrency-data-sign-vector-id979321630?k=20&m=979321630&s=612x612&w=0&h=KAuBn3cazFVmhzghdMXuSOajrPIOc97aQpN1DaUTshA="
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Button size="huge" basic color="red" as="a" onClick={goToBlock}>
                  Blockchain
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </section>

      <section ref={blockRef}>
        <Segment
          vertical
          style={{
            padding: '8em 0em',
            color: 'white',
          }}
        >
          <Grid container stackable>
            <Grid.Row>
              <Grid.Column floated="left" width={6}>
                <Image
                  bordered
                  rounded
                  size="large"
                  src="https://research-assets.cbinsights.com/2020/08/18154024/112017-Blockchain-4-V2-1024x570.png"
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <Header as="h3" style={{ fontSize: '2em' }} color="blue">
                  What is Blockchain?
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Blockchain is a system of recording information in a way that
                  makes it difficult or impossible to change, hack, or cheat the
                  system.
                </p>
                <Header as="h3" style={{ fontSize: '2em ' }} color="blue">
                  Why Blockchain is so important today?
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Blockchain helps in the verification and traceability of
                  multistep transactions needing verification and traceability.
                  It can provide secure transactions, reduce compliance costs,
                  and speed up data transfer processing. Blockchain technology
                  can help contract management and audit the origin of a
                  product.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </section>
      <Segment
        vertical
        style={{
          padding: '8em 0em',
          backgroundColor: 'white',
        }}
      >
        <Grid container stackable>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h3" style={{ fontSize: '2em' }}>
                ABOUT ME
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                My name is Santiago Martínez and I am 21 years old, I am Junior
                Software developer based in Colombia, I'm working in one of the
                best software companies, but now I wanna be part of the future
                and in the last months I spent my free time learning Bloackchain
                Technologies like Web3 library for React, Solidity, Ganache,
                Infura, Truffle, Metamask, etc...
              </p>
              <Button color="linkedin">
                <Icon name="linkedin" />{' '}
                <a
                  style={{ color: 'white' }}
                  target="_blank"
                  href="https://www.linkedin.com/in/santiago-mart%C3%ADnez-mart%C3%ADnez-a085711b0/"
                >
                  LinkedIn
                </a>
              </Button>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Image
                rounded
                size="medium"
                src="https://res.cloudinary.com/fitbook-arsw/image/upload/v1620763645/fitbookimg/qkmdsojiqi5rqbt7kj4p.jpg"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      
    </Layout>
  )
}

export default votingIndex
