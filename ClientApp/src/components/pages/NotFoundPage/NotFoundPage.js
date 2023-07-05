import React, { Component } from 'react';
import { Context } from '../../ContextProvider';
import { Pages, NOT_FOUND_CODE } from '../../../js/const.js';
import '../../../css/pages/NotFoundPage/NotFoundText.css';

export class NotFoundPage extends Component {
    static contextType = Context;
    constructor(props, context) {
        super(props, context);

        this.localization = this.context.localization.data[Pages.NotFound].body;
    }

    render() {
        return (
            <div className='notFound-container'>
                <span>
                    <p className='notFound-code'>{NOT_FOUND_CODE}</p>
                    <p className='notFound-text'>{this.localization.NotFoundPageText}</p>
                </span>
            </div>
        );
    }
}