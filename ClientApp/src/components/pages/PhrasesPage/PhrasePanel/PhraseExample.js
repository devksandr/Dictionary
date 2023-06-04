import React, {Component} from 'react';
import { Row, Col } from 'reactstrap';

export class PhraseExample extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>
                <p><u>{this.props.phraseExample.sentence}</u></p>
            </li>
        );
    }
}