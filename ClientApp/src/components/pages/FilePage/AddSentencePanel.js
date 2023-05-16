import React, {Component} from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export class AddSentencePanel extends Component {

    constructor(props) {
        super(props);
        
    }

    render() {
        if(!this.props.appearance) return;
        return (
            <Form>
                <FormGroup>
                    <Label for="categoryInput">Category</Label>
                    <Input type="select" name="category" id="categoryInput" />
                </FormGroup>
                <FormGroup>
                    <Label for="phraseInput">Phrase</Label>
                    <Input type="select" name="phrase" id="phraseInput" />
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