import React, { Component } from 'react';
import { Context } from '../../../ContextProvider';
import { Pages, CultureCode, ThemeType, NotificationType } from '../../../../js/const.js';
import { Button, FormGroup, Label, Input } from 'reactstrap';

export class Theme extends Component {
    static contextType = Context;
    constructor(props, context) {
        super(props, context);
        this.localization = this.context.localization.data[Pages.Settings].theme;
    }

    render() {
        return (
            <FormGroup tag="fieldset">
                <legend>{this.context.localization.data[Pages.Settings].theme.SettingsThemeHeader}</legend>
                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            name="theme"
                            value={ThemeType.Light.code}
                            onChange={this.props.handleRadioChangeTheme}
                            checked={this.props.theme === ThemeType.Light.code} />
                            {this.context.localization.data[Pages.Settings].theme.SettingsThemeSelectLight}
                    </Label>
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            name="theme"
                            value={ThemeType.Dark.code}
                            onChange={this.props.handleRadioChangeTheme}
                            checked={this.props.theme === ThemeType.Dark.code} />
                            {this.context.localization.data[Pages.Settings].theme.SettingsThemeSelectDark}
                    </Label>
                </FormGroup>
            </FormGroup>
        );
    }
}