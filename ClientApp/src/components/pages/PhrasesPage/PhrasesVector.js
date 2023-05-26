import React, {Component} from 'react';
import { PhraseLink } from './PhraseLink';

export class PhrasesVector extends Component {
    render() {
        const phrasesVector = this.props.vector.map(
            (phrase, index) => <PhraseLink 
                phrase={phrase}
                key={index} 
                handleDelete={this.props.handleDelete.bind(this)}
            />
        );

        return (
            <div className='component-datavector'>
                <ul>{phrasesVector}</ul>
            </div>
        );
    }
}