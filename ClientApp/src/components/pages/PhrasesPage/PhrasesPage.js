import React, { Component } from 'react';
import axios from "axios";
import { PhrasesVector } from './PhrasesVector';
import { PhrasePanel } from './PhrasePanel/PhrasePanel.js';
import { PHRASE_NOT_SELECTED } from '../../../js/const.js';

export class PhrasesPage extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            phrasesList: [],
            clickedPhraseId: PHRASE_NOT_SELECTED,
            clickedPhrase: null
        };
    }

    componentDidMount() {
        this.handleGetPhrasesNames();
    }

    handleGetPhrasesNames() {
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
                    phrasesList: [...this.state.phrasesList].filter((p) => p.id !== phraseId),
                });
            }).catch(error => {
                alert('error when deleting');
            }
        );
    }
    handleGetPhrase(phraseId) {
        axios.get('api/phrases/' + phraseId)
            .then(response => {
                const data = response.data;
                this.setState({ clickedPhrase: data });
            }).catch(error => {
                alert('error get p');
            }
        );
    }
    clickPhrase(phraseIndex) {
        this.setState({ clickedPhraseId: phraseIndex });

        if(phraseIndex != PHRASE_NOT_SELECTED)
        {
            this.handleGetPhrase(this.state.phrasesList[phraseIndex].id);
        }
        else
        {
            this.setState({ clickedPhrase: null });
        }
    }

    render() {
        return (
            <div>
                <p>phrases</p>
                <PhrasesVector 
                    vector={this.state.phrasesList}
                    handleDelete={this.handleDelete.bind(this)}
                    clickPhrase={this.clickPhrase.bind(this)}
                />
                <PhrasePanel
                    // TODO Refactoring clickedPhraseId & clickedPhrase
                    appearance={this.state.clickedPhraseId !== PHRASE_NOT_SELECTED && this.state.clickedPhrase != null}
                    phrase={this.state.clickedPhrase}
                />
            </div>
        );
    }
}