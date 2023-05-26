import React, { Component } from 'react';
import axios from "axios";
import { PhrasesVector } from './PhrasesVector';
export class PhrasesPage extends Component {

    constructor(props) {
        super(props);
        this.state = { phrasesList: [] };
    }

    componentDidMount() {
        this.handleGetPhrases();
    }

    handleGetPhrases() {
        axios.get('api/phrases/')
            .then(response => {
                const data = response.data;
                this.setState({ phrasesList: data });
            }
        );
    }
    handleDelete(phraseId) {
        axios.delete('api/phrases/' + phraseId)
            .then(response => {
                this.setState({
                    phrasesList: [...this.state.phrasesList].filter((id) => id.id !== phraseId),
                });
            }).catch(error => {
                alert('error when deleting');
            }
        );
    }
    render() {
        return (
            <div>
                <p>phrases</p>
                <PhrasesVector 
                    vector={this.state.phrasesList}
                    handleDelete={this.handleDelete.bind(this)}
                />
            </div>
        );
    }
}