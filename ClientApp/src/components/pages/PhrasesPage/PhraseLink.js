import React, {Component} from 'react';
import { Context } from '../../ContextProvider';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class PhraseLink extends Component {
    static contextType = Context;
    constructor(props, context) {
        super(props, context);
        this.state = { 
            modalDeletePhraseState: false 
        };
    }

    toggleModalDeletePhrase = () => this.setState({ modalDeletePhraseState: !this.state.modalDeletePhraseState });

    render() {
        const themeModalStyle = { backgroundColor: this.context.theme.type.backgroundColor };

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
                    style={themeModalStyle}
                >
                    <ModalHeader toggle={this.toggleModalDeletePhrase} style={themeModalStyle}>Удаление фразы</ModalHeader>
                    <ModalBody style={themeModalStyle}>Вы действительно хотите удалить фразу '{this.props.phrase.data}'?</ModalBody>
                    <ModalFooter className="justify-content-between" style={themeModalStyle}>
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