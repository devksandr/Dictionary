import React, { Component } from 'react';
import { FilesVector } from './FilesVector';
import { UploadFilesModal } from './UploadFiles/UploadFilesModal';
import { Button } from 'reactstrap';
import axios from "axios";
import { Pages, ApiRequest } from '../../../js/const.js';

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
        this.handleGetFileNames();
    }

    async handleGetLocalization() {
        const response = await axios.get(ApiRequest.Localization.GetPage + Pages.Files);
        this.setState({ localization: response.data });
    }
    async handleGetFileNames() {
        const response = await axios.get(ApiRequest.Files.GetNames);
        this.setState({ fileNames: response.data });
    }
    async handleDelete(fileId) {
        await axios.delete(ApiRequest.Files.Delete + fileId);
        this.setState({ fileNames: [...this.state.fileNames].filter((id) => id.id !== fileId) });
    }
    async handleSubmit(formData) {
        const response = await axios.post(ApiRequest.Files.Add, formData);
        const newFileNames = response.data;
        this.setState({ fileNames: this.state.fileNames.concat(newFileNames) });
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