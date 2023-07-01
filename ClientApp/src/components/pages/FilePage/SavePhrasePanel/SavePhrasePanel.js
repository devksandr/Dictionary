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
            phraseFormData: { categoryId: 1, phrase: '', meaning: '', comment: '' },
            phraseFormValidationError: { phrase: false, meaning: false }
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
        try {
            const response = await axios.get(ApiRequest.Categories.Get + Category.SentenceCategory);

            const sentenceCategoriesOptions = response.data.map(
                (category, index) => <option 
                    value={category.id}
                    key={index}
                >{category.name}</option>
            );

            this.setState({ sentenceCategories: sentenceCategoriesOptions});
        } catch (error) {
            alert('Unable to get sentence categories');
        }
    }

    handleClickPhrase(index, isAdd) {
        if(index === NOT_SELECTED) {
            this.setState({ clickedPhrase: { index: NOT_SELECTED, data: NOT_SELECTED, state: false } });
            this.resetPhraseFormData();
        }
        else if(isAdd) {
            this.setState({ clickedPhrase: { index: index, data: NOT_SELECTED, state: true } });
            this.resetPhraseFormData();
        }
        else {
            const clickedPhraseData = this.props.clickedSentencePhrases[index];
            this.setState({ clickedPhrase: { index: index, data: clickedPhraseData, state: true } });
            this.setState({ phraseFormData: { categoryId: clickedPhraseData.categoryId, phrase: clickedPhraseData.data, meaning: clickedPhraseData.meaning, comment: clickedPhraseData.comment } });
        }
        this.resetPhraseFormValidation();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState(prevState => ({ phraseFormData: { ...prevState.phraseFormData, [name]: value }}));
    }

    async handlePhraseFormSubmit(event) {
        event.preventDefault();

        this.resetPhraseFormValidation();
        let validateState = this.getPhraseFormValidateState();
        if(validateState.state) {
            const isAdd = this.state.clickedPhrase.data !== NOT_SELECTED ? false : true;
            const formData = this.fillPhraseFormData(isAdd);
            const response = await this.handleRequestPhraseFormSubmit(formData, isAdd);

            if(response.otherError) {
                // TODO handle exception for form phrase, server error
                return;
            }
            if(response.validation.state) {
                this.props.handlePhraseFormSubmit(response.data, formData, isAdd);
                this.resetPhraseFormData();
                return;
            }

            validateState = { state: false, data: response.validation.data};
        }
        this.validateAddPhraseForm(validateState.data);
    }

    resetPhraseFormData() {
        this.setState({ phraseFormData: { categoryId: 1, phrase: '', meaning: '', comment: '' } });
    }

    resetPhraseFormValidation() {
        this.setState({ phraseFormValidationError: { phrase: false, meaning: false } });
    }

    getPhraseFormValidateState() {
        const phrase = this.state.phraseFormData.phrase;
        const meaning = this.state.phraseFormData.meaning;
        let result = { state: true, data: { Phrase: false, Meaning: false }};

        if(!phrase || phrase.length < 3) {
            result = { ...result, state: false, data: { ...result.data, Phrase: true }};
        }
        if(!meaning) {
            result = { ...result, state: false, data: { ...result.data, Meaning : true }};
        }

        return result;
    }

    validateAddPhraseForm(formState) {
        if(formState.Phrase) {
            this.setState(prevState => ({ phraseFormValidationError: { ...prevState.phraseFormValidationError, phrase: true }}))
        }
        if(formState.Meaning) {
            this.setState(prevState => ({ phraseFormValidationError: { ...prevState.phraseFormValidationError, meaning: true }}))
        }
    }

    fillPhraseFormData(isAdd) {
        const formData = new FormData();
        formData.append("categoryId", this.state.phraseFormData.categoryId);
        formData.append("phrase", this.state.phraseFormData.phrase);
        formData.append("meaning", this.state.phraseFormData.meaning);
        formData.append("comment", this.state.phraseFormData.comment);

        if(isAdd) {
            formData.append("sentenceId", this.props.clickedSentenceId);
        }
        else {
            formData.append("phraseId", this.state.clickedPhrase.data.phraseId);
            formData.append("phraseMeaningId", this.state.clickedPhrase.data.phraseMeaningId);
        }

        return formData;
    }

    async handleRequestPhraseFormSubmit(formData, isAdd) {
        let result = { 
            data: null, 
            validation: { state: true, data: null },
            otherError: false
        };
        
        try {
            const response = isAdd ? await axios.post(ApiRequest.Phrases.Add, formData) : await axios.put(ApiRequest.Phrases.Update + Number(formData.get("phraseId")), formData);
            result = { ...result, data: response };
        } catch (error) {
            if(error.response.status == 400) {
                result = { ...result, validation: {state: false, data: error.response.data.errors }};
            }
            else {
                result = { ...result, otherError: true }
            }
        }
        return result;
    }

    render() {
        if(!this.props.appearance) return;
        const clickedSentencePhrasesData = this.props.clickedSentencePhrases.map(p => p.data);
        const isPhraseAdd = this.state.clickedPhrase.data === NOT_SELECTED;

        return (
            <div>
                <SelectPhrasePanel
                    clickedSentencePhrasesData={clickedSentencePhrasesData}
                    clickedPhraseIndex={this.state.clickedPhrase.index}
                    handleClickPhrase={this.handleClickPhrase.bind(this)}
                    localization={this.props.localization.panelSelectPhrase}
                />
                
                <AddPhrasePanel
                    appearance={this.state.clickedPhrase.state}
                    isPhraseAdd={isPhraseAdd}
                    sentenceCategories={this.state.sentenceCategories}
                    phraseFormData={this.state.phraseFormData}
                    phraseFormValidationError={this.state.phraseFormValidationError}
                    handleInputChange={this.handleInputChange.bind(this)}
                    handlePhraseFormSubmit={this.handlePhraseFormSubmit.bind(this)}
                    localization={this.props.localization.panelAddPhrase}
                />
            </div>
        );
    }
}