import React, {Component} from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export class AddSentencePanel extends Component {

    constructor(props) {
        super(props);
        this.handleAddPhrase = this.handleAddPhrase.bind(this);
        this.handlePhraseInput = this.handlePhraseInput.bind(this);

        this.state = {
            addPhrase: "",
        };
    }

    handlePhraseInput(event) {
        // validate phrase input
        this.setState({ addPhrase: event.target.value });
    }

    handleAddPhrase(event) {
        const formData = new FormData();
        formData.append("category", this.category.value);
        formData.append("phrase", this.state.addPhrase);
        formData.append("meaning", this.meaning.value);
        formData.append("comment", this.comment.value);
        this.props.handleAddPhrase(formData);
        event.preventDefault();
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
            <Form onSubmit={this.handleAddPhrase}>
                <FormGroup>
                    <Label for="categoryInput">Category</Label>
                    <Input 
                        type="select"
                        name="category" 
                        id="categoryInput"
                        innerRef={(v) => (this.category = v)}
                    >{sentenceCategoriesOptions}</Input>
                </FormGroup>
                <FormGroup>
                    <Label for="phraseInput">Phrase</Label>
                    <Input 
                        name="phrase" 
                        id="phraseInput"
                        onChange={this.handlePhraseInput}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="meaningInput">Meaning</Label>
                    <Input 
                        name="meaning"
                        id="meaningInput"
                        innerRef={(v) => (this.meaning = v)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="commentInput">Comment</Label>
                    <Input 
                        name="comment"
                        id="commentInput"
                        innerRef={(v) => (this.comment = v)}
                    />
                </FormGroup>
                <Button type="submit">Submit</Button>
            </Form>
        );
    }
}