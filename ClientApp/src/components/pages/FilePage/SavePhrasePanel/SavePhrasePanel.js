import React, {Component} from 'react';
import { SelectPhrasePanel } from './SelectPhrasePanel';
import { AddPhrasePanel } from './AddPhrasePanel';
import { NOT_SELECTED } from '../../../../js/const.js';

export class SavePhrasePanel extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            clickedPhraseIndex: NOT_SELECTED,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.clickedSentenceIndex !== this.props.clickedSentenceIndex) {
            this.setState({ clickedPhraseIndex: NOT_SELECTED });
        }
    }

    handleClickPhrase(index) {
        this.setState({ clickedPhraseIndex: index });
    }

    render() {
        if(!this.props.appearance) return;
        
        return (
            <div>
                <SelectPhrasePanel
                    clickedSentencePhrases={this.props.clickedSentencePhrases}
                    clickedPhraseIndex={this.state.clickedPhraseIndex}
                    handleClickPhrase={this.handleClickPhrase.bind(this)}
                />
                <AddPhrasePanel 
                    appearance={this.props.appearance}
                    clickedSentenceId={this.props.clickedSentenceId}
                    sentenceCategories={this.props.sentenceCategories}
                    handleAddPhrase={this.props.handleAddPhrase}
                />
            </div>
        );
    }
}