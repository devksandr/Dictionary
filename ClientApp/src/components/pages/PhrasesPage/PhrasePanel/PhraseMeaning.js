import React, {Component} from 'react';
import { Row, Col } from 'reactstrap';
import { PhraseExample } from './PhraseExample';
export class PhraseMeaning extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // TODO
        const phraseExamples = ['pe1', 'pe2'];
        const phraseExamplesVector = phraseExamples.map(
            (phraseExample, index) => <PhraseExample 
                phraseExample={phraseExample} 
                key={index} 
            />
        );

        return (
            <li>
                <Row>
                    <Col className='phrase-meaning' xs="6">
                        <p><b>{this.props.phraseMeaning.meaning}</b></p>
                        <ul>{phraseExamplesVector}</ul>
                    </Col>
                    <Col className='phrase-comment'>
                        <p>{this.props.phraseMeaning.comment}</p>
                    </Col>
                </Row>
            </li>
        );
    }
}