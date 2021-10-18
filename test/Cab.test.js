const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')

const web3 = new Web3(ganache.provider())

const { interface, bytecode } = require('../compile')

let cab;
let accounts;

beforeEach(async () => {

  accounts = await web3.eth.getAccounts();

  cab = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000' })

})

describe("Cab Contract", () => {

  // 1. can add user // done..
  // 2. can add driver // done..
  // 3. user request check // done..
  // 4. check list of users  // done..
  // 5. check list of drivers // done..
  // 6. Only assign driver // done.. (arghyadeep)

  it("deploys a contract", () => {
    assert.ok(cab.options.address);
  });

  it("can add user", async () => {

    await cab.methods.userprofile().send({
      from: accounts[0]
    });

    const users = await cab.methods.showUsers().call({
      from: accounts[0]
    });

    assert.equal(users.length, 1);
    assert.equal(users[0], accounts[0]);

  });


  it("can add driver", async () => {

    await cab.methods.driverprofile().send({
      from: accounts[0]
    });

    const drivers = await cab.methods.showDrivers().call({
      from: accounts[0]
    });

    assert.equal(drivers.length, 1);
    assert.equal(drivers[0], accounts[0]);

  });

  it("user request check", async () => {

    await cab.methods.userprofile().send({
      from: accounts[0]
    });

    let users = await cab.methods.showUsers().call({
      from: accounts[0]
    });

    assert.equal(users.length, 1);
    assert.equal(users[0], accounts[0]);

    await cab.methods.driverprofile().send({
      from: accounts[0]
    });

    let drivers = await cab.methods.showDrivers().call({
      from: accounts[0]
    });

    assert.equal(drivers.length, 1);
    assert.equal(drivers[0], accounts[0]);

    let driver = await cab.methods.userrequest().send({
      from: accounts[0],
      value: web3.utils.toWei("1", "ether")
    });

    console.log(driver);

    assert(driver.from == parseInt(accounts[0])); 
  });

  it('check list of users', async () => {

    await cab.methods.userprofile().send({
      from: accounts[0]
    });

    let users = await cab.methods.showUsers().call({
      from: accounts[0]
    });

    assert.equal(users.length, 1);
    assert.equal(users[0], accounts[0]);

    await cab.methods.driverprofile().send({
      from: accounts[0]
    });

    const drivers = await cab.methods.showDrivers().call({
      from: accounts[0]
    });

    assert.equal(drivers.length, 1);
    assert.equal(drivers[0], accounts[0]);

    users = await cab.methods.showUsers().call();
    assert(users.length > 0);

  })

  it('check list of drivers', async () => {

    await cab.methods.driverprofile().send({
      from: accounts[0]
    });

    const drivers = await cab.methods.showDrivers().call({
      from: accounts[0]
    });

    assert(drivers.length == 1);
  });


  it('only assign driver', async () => {
    try {
      await cab.methods.givedriver().send({
        from: accounts[1]
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

});

//this is for get driver--- please review cannot join meet at once from computer

