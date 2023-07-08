import React, { Component } from 'react';
import { Context } from '../../ContextProvider';
import { Pages, ThemeType, NotificationType } from '../../../js/const.js';
import { Theme } from './Parameters/Theme';
import { Language } from './Parameters/Language';

export class SettingsPage extends Component {
    static contextType = Context;
    constructor(props, context) {
        super(props, context);
        this.state = { 
            currentCulture: null,
            theme: null
        };

        this.localization = this.context.localization.data[Pages.Settings].notification;
    }

    componentDidMount() {
        this.initSettings();
    }

    initSettings() {
        this.setState({ currentCulture: this.context.localization.language });
        this.setState({ theme: this.context.theme.type.code });
    }

    async handleRadioChangeCulture(event) {
        const lang = event.target.value;
        this.setState({ currentCulture: lang });

        try {
            await this.context.localization.changeLanguage(lang);
            await this.context.localization.getAllLocalization();
        } catch (error) {
            this.context.notification.showNotification(NotificationType.Error, this.context.localization.data[Pages.Settings].notification.SettingsNotificationLanguageChangeError);
        }
    }
    async handleRadioChangeTheme(event) {
        const themeCode = event.target.value;
        const theme = ThemeType[themeCode];
        this.setState({ theme: theme.code });

        try {
            await this.context.theme.changeTheme(theme.code);
        } catch (error) {
            this.context.notification.showNotification(NotificationType.Error, this.context.localization.data[Pages.Settings].theme.SettingsThemeNotificationChangeError);
        }
    }

    render() {
        return (
            <div>
                <h1>{this.context.localization.data[Pages.Settings].body.SettingsHeader}</h1>
                <Language
                    currentCulture={this.state.currentCulture}
                    handleRadioChangeCulture={this.handleRadioChangeCulture.bind(this)}
                />
                <Theme
                    theme={this.state.theme}
                    handleRadioChangeTheme={this.handleRadioChangeTheme.bind(this)}
                />
            </div>
        );
    }
}