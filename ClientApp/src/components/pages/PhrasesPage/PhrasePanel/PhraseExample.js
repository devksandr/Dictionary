import React, {Component} from 'react';

export class PhraseExample extends Component {
    render() {
        return (
            <li>
                <p><u>{this.props.phraseExample.sentence}</u></p>
            </li>
        );
    }
}