import React from 'react'
import web3 from './web3'
import cab from './cab'

class App extends React.Component {
  state = {
    user: '',
    drivers: [],
    balance: '',
    value: '',
    message: '',
    driver: ''
  }

  async componentDidMount() {

    const accounts = await web3.eth.getAccounts()

    await cab.methods.userprofile().send({ from: accounts[0] })

    const drivers = await cab.methods.showDrivers().call();

    const balance = await web3.eth.getBalance(cab.options.address)

    this.setState({ user: accounts[0], drivers: drivers, balance: balance })
  }

  onSubmit = async (event) => {
  
    event.preventDefault();

    this.setState({ message: 'Waiting on transaction success...' })

    const driver = await cab.methods.userrequest().send({
      from: this.state.user,
      value: web3.utils.toWei(this.state.value, 'ether'),
    })

    this.setState({ message: 'Your transaction was successful', driver:  driver.from})
  }

  render() {
    return (
      <div>
        <h2>Book a cab</h2>

        <p>
          This contract is managed by {this.state.user}
          , {this.state.drivers.length} drivers bidding, 
          minimum value: {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>

        <hr />

        <ul>
          {this.state.drivers.forEach((driver) =>
            console.log(driver),
          )}
        </ul>
        
        <form onSubmit={this.onSubmit}>
          <h4>Want to book a cab?</h4>
          <div>
            <input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Book</button>
        </form>

        <hr />
        <h1>{this.state.message}</h1>
        <h2>{this.state.driver}</h2>
      </div>
    )
  }
}
export default App;
