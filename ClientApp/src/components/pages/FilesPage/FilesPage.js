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
            filesInfo: [],
            modalUploadFilesState: false
        };
    }

    componentDidMount() {
        this.handleGetLocalization();
        this.handleGetFilesInfo();
    }

    async handleGetLocalization() {
        try {
            const response = await axios.get(ApiRequest.Localization.GetPage + Pages.Files);
            this.setState({ localization: response.data });
        } catch (error) {
            alert('Unable to get localization');
        }
    }
    async handleGetFilesInfo() {
        try {
            const response = await axios.get(ApiRequest.Files.GetAllFilesInfo);
            this.setState({ filesInfo: response.data });
        } catch (error) {
            alert('Unable to get files info');
        }
    }
    async handleDelete(fileId) {
        try {
            await axios.delete(ApiRequest.Files.Delete + fileId);
            this.setState({ filesInfo: [...this.state.filesInfo].filter((f) => f.fileId !== fileId) });
        } catch (error) {
            alert('Unable to delete file');
        }
    }
    async handleSubmit(formData) {
        try {
            const response = await axios.post(ApiRequest.Files.Add, formData);
            const newFilesInfo = response.data;
            this.setState({ filesInfo: this.state.filesInfo.concat(newFilesInfo) });
        } catch (error) {
            alert('Unable to create file');
        }
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
        let currentfiles = this.state.filesInfo;
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
        if(this.state.localization.length === 0) return;

        return (
            <div>
                <h1>{this.state.localization.body.FilesList}</h1>
                <p>{this.state.localization.body.FilesCount} : {this.state.filesInfo.length}</p>
                <Button
                    color="primary"
                    onClick={this.handleOpenModalUploadFiles.bind(this)}>
                    {this.state.localization.body.AddFiles}
                </Button>
                <UploadFilesModal
                    modalUploadFilesState={this.state.modalUploadFilesState}
                    handleToggleModalUploadFiles={this.handleToggleModalUploadFiles.bind(this)}
                    handleSubmitUploadFiles={this.handleSubmitUploadFiles.bind(this)}
                    localization={this.state.localization.modal}
                />
                <FilesVector 
                    vector={this.state.filesInfo} 
                    handleDelete={this.handleDelete.bind(this)}
                />
            </div>
        );
    }
}