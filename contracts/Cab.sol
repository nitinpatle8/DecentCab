pragma solidity ^0.4.17;

contract Cab {
    // 
    // can use nested array in solidity but ABI doesn't provide functionality for nested array
    address[] public users;
    address[] public drivers;
    
    string message;
    
    // msg is a global variable
    // msg.sender
    // msg.value -> ether send with transaction
    // msg.gas
    
    // nitin
    function userprofile() public {
        users.add(msg.sender);
    }

    // ankush
    function driverprofile() public {
        drivers.add(msg.sender);
    }

    //ayush
    function userrequest() public payable returns (address) {

        restricted();

        address user = msg.sender;
        bool found = false;

        uint i = 0;
        for(i = 0; i < users.length; i++ )
        {
            if(users[i]==user)
            {
                found = true;
            }
        }
        
        if(found)
        {
            showDrivers();
            address driver = givedriver();
            driver.transfer(msg.value);
        }
        else
        {

        }
        
    }
    
    function random() private view returns (uint) {
        return uint(sha256(drivers));
    }
    
    // arghyadeep
    function givedriver() public returns(address){

        if(drivers.length > 0){

            uint index = random()%drivers.length;
            
            return drivers[index];
        }

        return '0';
        
    }

    //amit
    function showUsers() public view returns(address[]) {
        return users;
    }

    //amit
    function showDrivers() public view returns(address[]){
        return drivers;
    }

    // validation  modifier
    modifier restricted() {
        require(msg.value > 0.01 ether);
        _;
    }

    
}   