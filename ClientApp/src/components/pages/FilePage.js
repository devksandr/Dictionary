import React, { Component } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import '../../css/pages/FilePage/Sentence.css';
import { Container, Row, Col } from 'reactstrap';

const SENTENCE_NOT_SELECTED = -1;

 class FilePageClass extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            file: {name: '', sentences: []},
            hoverSentenceId: SENTENCE_NOT_SELECTED
        };
    }

    componentDidMount() {
        this.GetFile();
    }

    handleMouseEnter(event, index) {
        this.setState({ hoverSentenceId: index });
    }
    handleMouseLeave(event, index) {
        this.setState({ hoverSentenceId: SENTENCE_NOT_SELECTED });
    }

    render() {
        const sentences = this.state.file.sentences.map((sentence, index) => {
            return (
                <span 
                    key={index}
                    className={this.state.hoverSentenceId==index ? 'sentence-hover' : ''}
                    onMouseLeave={(e) => this.handleMouseLeave(e, index)}
                    onMouseEnter={(e) => this.handleMouseEnter(e, index)}>
                    {sentence}
                </span>
            );
        });
        
        return (
            <div>
                <h1>File: {this.state.file.name}</h1>
                
                <Row>
                    <Col xs="9">{sentences}</Col>
                    <Col>TODO Sentence menu when click</Col>
                </Row>
            </div>
        );
    }

    GetFile() {
        const { id } = this.props.params;
        const res = axios.get('api/files/' + id)
            .then(response => {
                this.setState({ file: response.data });
            }).catch(error => {
                alert('No file');
            });
    }
}

// Use function wrapper to pass dynamic url params (use hook)
// Class component can't do it
const FilePage = () => <FilePageClass params={useParams()}/>;

export {FilePage};
  