import React, {Component} from 'react';
import { NOT_SELECTED } from '../../../js/const.js';

export class FileSentences extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            hoverSentenceId: NOT_SELECTED,
        };
    }

    handleMouseEnter(event, index) {
        this.setState({ hoverSentenceId: index });
    }
    handleMouseLeave(event, index) {
        this.setState({ hoverSentenceId: NOT_SELECTED });
    }
    handleClick(event, index, sentenceId) {
        let clickedSentenceIndex = this.props.clickedSentenceIndex === index ? NOT_SELECTED : index;
        this.props.handleClickSentence(clickedSentenceIndex, sentenceId);
    }
    
    render() {
        const sentences = this.props.sentences.map((sentence, index) => {
            const hoverClass = this.state.hoverSentenceId===index ? 'element-hover-theme' : '';
            const clickClass = this.props.clickedSentenceIndex===index ? 'element-click-theme' : '';
            const hasPhraseClass = this.props.sentencesWithPhrasesIndexes.some(i => i === index) ? 'element-hasData-theme' : '';
            
            return (
                <span 
                    key={index}
                    className={`${hoverClass} ${clickClass} ${hasPhraseClass}`}
                    onMouseLeave={(e) => this.handleMouseLeave(e, index)}
                    onMouseEnter={(e) => this.handleMouseEnter(e, index)}
                    onClick={(e) => this.handleClick(e, index, sentence.sentenceId)}>
                    {sentence.data}
                </span>
            );
        });

        return sentences
    }
}