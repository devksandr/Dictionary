import React, { Component } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import '../../../css/Theme.css';
import { NOT_SELECTED, ApiRequest } from '../../../js/const.js';
import { Row, Col } from 'reactstrap';
import { FileSentences } from './FileSentences';
import { SavePhrasePanel } from './SavePhrasePanel/SavePhrasePanel';

 class FilePageClass extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            file: {name: '', sentences: []},
            sentencesWithPhrases: [],
            clickedSentenceIndex: NOT_SELECTED,
            clickedSentenceId: NOT_SELECTED,
            clickedSentencePhrases: []
        };
    }

    componentDidMount() {
        this.handleGetFile();
    }

    async handleGetFile() {
        const { id } = this.props.params;
        const response = await axios.get(ApiRequest.Files.Get + id);
        this.setState({ file: response.data });
        const fileId = response.data.id;
        this.handleGetPhrasesForSentences(fileId);
    }
    async handleGetPhrasesForSentences(fileId) {
        const response = await axios.get(ApiRequest.Phrases.GetForSentence + fileId);
        this.setState({ sentencesWithPhrases: response.data});
    }

    async handlePhraseFormSubmit(formData, isAdd) {

        if(isAdd) {
            const response = await axios.post(ApiRequest.Phrases.Add, formData);

            // Set sentencesWithPhrases after Add new phrase (Add or Update)
            const newSentencePhrase = response.data;
            var sentenceWithPhrases = this.state.sentencesWithPhrases.filter(swp => swp.id === newSentencePhrase.id)
            if(sentenceWithPhrases.length > 0) {
                this.setState(state => {
                    const sentencesWithPhrases = state.sentencesWithPhrases.map((swp) => {
                        if (swp.id === newSentencePhrase.id) {
                            const phrases = swp.phrases.concat(newSentencePhrase.phrases)
                            swp.phrases = phrases;
                        }
                        return swp;
                    });
                    return sentencesWithPhrases;
                });
            }
            else {
                this.setState({ sentencesWithPhrases: this.state.sentencesWithPhrases.concat(newSentencePhrase) });
            }
        }
        else {
            const phraseId = formData.get("phraseId");
            const response = await axios.put(ApiRequest.Phrases.Update + phraseId, formData);

            // Set sentencesWithPhrases after Update phrase
            const updatedSentencePhrase = response.data;
            this.setState(state => {
                const sentencesWithPhrases = state.sentencesWithPhrases.map((swp) => {
                    if (swp.id === updatedSentencePhrase.sentenceId) {
                        const phrases = swp.phrases.map((phrase) => {
                            if(phrase.id === updatedSentencePhrase.id) {
                                // TODO refactoring: phrase = updatedSentencePhrase
                                phrase.categoryId = updatedSentencePhrase.categoryId;
                                phrase.data = updatedSentencePhrase.data;
                                phrase.comment = updatedSentencePhrase.comment;
                                phrase.meaning = updatedSentencePhrase.meaning;
                            }
                            return phrase;
                        });
                        return phrases;
                    }
                    return swp;
                });
                return sentencesWithPhrases;
            });
        }

        this.setState({ clickedSentenceIndex: NOT_SELECTED });
        this.setState({ clickedSentenceId: NOT_SELECTED });
        this.setState({ clickedSentencePhrases: [] });
    }

    handleClickSentence(sentenceIndex, sentenceId) {
        this.setState({ clickedSentenceIndex: sentenceIndex });
        this.setState({ clickedSentenceId: sentenceId });

        const clickedSentenceWithPhrases = this.state.sentencesWithPhrases.find(swp => swp.id === sentenceId);
        let clickedSentencePhrases = clickedSentenceWithPhrases !== undefined ? clickedSentenceWithPhrases.phrases : [];
        this.setState({ clickedSentencePhrases: clickedSentencePhrases });
    }

    render() {
        return (
            <div>
                <h1>File: {this.state.file.name}</h1>
                <Row>
                    <Col xs="9"><FileSentences 
                        sentences={this.state.file.sentences}
                        sentencesWithPhrasesIndexes={this.state.sentencesWithPhrases.map(swp => swp.sentenceNum)}
                        clickedSentenceIndex={this.state.clickedSentenceIndex}
                        handleClickSentence={this.handleClickSentence.bind(this)}
                    /></Col>
                    <Col><SavePhrasePanel 
                        appearance={this.state.clickedSentenceIndex !== NOT_SELECTED}
                        clickedSentenceId={this.state.clickedSentenceId}
                        clickedSentenceIndex={this.state.clickedSentenceIndex}
                        handlePhraseFormSubmit={this.handlePhraseFormSubmit.bind(this)}
                        clickedSentencePhrases={this.state.clickedSentencePhrases}
                    /></Col>
                </Row>
            </div>
        );
    }
}

// Use function wrapper to pass dynamic url params (use hook)
// Class component can't do it
const FilePage = () => <FilePageClass params={useParams()}/>;

export {FilePage};
  