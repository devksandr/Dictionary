import React, { Component } from 'react';
import { Context } from '../../ContextProvider';
import { Pages, ApiRequest, NotificationType } from '../../../js/const.js';
import { FilesVector } from './FilesVector';
import { UploadFilesModal } from './UploadFiles/UploadFilesModal';
import { Button } from 'reactstrap';
import axios from "axios";

export class FilesPage extends Component {
    static contextType = Context;
    constructor(props, context) {
        super(props, context);
        this.state = { 
            filesInfo: [],
            modalUploadFilesState: false
        };
        this.localization = this.context.localization.data[Pages.Files];
    }

    componentDidMount() {
        this.handleGetFilesInfo();
    }

    async handleGetFilesInfo() {
        try {
            const response = await axios.get(ApiRequest.Files.GetAllFilesInfo);
            this.setState({ filesInfo: response.data });
        } catch (error) {
            this.context.notification.showNotification(NotificationType.Error, this.localization.notification.FilesNotificationErrorGetFilesList);
        }
    }
    async handleDelete(fileId) {
        try {
            await axios.delete(ApiRequest.Files.Delete + fileId);
            this.setState({ filesInfo: [...this.state.filesInfo].filter((f) => f.fileId !== fileId) });
            this.context.notification.showNotification(NotificationType.Success, this.localization.notification.FilesNotificationModalDelete);
        } catch (error) {
            this.context.notification.showNotification(NotificationType.Error, this.localization.notification.FilesNotificationModalDeleteError);
        }
    }
    async handleRequestFilesAddSubmit(formData) {
        let result = { 
            data: null, 
            validation: { state: true, data: null },
            otherError: false
        };
        
        try {
            const response = await axios.post(ApiRequest.Files.Add, formData);
            result = { ...result, data: response.data };
        } catch (error) {
            if(error.response.status === 400) {
                result = { ...result, validation: {state: false, data: error.response.data.errors }};
            }
            else {
                result = { ...result, otherError: true }
            }
        }
        return result;
    }

    handleOpenModalUploadFiles = () => this.setState({ modalUploadFilesState: true });
    handleToggleModalUploadFiles = () => this.setState({ modalUploadFilesState: !this.state.modalUploadFilesState });

    async handleSubmitUploadFiles(dropFiles) {
        let validateState = this.getDropFilesValidateState(dropFiles);
        if(validateState.state) {
            const files = dropFiles;
            const formData = new FormData();
            for (var i = 0; i < files.length; i++) {
                formData.append("formFiles", files[i]);
            }
            const response = await this.handleRequestFilesAddSubmit(formData);
    
            if(response.otherError) {
                // TODO handle exception
                this.context.notification.showNotification(NotificationType.Error, this.localization.notification.FilesNotificationModalAddError);
                return;
            }
            if(response.validation.state) {
                const newFilesInfo = response.data;
                this.setState({ filesInfo: this.state.filesInfo.concat(newFilesInfo) });
                this.context.notification.showNotification(NotificationType.Success, this.localization.notification.FilesNotificationModalAdd);
                return;
            }

            validateState = { state: false, data: response.validation.data};
        }

        this.handleValidationErrorForAddFilesSubmit(validateState);
    }

    handleValidationErrorForAddFilesSubmit(validateState) {
        this.context.notification.showNotification(NotificationType.Warning, this.localization.notification.FilesNotificationModalAddSubmitDuplicate);
    }

    getDropFilesValidateState(dropfiles) {
        const duplicateState = this.validateDuplicatesUploadDropFiles(dropfiles);
        let result = { state: true, data: { Duplicate: false, MaxSize: false, MaxName: false }};

        if(!duplicateState) {
            result = { ...result, state: false, data: { ...result.data, Duplicate: true }};
        }
        // ...

        return result;
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
        return (
            <div>
                <h1>{this.localization.body.FilesList}</h1>
                <p>{this.localization.body.FilesCount} : {this.state.filesInfo.length}</p>
                <Button
                    color="primary"
                    onClick={this.handleOpenModalUploadFiles.bind(this)}>
                    {this.localization.body.AddFiles}
                </Button>
                <UploadFilesModal
                    modalUploadFilesState={this.state.modalUploadFilesState}
                    handleToggleModalUploadFiles={this.handleToggleModalUploadFiles.bind(this)}
                    handleSubmitUploadFiles={this.handleSubmitUploadFiles.bind(this)}
                />
                <FilesVector 
                    vector={this.state.filesInfo} 
                    handleDelete={this.handleDelete.bind(this)}
                />
            </div>
        );
    }
}