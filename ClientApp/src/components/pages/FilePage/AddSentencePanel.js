import React, {Component} from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export class AddSentencePanel extends Component {

    constructor(props) {
        super(props);
    }

    onChangeCategory = (e) => {
    }

    render() {
        if(!this.props.appearance) return;
        
        const sentenceCategoriesOptions = this.props.sentenceCategories.map(
            (category, index) => <option 
                value={category.id}
                key={index}
            >{category.name}</option>
        );

        return (
            <Form>
                <FormGroup>
                    <Label for="categoryInput">Category</Label>
                    <Input 
                        type="select"
                        name="category" 
                        id="categoryInput"
                        onChange={this.onChangeCategory}
                    >{sentenceCategoriesOptions}</Input>
                </FormGroup>
                <FormGroup>
                    <Label for="phraseInput">Phrase</Label>
                    <Input name="phrase" id="phraseInput" />
                </FormGroup>
                <FormGroup>
                    <Label for="meaningInput">Meaning</Label>
                    <Input name="meaning" id="meaningInput" />
                </FormGroup>
                <FormGroup>
                    <Label for="commentInput">Comment</Label>
                    <Input name="comment" id="commentInput" />
                </FormGroup>
            </Form>
        );
    }
}