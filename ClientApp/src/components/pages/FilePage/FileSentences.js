import React, {Component} from 'react';
import { SENTENCE_NOT_SELECTED } from '../../../js/const.js';

export class FileSentences extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            hoverSentenceId: SENTENCE_NOT_SELECTED,
        };
    }

    handleMouseEnter(event, index) {
        this.setState({ hoverSentenceId: index });
    }
    handleMouseLeave(event, index) {
        this.setState({ hoverSentenceId: SENTENCE_NOT_SELECTED });
    }
    handleClick(event, index, sentenceId) {
        let clickedSentenceIndex = this.props.clickedSentenceIndex == index ? SENTENCE_NOT_SELECTED : index;
        this.props.handleClickSentence(clickedSentenceIndex, sentenceId);
    }
    
    render() {
        const sentences = this.props.sentences.map((sentence, index) => {
            const hoverClass = this.state.hoverSentenceId==index ? 'sentence-hover' : '';
            const clickClass = this.props.clickedSentenceIndex==index ? 'sentence-click' : '';

            return (
                <span 
                    key={index}
                    className={`${hoverClass} ${clickClass}`}
                    onMouseLeave={(e) => this.handleMouseLeave(e, index)}
                    onMouseEnter={(e) => this.handleMouseEnter(e, index)}
                    onClick={(e) => this.handleClick(e, index, sentence.id)}>
                    {sentence.data}
                </span>
            );
        });

        return sentences
    }
}