import React, { Component } from 'react';
import { Pages, ApiRequest, NOT_FOUND_CODE } from '../../../js/const.js';
import axios from "axios";
import '../../../css/pages/NotFoundPage/NotFoundText.css';

export class NotFoundPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            localization: []
        };
    }

    componentDidMount() {
        this.handleGetLocalization();
    }

    async handleGetLocalization() {
        const response = await axios.get(ApiRequest.Localization.GetPage + Pages.NotFound);
        this.setState({ localization: response.data });
    }

    render() {
        if(this.state.localization.length === 0) return;

        return (
            <div className='notFound-container'>
                <span>
                    <p className='notFound-code'>{NOT_FOUND_CODE}</p>
                    <p className='notFound-text'>{this.state.localization.body.NotFoundPageText}</p>
                </span>
            </div>
        );
    }
}