import React, { Component, createContext } from 'react';
import '../css/notification/notification.css';
import { NotificationVector } from './notification/NotificationVector';
import { ApiRequest, ThemeType, CookieValue, CultureCode } from '../js/const.js';
import { getCookie, setCookie } from '../js/functions';
import axios from "axios";

const Context = createContext();

class ContextProvider extends Component {
    constructor (props) {
        super(props);
        this.state = {
            localization: { data: null, language: null },
            notifications: [],
            theme: null
        };
    }

    componentDidMount() {
        this.initContext();
    }

    async initContext() {
        const themeCode = getCookie(CookieValue.Theme) ?? ThemeType.Light.code;
        const languageCode = getCookie(CookieValue.Language) ?? CultureCode.Russian;

        this.changeTheme(themeCode);
        await this.changeLanguage(languageCode);
    }

    // Notification
    showNotification = (type, message) => {
        this.addNotification(type, message);
    }
  
    addNotification(type, message) {
        const id = Math.random();
        const newNotification = {id: id, type: type, message: message}
        this.setState(prevState => ({ notifications: [...prevState.notifications, newNotification] }))
    }
  
    removeNotification(id) {
        this.setState((prevState) => ({
            notifications: prevState.notifications.filter((notification) => notification.id !== id),
        }));
    }

    // Localization
    async changeLanguage(languageCode) {
        const response = await axios.get(ApiRequest.Localization.GetAllPages + languageCode);
        this.setState({ localization: { data: response.data, language: languageCode }});

        setCookie(CookieValue.Language, languageCode);
    }

    // Theme
    changeTheme(themeCode) {
        var theme = ThemeType[themeCode];
        this.setState({ theme: theme });

        document.body.style = `
            background: ${theme.backgroundColor};
            color: ${theme.fontColor};
        `;

        setCookie(CookieValue.Theme, themeCode);
    }

    render() {
        if(this.state.localization.data === null) return;

        const { children } = this.props;
        const contextValue = {
            localization: { 
                data: this.state.localization.data,
                language: this.state.localization.language,
                changeLanguage: async (languageCode) => await this.changeLanguage(languageCode)
            },
            notification: { 
                showNotification: (type, message) => this.addNotification(type, message) 
            },
            theme: {
                type: this.state.theme,
                changeTheme: async (theme) => await this.changeTheme(theme)
            }
        }
        const notificationVector = this.state.notifications.length > 0 ? <NotificationVector
            notificationsVector={this.state.notifications}
            handleRemove={this.removeNotification.bind(this)}
            theme={this.state.theme}
        /> : null;
        return (
            <Context.Provider value={contextValue}>
                {children}
                {notificationVector}
            </Context.Provider>
        );
    }
}

export { ContextProvider, Context };