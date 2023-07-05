import React, {Component} from 'react';
import { Context } from '../../../ContextProvider';
import '../../../../css/pages/FilePage/SelectPhrasePanel.css';
import '../../../../css/Theme.css';
import { Pages, NOT_SELECTED } from '../../../../js/const.js';

export class SelectPhrasePanel extends Component {
    static contextType = Context;
    constructor(props, context) {
        super(props, context);

        this.state = { 
            hoverPhraseIndex: NOT_SELECTED,
        };

        this.localization = this.context.localization.data[Pages.File].panelSelectPhrase;
    }

    handleMouseEnter(event, index) {
        this.setState({ hoverPhraseIndex: index });
    }
    handleMouseLeave(event, index) {
        this.setState({ hoverPhraseIndex: NOT_SELECTED });
    }

    handleClickPhrase(e, index) {
        this.clickPhrase(index, false);
    }
    handleClickAddPhrase(e, index) {
        this.clickPhrase(index, true);
    }
    clickPhrase(index, isAdd) {
        let clickedPhraseIndex = this.props.clickedPhraseIndex == index ? NOT_SELECTED : index;
        this.props.handleClickPhrase(clickedPhraseIndex, isAdd);
    }


    createPhraseOption(phraseData, index, onClickHandler) {
        const hoverClass = this.state.hoverPhraseIndex==index ? 'element-hover-theme' : '';
        const clickClass = this.props.clickedPhraseIndex==index ? 'element-click-theme' : '';

        return(
            <li 
                key={index}
                className={`${hoverClass} ${clickClass}`}
                onMouseLeave={(e) => this.handleMouseLeave(e, index)}
                onMouseEnter={(e) => this.handleMouseEnter(e, index)}
                onClick={(e) => onClickHandler(e, index)}>
                {phraseData}
            </li>
        );
    }

    render() {
        let phrasesData = this.props.clickedSentencePhrasesData.map((phraseData, index) => 
            this.createPhraseOption(phraseData, index, this.handleClickPhrase.bind(this)));
        const addOption = this.createPhraseOption(this.localization.FileSelectPhrasePanelButtonAdd, phrasesData.length+1, this.handleClickAddPhrase.bind(this))
        phrasesData.push(addOption);

        return (
            <div className='panel-selectPhrase'>
                <p>{this.localization.FileSelectPhrasePanelHeader}</p>
                <ul>{phrasesData}</ul>
            </div>
        );
    }
}