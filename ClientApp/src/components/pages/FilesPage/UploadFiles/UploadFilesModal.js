import React, {Component} from 'react';
import { DragAndDropFiles } from './DragAndDropFiles';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../../../css/pages/FilesPage/DragAndDropFiles.css';

export class UploadFilesModal extends Component {

    constructor(props) {
        super(props);
        this.handleToggleModalUploadFiles = this.handleToggleModalUploadFiles.bind(this);
    }

    handleToggleModalUploadFiles() {
        this.props.handleToggleModalUploadFiles();
    }

    handleSubmitUploadFiles() {
        // TODO
    }

    render() {
        return (
                <Modal 
                    isOpen={this.props.modalUploadFilesState} 
                    toggle={this.handleToggleModalUploadFiles}
                    className='modal-lg'>
                    <ModalHeader 
                        toggle={this.handleToggleModalUploadFiles}>
                        headdddder
                    </ModalHeader>
                    <ModalBody>
                        <DragAndDropFiles 
                            handleSubmitUploadFiles={this.handleSubmitUploadFiles.bind(this)} 
                        />
                    </ModalBody>
                    <ModalFooter className="justify-content-between">
                        <p>fffooter</p>
                    </ModalFooter>
                </Modal>
        );
    }
}