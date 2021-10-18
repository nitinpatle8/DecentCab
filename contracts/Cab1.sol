contract Cab{
    address public customer ;
    string public startLocation ;
    string public endLocation ;

    struct DriverRequest{
        address driver ;
        uint price ;
    }

    DriverRequest[] public driverRequests ;

    function Cab() public {
        customer = msg.sender ;
    }

    function rideRequest(string start , string end) public {
        
    }
    
}