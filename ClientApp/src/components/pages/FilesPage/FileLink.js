import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class FileLink extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            modalDeleteFileState: false 
        };
    }

    toggleModalDeleteFile = () => this.setState({ modalDeleteFileState: !this.state.modalDeleteFileState });

    render() {
        return (
            <li>
                <Button
                    color="danger"
                    onClick={this.toggleModalDeleteFile}
                >X</Button>
                <Link 
                    to={"/file/" + this.props.file.id} 
                    state={{mydata: "myvalue"}}
                >{this.props.file.name}</Link>

                <Modal 
                    isOpen={this.state.modalDeleteFileState} 
                    toggle={this.toggleModalDeleteFile}
                >
                    <ModalHeader toggle={this.toggleModalDeleteFile}>Удаление файла</ModalHeader>
                    <ModalBody>Вы действительно хотите удалить файл '{this.props.file.name}'?</ModalBody>
                    <ModalFooter className="justify-content-between">
                        <Button
                            color="danger"
                            onClick={() => this.props.handleDelete(this.props.file.id)}
                        >Да</Button>{' '}
                        <Button
                            color="primary"
                            onClick={this.toggleModalDeleteFile}
                        >Нет</Button>
                    </ModalFooter>
                </Modal>
            </li>
        );
    }
}