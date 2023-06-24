import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../../../../css/pages/FilePage/AddPhrasePanel.css';
import { Category, ApiRequest, NOT_SELECTED } from '../../../../js/const.js';
import axios from "axios";

export class AddPhrasePanel extends Component {
    render() {
        if(!this.props.appearance) return;  // replace with another flag (by panel add/update)

        return (
            <Form className='form-addPhrase' onSubmit={this.props.handleAddPhraseSubmit}>
                <FormGroup>
                    <Label for="categoryIdInput">Category</Label>
                    <Input 
                        type="select"
                        name="categoryId" 
                        id="categoryIdInput"
                        onChange={this.props.handleInputChange}
                        value={this.props.phraseFormData.categoryId}
                    >{this.props.sentenceCategories}</Input>
                </FormGroup>
                <FormGroup>
                    <Label for="phraseInput">Phrase</Label>
                    <Input 
                        name="phrase" 
                        id="phraseInput"
                        innerRef={(v) => (this.phrase = v)}
                        onChange={this.props.handleInputChange}
                        value={this.props.phraseFormData.phrase}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="meaningInput">Meaning</Label>
                    <Input 
                        name="meaning"
                        id="meaningInput"
                        onChange={this.props.handleInputChange}
                        value={this.props.phraseFormData.meaning}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="commentInput">Comment</Label>
                    <Input 
                        name="comment"
                        id="commentInput"
                        onChange={this.props.handleInputChange}
                        value={this.props.phraseFormData.comment}
                    />
                </FormGroup>
                <Button type="submit">{this.props.submitButtonText}</Button>
            </Form>
        );
    }
}