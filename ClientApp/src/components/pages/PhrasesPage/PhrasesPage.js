import React, { Component } from 'react';
import { Context } from '../../ContextProvider';
import axios from "axios";
import { PhrasesVector } from './PhrasesVector';
import { PhrasePanel } from './PhrasePanel/PhrasePanel.js';
import { Pages, NOT_SELECTED, ApiRequest, NotificationType } from '../../../js/const.js';

export class PhrasesPage extends Component {
    static contextType = Context;
    constructor(props, context) {
        super(props, context);
        this.state = { 
            phrasesList: [],
            clickedPhraseId: NOT_SELECTED,
            clickedPhrase: null
        };

        this.localization = this.context.localization.data[Pages.Phrases];
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
            this.context.notification.showNotification(NotificationType.Success, this.localization.notification.PhrasesNotificationDelete);
        } catch (error) {
            this.context.notification.showNotification(NotificationType.Error, this.localization.notification.PhrasesNotificationDeleteError);
        }
    }
    async handleGetPhrase(phraseId) {
        try {
            const response = await axios.get(ApiRequest.Phrases.Get + phraseId);
            this.setState({ clickedPhrase: response.data });
        } catch (error) {
            this.context.notification.showNotification(NotificationType.Error, this.localization.notification.PhrasesNotificationGetPhraseInfoError);
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
                <h1>{this.localization.body.PhrasesBodyHeader}</h1>
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