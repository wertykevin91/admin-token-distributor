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

    // set token configuration.
    var tokenConfig = {
        tokenContractAddress: "0xA3589856cb0E46e99A3B91F14A99d2342C4a226D",
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
              "name": "_ttlSupply",
              "type": "uint256"
            },
            {
              "name": "_administrator",
              "type": "address"
            },
            {
              "name": "_datalayer",
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
        }
      ];
    var businessLogicContract = new web3Instance.eth.Contract(jsonInterface, tokenConfig.tokenContractAddress);

    // Handle token get balance

    $('#getTokenBalance').click(async()=>{
        let address = $('#checkBalanceAddress').val().trim();
        //console.log(add);
        console.log(businessLogicContract.methods.balanceOf);
        let balance = await businessLogicContract.methods.balanceOf(address).call();

        let bnBalance = new BigNumber(balance.toString()).div(new BigNumber("1000000000000000000"));
        $('#checkBalanceBalance').val(bnBalance.toString());
    });

    // Handle token transfer

    $('#tokenTransfer').click(async() => {
        
    });

    // Handle token transfer for

    $('#tokenTransferFor').click(async() => {

    });

    // Issue shares to an address

    $('#issueShares').click(async()=>{

    });

    // Burning shares

    $('#redeemShares').click(async()=>{

    });

    // Function to check shareholder information

    $('#checkShareholder').click(async()=>{
      
    });

    // Function to update shareholder information

    $('#updateShareholder').click(async()=>{

    });

    // initialize some items in the UI

    const initUIFunction = async()=>{
      console.log("UI Initialization Successful");
    };

    initUIFunction();
});