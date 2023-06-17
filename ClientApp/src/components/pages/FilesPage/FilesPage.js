import React, { Component } from 'react';
import { FilesVector } from './FilesVector';
import { UploadFilesModal } from './UploadFiles/UploadFilesModal';
import { Button } from 'reactstrap';
import axios from "axios";
import { Pages } from '../../../js/const.js';

export class FilesPage extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            localization: [],
            fileNames: [],
            modalUploadFilesState: false
        };
    }

    componentDidMount() {
        this.handleGetLocalization();
        this.handleGetFiles();
    }

    handleGetLocalization() {
        axios.get('api/localization/page/' + Pages.Files)
            .then(response => {
                const data = response.data;
                this.setState({ localization: data });
            }
        );
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

    handleSubmitUploadFiles(dropFiles) {
        if(!this.validateDuplicatesUploadDropFiles(dropFiles)) {
            alert('Duplicate found. Upload canceled');
            return;
        }

        const files = dropFiles;
        const formData = new FormData();
        for (var i = 0; i < files.length; i++) {
            formData.append("formFiles", files[i]);
        }
        this.handleSubmit(formData);
    }

    validateDuplicatesUploadDropFiles(dropfiles) {
        let currentfiles = this.state.fileNames;
        for (let i = 0; i < dropfiles.length; i++) {
            for (let j = 0; j < currentfiles.length; j++) {
                if(dropfiles[i].name === currentfiles[j].name) {
                    return false;
                }
            }
        }
        return true;
    }

    render() {
        return (
            <div>
                <h1>{this.state.localization.FilesList}</h1>
                <p>{this.state.localization.FilesCount} : {this.state.fileNames.length}</p>
                <Button
                    color="primary"
                    onClick={this.handleOpenModalUploadFiles.bind(this)}>
                    {this.state.localization.AddFiles}
                </Button>
                <UploadFilesModal
                    modalUploadFilesState={this.state.modalUploadFilesState}
                    handleToggleModalUploadFiles={this.handleToggleModalUploadFiles.bind(this)}
                    handleSubmitUploadFiles={this.handleSubmitUploadFiles.bind(this)}
                />
                <FilesVector 
                    vector={this.state.fileNames} 
                    handleDelete={this.handleDelete.bind(this)}
                />
            </div>
        );
    }
}