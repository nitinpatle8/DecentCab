pragma solidity ^0.4.17;

contract Cab{

    address public customer ;
    string public startLocation ;
    string public endLocation ;

    string public status ;
    
    address public driver ;
    uint public value ;
    
    struct DriverRequest{
        address driver ;
        uint price ;
    }

    DriverRequest[] public driverRequests ;

    function Cab() public {
        customer = msg.sender ;
        status = "new contract instance for customer" ;
    }

    function rideRequest(string start , string end) public{
        require(customer == msg.sender) ;
        startLocation = start ;
        endLocation = end ;
       status = "ride request created , drivers can send drive requests" ;
    }


    function driveRequest(uint price) public 
    {        
        DriverRequest memory req = DriverRequest({driver : msg.sender , price : price }) ;
        driverRequests.push(req) ;
    }

    function chooseDriver(uint index) public payable{
        require(msg.sender == customer) ;
        require(msg.value >= driverRequests[index].price) ;
        value = msg.value ;
        driver = driverRequests[index].driver ;
        status = "driver  selected" ;

    }

    function checkIfYourDriveRequestAccepted() public view returns(bool){
        return (msg.sender == driver) ;
    }

    function acceptRideRequest() public {
        require(msg.sender == driver) ;
        status = "driver on path to customer start location" ;
    }

    function completeRide() public {
        require(msg.sender == customer) ;        
        driver.transfer(value) ;

        startLocation = '';
        endLocation = '';
        status = 'ride completed ,user can request for new ride' ;
        // while(driverRequests.length >= 1)
        // {
        //     driverRequests.pop() ;
        // }
    }

    function giveDriverRequestsCount() public view returns(uint){
        return driverRequests.length ;
    }
}