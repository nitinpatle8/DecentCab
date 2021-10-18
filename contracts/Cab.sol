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
    // 0x347c16a59Ea6882bF927Ec97A3EEf1E8B27063Dc
    
    // nitin
    function userprofile() public {
        users.push(msg.sender);
    }

    // ankush
    function driverprofile() public {
        drivers.push(msg.sender);
    }


    //ayush
    function userrequest() public payable restricted returns (address) {

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
        
        require(found) ;
        
        address driver = givedriver();
        driver.transfer(msg.value);

        return driver;
        
    }
    
    function random() private view returns (uint) {
        return uint(sha256(drivers));
    }
    
    // arghyadeep
    function givedriver() public view returns(address){
        require(drivers.length >= 1) ;
        return drivers[0];
        // uint index = random()%drivers.length;
        
        // return drivers[index];

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