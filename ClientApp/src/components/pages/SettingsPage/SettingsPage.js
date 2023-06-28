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
        try {
            const response = await axios.get(ApiRequest.Localization.GetCulture);
            this.setState({ currentCulture: response.data });
            this.handleGetLocalization();
        } catch (error) {
            alert('Unable to get localization code');
        }
    }
    async handleGetLocalization() {
        try {
            const response = await axios.get(ApiRequest.Localization.GetPage + Pages.Settings);
            this.setState({ localization: response.data });
        } catch (error) {
            alert('Unable to get localization');
        }
    }
    async handleSubmitChangeCulture() {
        try {
            await axios.put(ApiRequest.Localization.UpdateCulture + this.state.currentCulture);
            window.location.reload(false);  // Fast way to update menu localization
            // TODO find way to pass params to menu from page
            //this.handleGetLocalization();
        } catch (error) {
            alert('Unable to update language');
        }
    }

    handleChangeCulture(event) {
        const lang = event.target.value;
        this.setState({ currentCulture: lang });
    }

    render() {
        if(this.state.localization.length === 0) return;

        return (
            <div>
                <h1>{this.state.localization.body.SettingsHeader}</h1>
                <div>
                    <legend>{this.state.localization.body.SettingsLanguageLabel}</legend>
                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                name="radio-lang-ru"
                                value={CultureCode.Russian}
                                onChange={this.handleChangeCulture.bind(this)}
                                checked={this.state.currentCulture === CultureCode.Russian} />
                                {this.state.localization.body.SettingsLanguageRussian}
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
                                {this.state.localization.body.SettingsLanguageEnglish}
                        </Label>
                    </FormGroup>
                    <Button onClick={this.handleSubmitChangeCulture.bind(this)}>{this.state.localization.body.SettingsButtonSave}</Button>
                </div>
            </div>
        );
    }
}