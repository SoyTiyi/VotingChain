import web3 from './web3'
import compiledVoting from './build/Voting.json'

export default (address) => {
  return new web3.eth.Contract(compiledVoting.abi, address)
}
