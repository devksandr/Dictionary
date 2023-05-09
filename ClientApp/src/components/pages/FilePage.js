import React, { Component } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

 class FilePageClass extends Component {

    constructor(props) {
        super(props);
        this.state = { file: {name: '', sentences: []} };
    }

    componentDidMount() {
        this.GetFile();
    }

    render() {
        const sentences = this.state.file.sentences.map((sentence, index) => {
            return (
                <div key={index}>
                    <p>{sentence}</p>
                </div>
            );
        });
        
        return (
            <div>
                <h1>File: {this.state.file.name}</h1>
                {sentences}
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
  