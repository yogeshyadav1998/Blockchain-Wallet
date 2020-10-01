import React, {Component} from 'react';
import Transaction from './Transaction';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

const POLL_INTERVAL_MS = 10000;

class TransactionPool extends Component {
    state ={
        transactionPool : []
    }

    fetchTransactionPool = () =>{
        fetch("http://localhost:3000/api/transaction-pool-map",{
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
        })
        .then(response => response.json())
        .then(json =>{
            this.setState({
                transactionPool: json
            })
        })
        console.log(this.state.transactionPool);
    }

    fetchMineTransactions = () =>{
        fetch(`${document.location.origin}/api/mine-transactions`)
        .then(response =>{
            if(response.status == 200){
                alert("success");
            }else{
                alert("mine-transaction block request is not completed");
            }
        })
    }

    componentDidMount (){
        this.fetchTransactionPool();

        setInterval(
            ()=> this.fetchTransactionPool(),
            POLL_INTERVAL_MS
        );
    }

    render(){
        return(
            <div className="TransactionPool">
                <div><Link to="/">Home</Link></div>
                <h3>Transaction Pool</h3>
                {Object.values(this.state.transactionPool).map(transaction =>{
                   return(
                    <div key ={transaction.id}>
                        <hr/>
                        <Transaction transaction={transaction}/>
                    </div>
                   )
                })}
                <Button variant="danger" onClick={this.fetchMineTransactions}>
                    Mine Transactions
                </Button>
            </div>
        )
    }
}

export default TransactionPool;