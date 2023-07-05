import React, { Component } from 'react';
import { Context } from '../../ContextProvider';
import { Pages, CultureCode } from '../../../js/const.js';
import { Button, FormGroup, Label, Input } from 'reactstrap';

export class SettingsPage extends Component {
    static contextType = Context;
    constructor(props, context) {
        super(props, context);
        this.state = { 
            localization: [],
            currentCulture: null
        };

        //this.localization = this.context.localization.data[Pages.Settings];
    }

    componentDidMount() {
        this.handleGetCultureCode();
    }

    handleGetCultureCode() {
        this.setState({ currentCulture: this.context.localization.language });
    }
    
    async handleSubmitChangeCulture() {
        try {
            await this.context.localization.changeLanguage(this.state.currentCulture);
            await this.context.localization.getAllLocalization();
        } catch (error) {
            alert('Unable to update language');
        }
    }

    handleRadioChangeCulture(event) {
        const lang = event.target.value;
        this.setState({ currentCulture: lang });
    }

    render() {
        return (
            <div>
                <h1>{this.context.localization.data[Pages.Settings].body.SettingsHeader}</h1>
                <div>
                    <legend>{this.context.localization.data[Pages.Settings].body.SettingsLanguageLabel}</legend>
                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                name="radio-lang-ru"
                                value={CultureCode.Russian}
                                onChange={this.handleRadioChangeCulture.bind(this)}
                                checked={this.state.currentCulture === CultureCode.Russian} />
                                {this.context.localization.data[Pages.Settings].body.SettingsLanguageRussian}
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                name="radio-lang-en"
                                value={CultureCode.English}
                                onChange={this.handleRadioChangeCulture.bind(this)}
                                checked={this.state.currentCulture === CultureCode.English} />
                                {this.context.localization.data[Pages.Settings].body.SettingsLanguageEnglish}
                        </Label>
                    </FormGroup>
                    <Button onClick={this.handleSubmitChangeCulture.bind(this)}>{this.context.localization.data[Pages.Settings].body.SettingsButtonSave}</Button>
                </div>
            </div>
        );
    }
}