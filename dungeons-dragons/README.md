# Dependencies

- Truffle // $ npm install -g truffle
- Ganache // $ npm install -g ganache-cli
- ReactJS (npm, node v12)

Also to have contracts accessible from client:

- Create link between drizzle-dragon/build/contracts and a contracts folder on react-dungeon/contracts
$ cd react-dungeon/src
$ ln -s ../../drizzle-dragon/build/contracts contracts

# Ganache commands

- Start ganache (minning every 2 seconds):
$ ganache-cli -b 2 
// Remember to copy accounts and private keys to use on Metamask

Truffle commands

- Compile
$ truffle compile
// Better run with script 
$ ./truffle-compile.sh

- Migrate (deploy contract to ganache, ganache needs to be running)
$ truffle migrate

- Run tests over contract (obviosly contract must be deployed)
$ truffle test

- To run and test contract we use develop env
$ truffle develop
// Here we deploy a testing truffle blockchaing to test the contract
// We need to run migrate (without the truffle command) to have the contract deployed

# React commands

- To start react instance (local env)
$ npm start
