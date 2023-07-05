import React, {Component} from 'react';
import '../../../../css/pages/PhrasesPage/PhrasePanel.css';
import { Row, Col } from 'reactstrap';
import { PhraseMeaning } from './PhraseMeaning';

export class PhrasePanel extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if(!this.props.appearance) return;

        const phraseMeaningsVector = this.props.phrase.phraseMeanings.map(
            (phraseMeaning, index) => <PhraseMeaning 
                phraseMeaning={phraseMeaning} 
                key={index} 
            />
        );
        
        return (
            <div className='phrase-panel'>
                <h1 className='category-header'>{this.props.phrase.sentenceCategory}</h1>
                <h2 className='phrase-header'>{this.props.phrase.data}</h2>
                <div className='tags'></div>
                <Row className='phrase-data'>
                    <Col className='phrase-meaning-panel' xs="6">
                        <ol>{phraseMeaningsVector}</ol>
                    </Col>
                    <Col className='phrase-reference-panel'>
                        <p>TODO references to other phrases</p>
                    </Col>
                </Row>
            </div>
        );
    }
}