import React from "react";
import web3 from "./web3";
import cab from "./cab";

class Driver extends React.Component {
  state = {
    myaccount : '',
    customer : '',
    status : '',
    price : 0,
    message : '',
    message1 : false,
    driver : ''
    
  }

  async componentDidMount()
  {
    const accounts = await web3.eth.getAccounts() ;
    const customer = await cab.methods.customer().call() ;
    const status = await cab.methods.status().call() ;
    const driver = await cab.methods.driver().call() ;
    console.log(accounts) ;
    this.setState({myaccount : accounts[0] ,driver : driver , customer : customer , status:status }) ;
  }

  onDriveRequest = async (event) =>{
    event.preventDefault();
    const account = this.state.myaccount ;
    this.setState({message : 'Waiting for drive request transaction to success ...'});

    await cab.methods.driveRequest(this.state.price).send({
      from : account
    }) ;

    this.setState({message : 'You have succesfully created a drive request'});
  }

  onCheckIfYourDriveRequestAccepted = async (event) =>{
      this.setState({message : 'call for check'}) ;
        const driver = await cab.methods.driver().call() ;
       const result = await cab.methods.checkIfYourDriveRequestAccepted().call({
           from : this.state.myaccount
       }) ;
        if(driver === this.state.myaccount)
        {
            this.setState({message : 'true'}) ;
        }
        else 
        {
            this.setState({message : 'false'}) ;
        }

        console.log(result) ;
       
  }

  onAcceptRideRequest = async (event) =>{
    this.setState({message : 'call for accept ride request , waiting for transaction suceess ...'}) ;
    await cab.methods.acceptRideRequest().send({
      from : this.state.myaccount
    }) ;
    this.setState({message : 'transaction of accept ride request succesful .. '}) ;
  }
  render() { 
    return (<div>
        <h1>Driver profile</h1>
        <h2>myaccount address : {this.state.myaccount}</h2>
        <h2>customer : {this.state.customer}</h2>
        <h2>status : {this.state.status}</h2>
        <h2>driver : {this.state.driver}</h2>

        
        <hr/>
        <form onSubmit = {this.onDriveRequest}>
        <h2>want to send a drive request ? </h2>
        <div>
          <label>
            price : 
          </label>
          <input
            onChange = {event => this.setState({price : event.target.value})}
          />
          
        </div>
        <button>submit</button>
      </form>

      <hr/>
      <button onClick = {this.onCheckIfYourDriveRequestAccepted}> check if ur drive request accepted</button>
      <hr/>
      <button onClick = {this.onAcceptRideRequest}> accept customer request and update status</button>
      <hr/>



        <h2>{this.state.message}</h2>
    </div>) ;
  }
}
export default Driver;