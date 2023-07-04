import React, { Component, createContext } from 'react';
import '../css/notification/notification.css';
import { NotificationVector } from './notification/NotificationVector';
import { Pages, ApiRequest } from '../js/const.js';
import axios from "axios";

const Context = createContext();

class ContextProvider extends Component {
    constructor (props) {
        super(props);
        this.state = {
            notifications: []
        };
    }

    componentDidMount() {
        this.initContext();
    }

    async initContext() {
        const localization = await this.getLocalization(1);    // TODO get all localization
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
    async getLocalization(page) {
        const response = await axios.get(ApiRequest.Localization.GetPage + Pages.Files);
        const localization = response.data;
        return localization
    }


    render() {
        const { children } = this.props;
        const contextValue = {
            localization: { getLocalization: async (page) => await this.getLocalization(page) },
            notification: { showNotification: (type, message) => this.addNotification(type, message) }
        }
        const notificationVector = this.state.notifications.length > 0 ? <NotificationVector
          notificationsVector={this.state.notifications}
          handleRemove={this.removeNotification.bind(this)}
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