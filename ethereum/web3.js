import Web3 from 'web3'

let web3

//New way to use the metamask provider
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  window.ethereum.request({ method: 'eth_requestAccounts' })
  web3 = new Web3(window.ethereum)
} else {
// In the case that the user do not have Metamask, use the infura provider 
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/bb52c15fce404eb7a44d127574c3aae5',
  )
  web3 = new Web3(provider)
}
export default web3
