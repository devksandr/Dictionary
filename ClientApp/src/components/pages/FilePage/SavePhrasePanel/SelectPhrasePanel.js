import React, {Component} from 'react';
import '../../../../css/pages/FilePage/SelectPhrasePanel.css';
import '../../../../css/Theme.css';
import { NOT_SELECTED } from '../../../../js/const.js';

export class SelectPhrasePanel extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            hoverPhraseIndex: NOT_SELECTED,
        };
    }

    handleMouseEnter(event, index) {
        this.setState({ hoverPhraseIndex: index });
    }
    handleMouseLeave(event, index) {
        this.setState({ hoverPhraseIndex: NOT_SELECTED });
    }

    handleClickPhrase(e, index) {
        let clickedPhraseIndex = this.props.clickedPhraseIndex == index ? NOT_SELECTED : index;
        this.props.handleClickPhrase(clickedPhraseIndex);
    }

    render() {
        let phrasesData = this.props.clickedSentencePhrasesData.map((phraseData, index) => {
                const hoverClass = this.state.hoverPhraseIndex==index ? 'element-hover-theme' : '';
                const clickClass = this.props.clickedPhraseIndex==index ? 'element-click-theme' : '';

                return(
                    <li 
                        key={index}
                        className={`${hoverClass} ${clickClass}`}
                        onMouseLeave={(e) => this.handleMouseLeave(e, index)}
                        onMouseEnter={(e) => this.handleMouseEnter(e, index)}
                        onClick={(e) => this.handleClickPhrase(e, index)}>
                        {phraseData}
                    </li>
                );
            }
        );
        const addOption = <li key={phrasesData.length+1}>Add</li>;
        phrasesData.push(addOption);

        return (
            <div className='panel-selectPhrase'>
                <p>Phrases</p>
                <ul>{phrasesData}</ul>
            </div>
        );
    }
}