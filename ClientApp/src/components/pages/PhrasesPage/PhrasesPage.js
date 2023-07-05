import React, { Component } from 'react';
import { Context } from '../../ContextProvider';
import axios from "axios";
import { PhrasesVector } from './PhrasesVector';
import { PhrasePanel } from './PhrasePanel/PhrasePanel.js';
import { Pages, NOT_SELECTED, ApiRequest } from '../../../js/const.js';

export class PhrasesPage extends Component {
    static contextType = Context;
    constructor(props, context) {
        super(props, context);
        this.state = { 
            phrasesList: [],
            clickedPhraseId: NOT_SELECTED,
            clickedPhrase: null
        };

        this.localization = this.context.localization.data[Pages.Phrases].body;
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