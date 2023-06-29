import React, {Component} from 'react';
import { DragAndDropFiles } from './DragAndDropFiles';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../../../css/pages/FilesPage/DragAndDropFiles.css';

export class UploadFilesModal extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            uploadButtonState: false
        };

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
        return (
                <Modal 
                    isOpen={this.props.modalUploadFilesState} 
                    toggle={this.handleToggleModalUploadFiles}
                    className='modal-lg'>
                    <ModalHeader 
                        toggle={this.handleToggleModalUploadFiles}>
                        {this.props.localization.FilesAddModalHeaderAdd}
                    </ModalHeader>
                    <ModalBody>
                        <DragAndDropFiles 
                            ref={this.dndRef}
                            handleUpdateDropFilesCount={this.handleUpdateDropFilesCount.bind(this)}
                            text={this.props.localization.FilesAddModalTextDragAndDrop}
                            removeButtonText={this.props.localization.FilesAddModalButtonRemove}
                        />
                    </ModalBody>
                    <ModalFooter className="justify-content-between">
                        <Button
                            color="primary"
                            disabled={!this.state.uploadButtonState}
                            onClick={() => this.handleSubmitUploadFiles(this.dndRef.current.state.dropfiles)}>
                            {this.props.localization.FilesAddModalButtonUpload}
                        </Button>{' '}
                        <Button
                            color="danger"
                            onClick={this.handleToggleModalUploadFiles}>
                            {this.props.localization.FilesAddModalButtonCancel}
                        </Button>
                    </ModalFooter>
                </Modal>
        );
    }
}