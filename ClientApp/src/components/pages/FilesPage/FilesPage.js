import React, { Component } from 'react';
import { DataVector } from './DataVector';
import { FileInput } from './FileInput';
import axios from "axios";

export class FilesPage extends Component {

    constructor(props) {
        super(props);
        this.state = { fileNames: [] };
    }

    componentDidMount() {
        this.handleGetFiles();
    }

    handleGetFiles() {
        axios.get('api/files/')
            .then(response => {
                const data = response.data;
                this.setState({ fileNames: data });
            }
        );
    }
    handleDelete(fileId) {
        axios.delete('api/files/' + fileId)
            .then(response => {
                // todo modal
                this.setState({
                    fileNames: [...this.state.fileNames].filter((id) => id.id !== fileId),
                });
            }).catch(error => {
                alert('error when deleting');
            }
        );
    }
    handleSubmit(formData) {
        axios.post('api/files', formData)
            .then(response => {
                const files = response.data;
                this.setState({ fileNames: this.state.fileNames.concat(files) });
            }).catch(error => {
                alert('err');
            }
        );
    }

    render() {
        return (
            <div>
                <h1>Files</h1>
                <p>Count : {this.state.fileNames.length}</p>
                <FileInput 
                    handleSubmit={this.handleSubmit.bind(this)}
                />
                <DataVector 
                    vector={this.state.fileNames} 
                    handleDelete={this.handleDelete.bind(this)}
                />
            </div>
        );
    }
}