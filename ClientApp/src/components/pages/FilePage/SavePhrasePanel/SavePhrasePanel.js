import React, {Component} from 'react';
import { SelectPhrasePanel } from './SelectPhrasePanel';
import { AddPhrasePanel } from './AddPhrasePanel';
import { Category, ApiRequest, NOT_SELECTED } from '../../../../js/const.js';
import axios from "axios";
export class SavePhrasePanel extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            clickedPhrase: { index: NOT_SELECTED, data: NOT_SELECTED, state: false },
            sentenceCategories: [],
            phraseFormData: { categoryId: NOT_SELECTED, phrase: '', meaning: '', comment: '' }
        };
    }

    componentDidMount() {
        this.handleGetCategories();
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.clickedSentenceIndex !== this.props.clickedSentenceIndex) {
            this.setState({ clickedPhrase: { index: NOT_SELECTED, data: NOT_SELECTED, state: false } });
            this.resetPhraseFormData();
        }
    }

    async handleGetCategories() {
        const response = await axios.get(ApiRequest.Categories.Get + Category.SentenceCategory);

        const sentenceCategoriesOptions = response.data.map(
            (category, index) => <option 
                value={category.id}
                key={index}
            >{category.name}</option>
        );

        this.setState({ sentenceCategories: sentenceCategoriesOptions});
    }

    handleClickPhrase(index) {
        if(index === NOT_SELECTED) {
            this.setState({ clickedPhrase: { index: NOT_SELECTED, data: NOT_SELECTED, state: false } });
            this.resetPhraseFormData();
        }
        else {
            const clickedPhraseData = this.props.clickedSentencePhrases[index];
            this.setState({ clickedPhrase: { index: index, data: clickedPhraseData, state: true } });
            this.setState({ phraseFormData: { categoryId: clickedPhraseData.categoryId, phrase: clickedPhraseData.data, meaning: clickedPhraseData.meaning, comment: clickedPhraseData.comment } });
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState(prevState => ({ phraseFormData: { ...prevState.phraseFormData, [name]: value }}));
    }

    handlePhraseFormSubmit(event) {
        const formData = new FormData();
        formData.append("phraseId", this.state.clickedPhrase.data.id);
        formData.append("phraseMeaningId", this.state.clickedPhrase.data.phraseMeaningId);
        formData.append("sentenceId", this.props.clickedSentenceId);
        formData.append("categoryId", this.state.phraseFormData.categoryId);
        formData.append("phrase", this.state.phraseFormData.phrase);
        formData.append("meaning", this.state.phraseFormData.meaning);
        formData.append("comment", this.state.phraseFormData.comment);

        const isAdd = this.state.clickedPhrase.state ? false : true;
        this.props.handlePhraseFormSubmit(formData, isAdd);
        
        event.preventDefault();
        this.resetPhraseFormData();
    }

    resetPhraseFormData() {
        this.setState({ phraseFormData: { categoryId: NOT_SELECTED, phrase: '', meaning: '', comment: '' } });
    }

    render() {
        if(!this.props.appearance) return;
        const clickedSentencePhrasesData = this.props.clickedSentencePhrases.map(p => p.data);
        const submitButtonText = this.state.clickedPhrase.state ? 'Update' : 'Add';
        
        return (
            <div>
                <SelectPhrasePanel
                    clickedSentencePhrasesData={clickedSentencePhrasesData}
                    clickedPhraseIndex={this.state.clickedPhrase.index}
                    handleClickPhrase={this.handleClickPhrase.bind(this)}
                />
                
                <AddPhrasePanel
                    appearance={this.state.clickedPhrase.state}
                    sentenceCategories={this.state.sentenceCategories}
                    phraseFormData={this.state.phraseFormData}
                    submitButtonText={submitButtonText}
                    handleInputChange={this.handleInputChange.bind(this)}
                    handlePhraseFormSubmit={this.handlePhraseFormSubmit.bind(this)}
                />
            </div>
        );
    }
}