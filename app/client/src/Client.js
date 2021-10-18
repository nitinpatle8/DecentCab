import React from "react";
import web3 from "./web3";
import cab from "./cab";

class Client extends React.Component {
  state = {
    customer : '' ,
    startLocation : '' ,
    endLocation : '' ,
    status : '' ,    
    driver : '' ,
    value : 0 ,
    driverRequests : [],
    myaccount : '',
    driverRequestsCount : 0,
    message : ''
    
  }

  async componentDidMount()
  {
    
    
    const customer = await cab.methods.customer().call();
    const startLocation = await cab.methods.startLocation().call() ;
    const endLocation = await cab.methods.endLocation().call() ;
    const status = await cab.methods.status().call() ;
    const driver = await cab.methods.driver().call();
    const driverRequestsCount = await cab.methods.giveDriverRequestsCount().call() ;
    
    let driverRequests = [] ;
    for(let i = 0 ; i < driverRequestsCount ; i++)
    {
      let req = await cab.methods.driverRequests(i).call() ;
      let price = req[1] ;
      driverRequests.push(price) ;
    }
    const accounts = await web3.eth.getAccounts();
    
    // const value = await web3.ethereum.getBalance(cab.options.address);
    this.setState({customer : customer,
      startLocation : startLocation,
      endLocation : endLocation,
      status : status,
      driver : driver,
      driverRequestsCount : driverRequestsCount,
      myaccount : accounts[0],
      driverRequests : driverRequests
   }) ;

  }

  onRideRequest = async (event) =>{

    event.preventDefault();
    const account = this.state.myaccount ;
    this.setState({message : 'Waiting for ride request transaction to success ...'});

    await cab.methods.rideRequest(this.state.startLocation,this.state.endLocation).send({
      from : account
    }) ;

    this.setState({message : 'You have succesfully created a ride request'});
   

  }

  onChooseDriver = async (event) =>{
      event.preventDefault() ;
      const account = this.state.myaccount ;

      this.setState({message : 'Waiting for choose driver transaction to success ...'});

    await cab.methods.chooseDriver(this.state.choosenDriverIndex).send({
      from : account,
      value : this.state.driverRequests[this.state.choosenDriverIndex]
    }) ;

    this.setState({message : 'You have succesfully created choosen a driver'});

  }

  onCompleteRide = async(event) =>{
    this.setState({message : 'waiting for transaction complete ride to succed ... '});
    await cab.methods.completeRide().send({
      from : this.state.myaccount
    }) ;

    this.setState({message : 'transaction succesful , ride completed'}) ;
  } 
  render() { 

    
    return (<div>
      
      <h1>User profile </h1>
      <h2>my account address: {this.state.myaccount}</h2>
      <h2>customer address:  {this.state.customer}</h2>
      <h2>status : {this.state.status} </h2> 
      <h2>  {this.state.startLocation} - {this.state.endLocation} </h2>
      <h2>Drive Requests count: {this.state.driverRequestsCount} </h2>
      <ul>
        {this.state.driverRequests.map(price => {
          return <li> driver price : {price}</li>;
        })}
      </ul>
      
     
      <hr/>
      <form onSubmit = {this.onRideRequest}>
        <h2>want to ride ?</h2>
        <div>
          <label>
            starting point : 
          </label>
          <input
            value = {this.state.startLocation } 
            onChange = {event => this.setState({startLocation : event.target.value})}
          />
          <hr/>
          <label>
            destination point  :  
          </label>
          <input
            value = {this.state.endLocation } 
            onChange = {event => this.setState({endLocation : event.target.value})}
          />
          <hr/>
        </div>
        <button>Ride request</button>
      </form>

      <hr/>

      <form onSubmit = {this.onChooseDriver}>
        <h2>want to choose driver ? </h2>
        <div>
          <label>
            enter index : 
          </label>
          <input
            onChange = {event => this.setState({choosenDriverIndex : event.target.value})}
          />
          
        </div>
        <button>choose driver</button>
      </form>

      <hr/>


      <hr/>
      <button onClick = {this.onCompleteRide}> complete ride</button>
      <hr/>

      <h2>{this.state.message}</h2>
    </div>) ;
  }
}
export default Client;