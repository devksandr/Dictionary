import React, {Component} from 'react';
import { Context } from '../../ContextProvider';
import { Pages } from '../../../js/const.js';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { makeUrlSlug } from '../../../js/functions.js';

export class FileLink extends Component {
    static contextType = Context;
    constructor(props, context) {
        super(props, context);

        this.state = { 
            modalDeleteFileState: false 
        };

        this.localization = this.context.localization.data[Pages.Files].modalRemoveFile;
    }

    toggleModalDeleteFile = () => this.setState({ modalDeleteFileState: !this.state.modalDeleteFileState });

    render() {
        const themeModalStyle = { backgroundColor: this.context.theme.type.backgroundColor };

        return (
            <li>
                <Button
                    color="danger"
                    onClick={this.toggleModalDeleteFile}
                >X</Button>
                <Link 
                    to={"/file/" + this.props.file.fileId + '/' + makeUrlSlug(this.props.file.name)} 
                    state={{mydata: "myvalue"}}
                    style={{ color: this.context.theme.type.fontColor }}
                >{this.props.file.name}</Link>

                <Modal 
                    isOpen={this.state.modalDeleteFileState} 
                    toggle={this.toggleModalDeleteFile}
                    style={themeModalStyle}
                >
                    <ModalHeader toggle={this.toggleModalDeleteFile} style={themeModalStyle}>{this.localization.FilesRemoveModalHeader}</ModalHeader>
                    <ModalBody style={themeModalStyle}>{this.localization.FilesRemoveModalText} '{this.props.file.name}'?</ModalBody>
                    <ModalFooter className="justify-content-between" style={themeModalStyle}>
                        <Button
                            color="danger"
                            onClick={() => this.props.handleDelete(this.props.file.fileId)}
                        >{this.localization.FilesRemoveModalButtonYes}</Button>{' '}
                        <Button
                            color="primary"
                            onClick={this.toggleModalDeleteFile}
                        >{this.localization.FilesRemoveModalButtonNo}</Button>
                    </ModalFooter>
                </Modal>
            </li>
        );
    }
}