import React, { Component } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import '../../../css/Theme.css';
import { NOT_SELECTED, ApiRequest, Pages } from '../../../js/const.js';
import { Row, Col } from 'reactstrap';
import { FileSentences } from './FileSentences';
import { SavePhrasePanel } from './SavePhrasePanel/SavePhrasePanel';

 class FilePageClass extends Component {
    constructor(props) {
        super(props);

        this.state = {
            localization: [],
            file: {name: '', sentences: []},
            sentencesWithPhrases: [],
            clickedSentenceIndex: NOT_SELECTED,
            clickedSentenceId: NOT_SELECTED,
            clickedSentencePhrases: []
        };
    }

    componentDidMount() {
        this.handleGetLocalization();
        this.handleGetFile();
    }

    async handleGetLocalization() {
        try {
            const response = await axios.get(ApiRequest.Localization.GetPage + Pages.File);
            this.setState({ localization: response.data });
        } catch (error) {
            alert('Unable to get localization');
        }
    }
    async handleGetFile() {
        try {
            const { id } = this.props.params;
            const response = await axios.get(ApiRequest.Files.Get + id);
            this.setState({ file: response.data });
            this.handleGetPhrasesForSentences(id);
        } catch (error) {
            alert('Unable to get file');
        }
    }
    async handleGetPhrasesForSentences(fileId) {
        try {
            const response = await axios.get(ApiRequest.Phrases.GetForSentence + fileId);
            this.setState({ sentencesWithPhrases: response.data});
        } catch (error) {
            alert('Unable to get phrases for file/sentences');
        }
    }

    handlePhraseFormSubmit(response, formData, isAdd) {
        isAdd ? this.handleResponseAddPhrase(response, formData) : this.handleResponseUpdatePhrase(formData);

        this.setState({ clickedSentenceIndex: NOT_SELECTED });
        this.setState({ clickedSentenceId: NOT_SELECTED });
        this.setState({ clickedSentencePhrases: [] });
    }
    handleResponseAddPhrase(response, formData) {
        // Set sentencesWithPhrases after Add new phrase (Add or Update)
        const newSentencePhrase = response.data;
        const newPhrase = { 
            phraseId: newSentencePhrase.phraseId,
            phraseMeaningId: newSentencePhrase.phraseMeaningId,
            categoryId: Number(formData.get("categoryId")), 
            data: formData.get("phrase"),
            comment: formData.get("comment"),
            meaning: formData.get("meaning"),
        };

        var sentenceWithPhrases = this.state.sentencesWithPhrases.filter(swp => swp.sentenceId === this.state.clickedSentenceId)
        
        if(sentenceWithPhrases.length > 0) {
            this.setState(state => {
                const sentencesWithPhrases = state.sentencesWithPhrases.map((swp) => {
                    if (swp.sentenceId === this.state.clickedSentenceId) {
                        const phrases = swp.phrases.concat(newPhrase)
                        swp.phrases = phrases;
                    }
                    return swp;
                });
                return sentencesWithPhrases;
            });
        }
        else {
            const newSentenceWithPhrase = { 
                sentenceId: this.state.clickedSentenceId, 
                sentenceNum: newSentencePhrase.sentenceNum,
                phrases: [newPhrase]
            };

            this.setState({ sentencesWithPhrases: this.state.sentencesWithPhrases.concat(newSentenceWithPhrase) });
        }
    }
    handleResponseUpdatePhrase(formData) {
        const phraseId = Number(formData.get("phraseId"));
        // Set sentencesWithPhrases after Update phrase
        this.setState(state => {
            const sentencesWithPhrases = state.sentencesWithPhrases.map((swp) => {
                if (swp.sentenceId === this.state.clickedSentenceId) {
                    const phrases = swp.phrases.map((phrase) => {
                        if(phrase.phraseId === phraseId) {
                            phrase.categoryId = Number(formData.get("categoryId"));
                            phrase.data = formData.get("phrase");
                            phrase.comment = formData.get("comment");
                            phrase.meaning = formData.get("meaning");
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

    handleClickSentence(sentenceIndex, sentenceId) {
        this.setState({ clickedSentenceIndex: sentenceIndex });
        this.setState({ clickedSentenceId: sentenceId });

        const clickedSentenceWithPhrases = this.state.sentencesWithPhrases.find(swp => swp.sentenceId === sentenceId);
        let clickedSentencePhrases = clickedSentenceWithPhrases !== undefined ? clickedSentenceWithPhrases.phrases : [];
        this.setState({ clickedSentencePhrases: clickedSentencePhrases });
    }

    render() {
        return (
            <div>
                <h1>{this.state.file.name}</h1>
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
                        localization={this.state.localization}
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
  