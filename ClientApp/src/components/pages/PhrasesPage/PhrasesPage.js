import React, { Component } from 'react';
import axios from "axios";
import { PhrasesVector } from './PhrasesVector';
import { PhrasePanel } from './PhrasePanel/PhrasePanel.js';
import { NOT_SELECTED, ApiRequest } from '../../../js/const.js';

export class PhrasesPage extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            phrasesList: [],
            clickedPhraseId: NOT_SELECTED,
            clickedPhrase: null
        };
    }

    componentDidMount() {
        this.handleGetPhrasesNames();
    }

    async handleGetPhrasesNames() {
        try {
            const response = await axios.get(ApiRequest.Phrases.GetNames);
            this.setState({ phrasesList: response.data });
        } catch (error) {
            alert('Unable to get all phrases');
        }
    }
    async handleDelete(phraseId) {
        try {
            await axios.delete(ApiRequest.Phrases.Delete + phraseId);
            this.setState({ phrasesList: [...this.state.phrasesList].filter((p) => p.phraseId !== phraseId) });
        } catch (error) {
            alert('Unable to delete phrase');
        }
    }
    async handleGetPhrase(phraseId) {
        try {
            const response = await axios.get(ApiRequest.Phrases.Get + phraseId);
            this.setState({ clickedPhrase: response.data });
        } catch (error) {
            alert('Unable to get phrase');
        }
    }
    
    clickPhrase(phraseIndex) {
        this.setState({ clickedPhraseId: phraseIndex });

        if(phraseIndex !== NOT_SELECTED)
        {
            this.handleGetPhrase(this.state.phrasesList[phraseIndex].phraseId);
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
                    appearance={this.state.clickedPhraseId !== NOT_SELECTED && this.state.clickedPhrase != null}
                    phrase={this.state.clickedPhrase}
                />
            </div>
        );
    }
}