import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../../../../css/pages/FilePage/AddPhrasePanel.css';

export class AddPhrasePanel extends Component {
    render() {
        if(!this.props.appearance) return;  // TODO replace with another flag (by panel add/update)
        const submitButtonText = this.props.isPhraseAdd ? this.props.localization.FileAddPhrasePanelButtonAdd : this.props.localization.FileAddPhrasePanelButtonUpdate;
        
        return (
            <Form className='form-addPhrase' onSubmit={this.props.handlePhraseFormSubmit}>
                <FormGroup>
                    <Label for="categoryIdInput">{this.props.localization.FileAddPhrasePanelInputCategory}</Label>
                    <Input 
                        type="select"
                        name="categoryId" 
                        id="categoryIdInput"
                        onChange={this.props.handleInputChange}
                        value={this.props.phraseFormData.categoryId}
                    >{this.props.sentenceCategories}</Input>
                </FormGroup>
                <FormGroup>
                    <Label for="phraseInput">{this.props.localization.FileAddPhrasePanelInputPhrase}</Label>
                    <Input 
                        name="phrase" 
                        id="phraseInput"
                        innerRef={(v) => (this.phrase = v)}
                        onChange={this.props.handleInputChange}
                        value={this.props.phraseFormData.phrase}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="meaningInput">{this.props.localization.FileAddPhrasePanelInputMeaning}</Label>
                    <Input 
                        name="meaning"
                        id="meaningInput"
                        onChange={this.props.handleInputChange}
                        value={this.props.phraseFormData.meaning}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="commentInput">{this.props.localization.FileAddPhrasePanelInputComment}</Label>
                    <Input 
                        name="comment"
                        id="commentInput"
                        onChange={this.props.handleInputChange}
                        value={this.props.phraseFormData.comment}
                    />
                </FormGroup>
                <Button type="submit">{submitButtonText}</Button>
            </Form>
        );
    }
}