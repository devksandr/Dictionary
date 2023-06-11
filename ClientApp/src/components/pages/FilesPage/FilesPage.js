import React, { Component } from 'react';
import { FilesVector } from './FilesVector';
import { FileInput } from './FileInput';
import { UploadFilesModal } from './UploadFiles/UploadFilesModal';
import { Button } from 'reactstrap';
import axios from "axios";

export class FilesPage extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            fileNames: [],
            modalUploadFilesState: false
        };
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
                const newFileNames = response.data;
                this.setState({ fileNames: this.state.fileNames.concat(newFileNames) });
            }).catch(error => {
                alert('err');
            }
        );
    }

    handleOpenModalUploadFiles = () => this.setState({ modalUploadFilesState: true });
    handleToggleModalUploadFiles = () => this.setState({ modalUploadFilesState: !this.state.modalUploadFilesState });

    render() {
        return (
            <div>
                <h1>Files</h1>
                <p>Count : {this.state.fileNames.length}</p>
                <FileInput 
                    handleSubmit={this.handleSubmit.bind(this)}
                />
                <Button
                    color="primary"
                    onClick={this.handleOpenModalUploadFiles.bind(this)}>
                    Добавить
                </Button>
                <UploadFilesModal
                    modalUploadFilesState={this.state.modalUploadFilesState}
                    handleToggleModalUploadFiles={this.handleToggleModalUploadFiles.bind(this)}
                />
                <FilesVector 
                    vector={this.state.fileNames} 
                    handleDelete={this.handleDelete.bind(this)}
                />
            </div>
        );
    }
}