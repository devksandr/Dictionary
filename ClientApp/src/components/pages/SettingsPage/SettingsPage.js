import React, { Component } from 'react';
import axios from "axios";
import { Pages, CultureCode, ApiRequest } from '../../../js/const.js';
import { Button, FormGroup, Label, Input } from 'reactstrap';

export class SettingsPage extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            localization: [],
            currentCulture: null
        };
    }

    componentDidMount() {
        this.handleGetCultureCode();
    }

    async handleGetCultureCode() {
        const response = await axios.get(ApiRequest.Localization.GetCulture);
        this.setState({ currentCulture: response.data });
        this.handleGetLocalization();
    }
    async handleGetLocalization() {
        const response = await axios.get(ApiRequest.Localization.GetPage + Pages.Settings);
        this.setState({ localization: response.data });
    }
    async handleSubmitChangeCulture() {
        await axios.put(ApiRequest.Localization.UpdateCulture + this.state.currentCulture);
        window.location.reload(false);  // Fast way to update menu localization
        // TODO find way to pass params to menu from page
        //this.handleGetLocalization();
    }

    handleChangeCulture(event) {
        const lang = event.target.value;
        this.setState({ currentCulture: lang });
    }

    render() {
        return (
            <div>
                <h1>{this.state.localization.SettingsHeader}</h1>
                <div>
                    <legend>{this.state.localization.SettingsLanguageLabel}</legend>
                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                name="radio-lang-ru"
                                value={CultureCode.Russian}
                                onChange={this.handleChangeCulture.bind(this)}
                                checked={this.state.currentCulture === CultureCode.Russian} />
                                {this.state.localization.SettingsLanguageRussian}
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                name="radio-lang-en"
                                value={CultureCode.English}
                                onChange={this.handleChangeCulture.bind(this)}
                                checked={this.state.currentCulture === CultureCode.English} />
                                {this.state.localization.SettingsLanguageEnglish}
                        </Label>
                    </FormGroup>
                    <Button onClick={this.handleSubmitChangeCulture.bind(this)}>{this.state.localization.SettingsButtonSave}</Button>
                </div>
            </div>
        );
    }
}