import React, { Component } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import '../../../css/pages/FilePage/Sentence.css';
import { SENTENCE_NOT_SELECTED, Category } from '../../../js/const.js';
import { Row, Col } from 'reactstrap';
import { AddPhrasePanel } from './AddPhrasePanel';
import { FileSentences } from './FileSentences';

 class FilePageClass extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            file: {name: '', sentences: []},
            sentencePhrases: [],
            sentenceCategories: [],
            clickedSentenceIndex: SENTENCE_NOT_SELECTED,
            clickedSentenceId: SENTENCE_NOT_SELECTED
        };
    }

    componentDidMount() {
        this.handleGetFile();
        this.handleGetCategories();
    }

    handleGetFile() {
        const { id } = this.props.params;
        axios.get('api/files/' + id)
            .then(response => {
                this.setState({ file: response.data });
                const fileId = response.data.id;
                this.handleGetPhrases(fileId);
            }).catch(error => {
                alert('No file');
            }
        );
    }
    
    handleGetPhrases(fileId) {
        axios.get('api/phrases/file/' + fileId)
            .then(response => {
                this.setState({ sentencePhrases: response.data});
            }).catch(error => {
                alert('No file phrases');
            }
        );
    }

    handleGetCategories() {
        axios.get('api/categories/' + Category.SentenceCategory)
            .then(response => {
                this.setState({ sentenceCategories: response.data});
            }).catch(error => {
                alert('No categories');
            }
        );
    }

    handleClickSentence(sentenceIndex, sentenceId) {
        this.setState({ clickedSentenceIndex: sentenceIndex });
        this.setState({ clickedSentenceId: sentenceId });
    }

    handleAddPhrase(formData) {
        axios.post('api/phrases', formData)
            .then(response => {
                this.setState({ clickedSentenceIndex: SENTENCE_NOT_SELECTED });
                this.setState({ clickedSentenceId: SENTENCE_NOT_SELECTED });
            }).catch(error => {
                alert('err');
            }
        );
    }

    render() {
        return (
            <div>
                <h1>File: {this.state.file.name}</h1>
                <Row>
                    <Col xs="9"><FileSentences 
                        sentences={this.state.file.sentences}
                        sentencePhrases={this.state.sentencePhrases}
                        clickedSentenceIndex={this.state.clickedSentenceIndex}
                        handleClickSentence={this.handleClickSentence.bind(this)}
                    /></Col>
                    <Col><AddPhrasePanel 
                        appearance={this.state.clickedSentenceIndex !== SENTENCE_NOT_SELECTED}
                        clickedSentenceId={this.state.clickedSentenceId}
                        sentenceCategories={this.state.sentenceCategories}
                        handleAddPhrase={this.handleAddPhrase.bind(this)}
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
  