import React, { Component } from 'react';
import { Context } from '../../../ContextProvider';
import { Pages, CultureCode } from '../../../../js/const.js';
import { FormGroup, Label, Input } from 'reactstrap';

export class Language extends Component {
    static contextType = Context;
    constructor(props, context) {
        super(props, context);
        this.localization = this.context.localization.data[Pages.Settings].notification;
    }

    render() {
        return (
            <FormGroup tag="fieldset">
                <legend>{this.context.localization.data[Pages.Settings].body.SettingsLanguageLabel}</legend>
                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            name="language"
                            value={CultureCode.Russian}
                            onChange={this.props.handleRadioChangeCulture}
                            checked={this.props.currentCulture === CultureCode.Russian} />
                            {this.context.localization.data[Pages.Settings].body.SettingsLanguageRussian}
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            name="language"
                            value={CultureCode.English}
                            onChange={this.props.handleRadioChangeCulture}
                            checked={this.props.currentCulture === CultureCode.English} />
                            {this.context.localization.data[Pages.Settings].body.SettingsLanguageEnglish}
                    </Label>
                </FormGroup>
            </FormGroup>
        );
    }
}