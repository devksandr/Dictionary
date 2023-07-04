import React, { Component, createContext } from 'react';
import { Pages, ApiRequest } from '../../js/const.js';
import axios from "axios";

export class LocalizationProvider extends Component {
    constructor (props) {
        super(props);
    }

    async getLocalization(page) {
        const response = await axios.get(ApiRequest.Localization.GetPage + Pages.Files);
        const localization = response.data;
        return localization
    }

    render() {
        const context = this.props.context;
        return (
            <context.Provider value={this.state}>
                {this.props.children}
            </context.Provider>
        );
    }
}
