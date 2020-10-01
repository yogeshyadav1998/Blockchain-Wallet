import React, { Component } from 'react';
import {FormGroup, FormControl, Button}  from 'react-bootstrap';
import {Link} from 'react-router-dom';

class ConductTransaction extends Component {
    
    state = {
        recipient: "",
        amount: ""
    }

    updateRecipient = event =>{
        this.setState({recipient : event.target.value });
    }

    updateAmount = event =>{
        this.setState({amount: event.target.value});
    }

    conductTransaction = () =>{
        const {recipient, amount} = this.state;

        fetch("http://localhost:3000/api/transact",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "recipient": recipient,
                "amountstring": amount
                })
        }).then(response => response.json())
        .then(json =>{
            alert(json.message || json.type)
        });
    }

    render(){
        return(
            <div className="ConductTransaction">
                <div><Link to="/">Home</Link></div>
                <h3>Conduct A Transaction</h3>
                <FormGroup>
                    <FormControl
                        input='text'
                        placeholder="recipient"
                        value={this.state.recipient}
                        onChange={this.updateRecipient}
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        input='number'
                        placeholder="amount"
                        value={this.state.amount}
                        onChange={this.updateAmount}
                    />
                </FormGroup>
                <div>
                    <Button variant="danger" onClick={this.conductTransaction} >Submit</Button>
                </div>
            </div>
        )
    }
}

export default ConductTransaction ;
