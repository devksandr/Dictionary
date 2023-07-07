import React, {Component} from 'react';
import { Context } from '../../../ContextProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../../../../css/pages/FilePage/AddPhrasePanel.css';
import '../../../../css/pages/FilePage/AddPhraseValidation.css';
import { Pages } from '../../../../js/const.js';

const MIN_PHRASE_LENGTH = 3;
const MAX_PHRASE_LENGTH = 128;
const MAX_MEANING_LENGTH = 128;
const MAX_COMMENT_LENGTH = 255;

export class AddPhrasePanel extends Component {
    static contextType = Context;
    constructor(props, context) {
        super(props, context);

        this.localization = this.context.localization.data[Pages.File].panelAddPhrase;
    }

    createValidationElement = (element, text) => element ? <p className='text-formValidation'>{text}</p> : null;

    render() {
        if(!this.props.appearance) return;  // TODO replace with another flag (by panel add/update)
        const submitButtonText = this.props.isPhraseAdd ? this.localization.FileAddPhrasePanelButtonAdd : this.localization.FileAddPhrasePanelButtonUpdate;
        const phraseValidation = this.createValidationElement(this.props.phraseFormValidationError.phrase, this.localization.FileAddPhrasePanelInputValidationPhrase + ' [' + MIN_PHRASE_LENGTH + '...' + MAX_PHRASE_LENGTH + ']');
        const meaningValidation = this.createValidationElement(this.props.phraseFormValidationError.meaning, this.localization.FileAddPhrasePanelInputValidationMeaning + ' ' + MAX_MEANING_LENGTH);
        const commentValidation = this.createValidationElement(this.props.phraseFormValidationError.comment, this.localization.FileAddPhrasePanelInputValidationComment + ' ' + MAX_COMMENT_LENGTH );

        return (
            <Form className='form-addPhrase' onSubmit={this.props.handlePhraseFormSubmit}>
                <FormGroup>
                    <Label for="categoryIdInput">{this.localization.FileAddPhrasePanelInputCategory}</Label>
                    <Input 
                        type="select"
                        name="categoryId" 
                        id="categoryIdInput"
                        onChange={this.props.handleInputChange}
                        value={this.props.phraseFormData.categoryId}
                    >{this.props.sentenceCategories}</Input>
                </FormGroup>
                <FormGroup>
                    <Label for="phraseInput">{this.localization.FileAddPhrasePanelInputPhrase}</Label>
                    <Input 
                        name="phrase" 
                        id="phraseInput"
                        innerRef={(v) => (this.phrase = v)}
                        onChange={this.props.handleInputChange}
                        value={this.props.phraseFormData.phrase}
                    />
                    {phraseValidation}
                </FormGroup>
                <FormGroup>
                    <Label for="meaningInput">{this.localization.FileAddPhrasePanelInputMeaning}</Label>
                    <Input 
                        name="meaning"
                        id="meaningInput"
                        onChange={this.props.handleInputChange}
                        value={this.props.phraseFormData.meaning}
                    />
                    {meaningValidation}
                </FormGroup>
                <FormGroup>
                    <Label for="commentInput">{this.localization.FileAddPhrasePanelInputComment}</Label>
                    <Input 
                        name="comment"
                        id="commentInput"
                        onChange={this.props.handleInputChange}
                        value={this.props.phraseFormData.comment}
                    />
                    {commentValidation}
                </FormGroup>
                <Button type="submit">{submitButtonText}</Button>
            </Form>
        );
    }
}