import React, {Component} from 'react';
import { PhraseLink } from './PhraseLink';
import { NOT_SELECTED } from '../../../js/const.js';

export class PhrasesVector extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            clickedPhraseId: NOT_SELECTED,
        };
    }

    handlePhraseClick(event, index) {
        let clickedPhraseId = this.state.clickedPhraseId === index ? NOT_SELECTED : index;
        this.setState({ clickedPhraseId: clickedPhraseId });
        this.props.clickPhrase(clickedPhraseId);
    }

    render() {
        const phrasesVector = this.props.vector.map(
            (phrase, index) => <PhraseLink 
                phrase={phrase}
                key={index} 
                handleDelete={this.props.handleDelete.bind(this)}
                clickPhrase={(e) => this.handlePhraseClick(e, index)}
            />
        );

        return (
            <div className='component-datavector'>
                <ul>{phrasesVector}</ul>
            </div>
        );
    }
}