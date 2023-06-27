import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NOT_SELECTED } from '../../../js/const.js';

export class PhraseLink extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            modalDeletePhraseState: false 
        };
    }

    toggleModalDeletePhrase = () => this.setState({ modalDeletePhraseState: !this.state.modalDeletePhraseState });

    render() {
        return (
            <li>
                <Button
                    color="danger"
                    onClick={this.toggleModalDeletePhrase}
                >X</Button>
                <p
                    onClick={this.props.clickPhrase}
                >{this.props.phrase.data}</p>
                

                <Modal 
                    isOpen={this.state.modalDeletePhraseState} 
                    toggle={this.toggleModalDeletePhrase}
                >
                    <ModalHeader toggle={this.toggleModalDeletePhrase}>Удаление фразы</ModalHeader>
                    <ModalBody>Вы действительно хотите удалить фразу '{this.props.phrase.data}'?</ModalBody>
                    <ModalFooter className="justify-content-between">
                        <Button
                            color="danger"
                            onClick={() => this.props.handleDelete(this.props.phrase.phraseId)}
                        >Да</Button>{' '}
                        <Button
                            color="primary"
                            onClick={this.toggleModalDeletePhrase}
                        >Нет</Button>
                    </ModalFooter>
                </Modal>
            </li>
        );
    }
}