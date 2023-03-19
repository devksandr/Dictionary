import React, { Component } from 'react';
import { DataVector } from '../DataVector';
import { FileInput } from '../FileInput';

export class FilesPage extends Component {

    constructor(props) {
        super(props);
        this.state = { fileNames: [] };
    }

    componentDidMount() {
        this.GetFilesNames();
    }

    render() {
        return (
            <div>
                <h1>Files</h1>
                <p>Count : {this.state.fileNames.length}</p>
                <DataVector vector={this.state.fileNames} />
                <FileInput />
            </div>
        );
    }

    async GetFilesNames() {
        const response = await fetch('api/files');
        const data = await response.json();
        this.setState({ fileNames: data });
    }
}