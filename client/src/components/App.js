import React, {Component} from 'react';
import Logo from "../assets/logo.png";
 
class App extends Component{
    state={
        walletInfo : {}
    }

    componentDidMount(){
        fetch('http://localhost:3000/api/wallet-info')
        .then(response => response.json())
        .then(json => this.setState({
            walletInfo: json
        }));
    }

    render(){

        const {address, balance} = this.state.walletInfo;

        return(
            <div className="App">
                <img src={Logo}/>
                <h1>Welcome To React BlockChain</h1>
                <br/>
                <div className="WalletInfo">
                    <h4>Wallet Info</h4>
                    <div>Address : {address}</div>
                    <div>Balance : {balance}</div>
                </div>
            </div>
        )
    }
}

export default App;