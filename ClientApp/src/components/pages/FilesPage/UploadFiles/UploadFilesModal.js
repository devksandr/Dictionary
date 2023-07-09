import React, {Component} from 'react';
import { Context } from '../../../ContextProvider';
import { DragAndDropFiles } from './DragAndDropFiles';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../../../css/pages/FilesPage/DragAndDropFiles.css';
import { Pages } from '../../../../js/const.js';

export class UploadFilesModal extends Component {
    static contextType = Context;
    constructor(props, context) {
        super(props, context);
        this.state = { 
            uploadButtonState: false
        };
        this.localization = this.context.localization.data[Pages.Files].modalAddFiles;
        this.handleToggleModalUploadFiles = this.handleToggleModalUploadFiles.bind(this);
        this.dndRef = React.createRef();
    }

    handleToggleModalUploadFiles() {
        this.setState({ uploadButtonState: false });
        this.props.handleToggleModalUploadFiles();
    }

    handleUpdateDropFilesCount(dropFilesCount) {
        this.setState({ uploadButtonState: dropFilesCount > 0 });
    }

    handleSubmitUploadFiles(dropfiles) {
        this.props.handleSubmitUploadFiles(dropfiles);
        this.handleToggleModalUploadFiles();
    }

    render() {
        const themeModalStyle = { backgroundColor: this.context.theme.type.backgroundColor };
        return (
                <Modal 
                    isOpen={this.props.modalUploadFilesState} 
                    toggle={this.handleToggleModalUploadFiles}
                    style={themeModalStyle}
                    className='modal-lg'>
                    <ModalHeader
                        style={themeModalStyle}
                        toggle={this.handleToggleModalUploadFiles}>
                        {this.localization.FilesAddModalHeaderAdd}
                    </ModalHeader>
                    <ModalBody 
                        style={themeModalStyle}>
                        <DragAndDropFiles 
                            ref={this.dndRef}
                            handleUpdateDropFilesCount={this.handleUpdateDropFilesCount.bind(this)}
                            text={this.localization.FilesAddModalTextDragAndDrop}
                            removeButtonText={this.localization.FilesAddModalButtonRemove}
                        />
                    </ModalBody>
                    <ModalFooter 
                        style={themeModalStyle}
                        className="justify-content-between">
                        <Button
                            color="primary"
                            disabled={!this.state.uploadButtonState}
                            onClick={() => this.handleSubmitUploadFiles(this.dndRef.current.state.dropfiles)}>
                            {this.localization.FilesAddModalButtonUpload}
                        </Button>{' '}
                        <Button
                            color="danger"
                            onClick={this.handleToggleModalUploadFiles}>
                            {this.localization.FilesAddModalButtonCancel}
                        </Button>
                    </ModalFooter>
                </Modal>
        );
    }
}