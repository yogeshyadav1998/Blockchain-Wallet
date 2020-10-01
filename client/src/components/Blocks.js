import React, { Component } from 'react';
import Block from './Block';
import {Link} from "react-router-dom";

class Blocks extends Component {

    state ={
        blocks: []
    };

    componentDidMount(){
        fetch("http://localhost:3000/api/blocks")
        .then(response => response.json())
        .then(json => this.setState({blocks : json}))
    };

    render(){
        return(
            <div>
                <Link to="/"><div>Home</div></Link>
                <br/>
               <h2>Blocks in Blockchain are </h2>
               {
                    this.state.blocks.map(block =>{
                        return(
                            <Block key = {block.hash} block={block} />
                        )
                    })
               }
            </div>
        )
    }
}

export default Blocks;