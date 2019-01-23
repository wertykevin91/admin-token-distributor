$(async() => {

    //console.log(web3);
    var web3Instance = null;
    if (typeof web3 !== 'undefined') {
        web3Instance = new Web3(web3.currentProvider);
        console.log("Web3 instantialization success!");
    } else if(typeof ethereum !== 'undefined'){
        web3Instance = new Web3(ethereum);
        try{
            await ethereum.enable();
        }
        catch(error){
            console.log(error);
        }
        console.log("Web3(ethereum) initialization success");
    }
    else {
        // Set the provider you want from Web3.providers
        //web3Instance = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        console.log("Web3 instance not found.");
    }

    // Initialize default account

    await web3Instance.eth.getAccounts().then(async(x, y)=>{
      // console.log(x);
      // console.log(y);
      web3Instance.eth.defaultAccount = x[0];
      console.log("Default address set to: " + x[0]);
    });

    //console.log(web3Instance);

    // set token configuration.
    var tokenConfig = {
        tokenContractAddress: "0xA3EC1462A3c30eEa7c73426F0D2342d0a37B5edc",
        tokenContractDecimals: 18,
        dataLayerAddress: ""
    };

    // instantialize token contract object

    var jsonInterface = [
      {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x06fdde03"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "name": "",
            "type": "uint8"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x313ce567"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_owner",
            "type": "address"
          }
        ],
        "name": "getShareholderUID",
        "outputs": [
          {
            "name": "",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x39e2f81b"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "publicTransfers",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x67e0e8c2"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_owner",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "name": "balance",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x70a08231"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "datalayer",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x7b0d239d"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x8da5cb5b"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x95d89b41"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "newAdmin",
            "type": "address"
          }
        ],
        "name": "transferAdministrator",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xc648a3a2"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "dL",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xd9c65414"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "administrator",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xf53d0a8e"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "dataLayerConnected",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xff01d500"
      },
      {
        "inputs": [
          {
            "name": "_name",
            "type": "string"
          },
          {
            "name": "_decimals",
            "type": "uint8"
          },
          {
            "name": "_symbol",
            "type": "string"
          },
          {
            "name": "_administrator",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor",
        "signature": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "burner",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Burn",
        "type": "event",
        "signature": "0xcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "minter",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Mint",
        "type": "event",
        "signature": "0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "_from",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "_to",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event",
        "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_ttlSupply",
            "type": "uint256"
          },
          {
            "name": "_datalayer",
            "type": "address"
          }
        ],
        "name": "firstTimeInit",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x1e254714"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_datalayer",
            "type": "address"
          }
        ],
        "name": "connectToDataLayer",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xd69fa7ae"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_to",
            "type": "address"
          },
          {
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xa9059cbb"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_from",
            "type": "address"
          },
          {
            "name": "_to",
            "type": "address"
          },
          {
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "transferFor",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x5253a579"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_address",
            "type": "address"
          },
          {
            "name": "_UID",
            "type": "bytes32"
          }
        ],
        "name": "updateShareholderUID",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x681065a1"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_allow",
            "type": "bool"
          }
        ],
        "name": "allowPublicTransfers",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x3965e2cf"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x18160ddd"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "burn",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x42966c68"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "mint",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xa0712d68"
      }
    ];
    var businessLogicContract = new web3Instance.eth.Contract(jsonInterface, tokenConfig.tokenContractAddress);

    // Handle token get balance

    $('#getTokenBalance').click(async()=>{
        let address = $('#checkBalanceAddress').val().trim();
        //console.log(add);
        //console.log(businessLogicContract.methods.balanceOf);
        let balance = await businessLogicContract.methods.balanceOf(address).call();

        let bnBalance = new BigNumber(balance.toString()).div(new BigNumber("1000000000000000000"));
        $('#checkBalanceBalance').val(bnBalance.toString());
    });

    // Handle token transfer

    $('#tokenTransfer').click(async() => {
      let address = $('#transferShareDestinationAddress').val().trim();
      let amount = $('#transferShareAmount').val();

      let amountBN = new BigNumber(amount).times(new BigNumber("1000000000000000000"));

      //console.log(web3Instance.eth.accounts[0]);
      let receipt = await businessLogicContract.methods.transfer(address, web3Instance.utils.toBN(amountBN).toString()).send({ from: web3Instance.eth.defaultAccount });
      console.log(receipt);
      var html = '<a target="_blank" href="https://ropsten.etherscan.io/tx/' + receipt.transactionHash + '">View in Etherscan: ' + receipt.transactionHash + '</a>'
      $('#transactionEtherscanLink').html(html);
    });

    // Handle token transfer for

    $('#tokenTransferFor').click(async() => {
      let address = $('#transferForFrom').val().trim();
      let amount = $('#transferForAmount').val();
      let destination = $('#transferForDestination').val().trim();
      let amountBN = new BigNumber(amount).times(new BigNumber("1000000000000000000"));

      let receipt = await businessLogicContract.methods.transferFor(address, destination, web3Instance.utils.toBN(amountBN).toString()).send({ from: web3Instance.eth.defaultAccount });
      console.log(receipt);
      var html = '<a target="_blank" href="https://ropsten.etherscan.io/tx/' + receipt.transactionHash + '">View in Etherscan: ' + receipt.transactionHash + '</a>'
      $('#transferForTransactionEtherscanLink').html(html);
    });

    // Issue shares to an address

    $('#issueShares').click(async()=>{
      let amount = $('#issueShareAmount').val();
      let amountBN = new BigNumber(amount).times(new BigNumber("1000000000000000000"));

      let receipt = await businessLogicContract.methods.mint(web3Instance.utils.toBN(amountBN).toString()).send({ from: web3Instance.eth.defaultAccount });
      console.log(receipt);
      var html = '<a target="_blank" href="https://ropsten.etherscan.io/tx/' + receipt.transactionHash + '">View in Etherscan: ' + receipt.transactionHash + '</a>'
      $('#issueShareTransactionEtherscanLink').html(html);
    });

    // Burning shares

    $('#redeemShares').click(async()=>{
      let amount = $('#redeemShareAmount').val();
      let amountBN = new BigNumber(amount).times(new BigNumber("1000000000000000000"));

      let receipt = await businessLogicContract.methods.burn(web3Instance.utils.toBN(amountBN).toString()).send({ from: web3Instance.eth.defaultAccount });
      console.log(receipt);
      var html = '<a target="_blank" href="https://ropsten.etherscan.io/tx/' + receipt.transactionHash + '">View in Etherscan: ' + receipt.transactionHash + '</a>'
      $('#redeemShareTransactionEtherscanLink').html(html);
    });

    // Function to check shareholder information

    $('#checkShareholder').click(async()=>{
      let address = $('#checkShareholderAddress').val().trim();
      let uid = await businessLogicContract.methods.getShareholderUID(address).call();
      $('#shareholderUID').val(web3.utils.hexToAscii(uid));
    });

    // Function to update shareholder information

    $('#updateShareholder').click(async()=>{
      let newUid = $('#updateShareholderUID').val().trim();
      let address = $('#updateShareholderAddress').val().trim();

      let receipt = await businessLogicContract.methods.updateShareholderUID(address, web3.utils.asciiToHex(newUid)).send({ from: web3Instance.eth.defaultAccount });
      console.log(receipt);
      var html = '<a target="_blank" href="https://ropsten.etherscan.io/tx/' + receipt.transactionHash + '">View in Etherscan: ' + receipt.transactionHash + '</a>'
      $('#updateShareholderTransactionEtherscanLink').html(html);
    });

    // Initialize some items in the UI
    // If you have something to initialize on the UI, do it here.

    const initUIFunction = async()=>{
      console.log("UI Initialization Successful");
    };

    initUIFunction();
});