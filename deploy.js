const ganache = require('ganache-cli')
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const web3 = new Web3(ganache.provider())

const deploy = async () => {

    const accounts = await web3.eth.getAccounts();

    console.log(accounts)
  
    console.log("Attempting to deploy from account", accounts[0]);
  
    const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode })
      .send({ gas: "1000000", gasPrice: '5000000000', from: accounts[0] });
  
    console.log("Contract deployed to", result.options.address);
  };
  
deploy();

