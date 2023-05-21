import React, { Component } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import '../../../css/pages/FilePage/Sentence.css';
import { SENTENCE_NOT_SELECTED, Category } from '../../../js/const.js';
import { Row, Col } from 'reactstrap';
import { AddSentencePanel } from './AddSentencePanel';
import { FileSentences } from './FileSentences';

 class FilePageClass extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            file: {name: '', sentences: []},
            sentenceCategories: [],
            clickSentenceId: SENTENCE_NOT_SELECTED
        };
    }

    componentDidMount() {
        this.handleGetFile();
        this.handleGetCategories();
    }

    handleGetFile() {
        const { id } = this.props.params;
        const res = axios.get('api/files/' + id)
            .then(response => {
                this.setState({ file: response.data });
            }).catch(error => {
                alert('No file');
            }
        );
    }
    
    handleGetCategories() {
        const { id } = this.props.params;
        const res = axios.get('api/categories/' + Category.SentenceCategory)
            .then(response => {
                this.setState({ sentenceCategories: response.data});
            }).catch(error => {
                alert('No categories');
            }
        );
    }

    clickedSentence(sentenceId) {
        this.setState({ clickSentenceId: sentenceId });
    }

    render() {
        return (
            <div>
                <h1>File: {this.state.file.name}</h1>
                <Row>
                    <Col xs="9"><FileSentences 
                        sentences={this.state.file.sentences} 
                        clickedSentence={this.clickedSentence.bind(this)}
                    /></Col>
                    <Col><AddSentencePanel 
                        appearance={this.state.clickSentenceId != SENTENCE_NOT_SELECTED}
                        sentenceCategories={this.state.sentenceCategories}
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
  