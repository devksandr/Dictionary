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
            localization: null,
            notifications: []
        };
    }

    componentDidMount() {
        this.initContext();
    }

    async initContext() {
        await this.getAllLocalization();
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
    async getAllLocalization() {
        const response = await axios.get(ApiRequest.Localization.GetAllPages);
        this.setState({ localization: response.data });
    }


    render() {
        if(this.state.localization === null) return;

        const { children } = this.props;
        const contextValue = {
            localization: { data: this.state.localization },    // getLocalization: async (page) => await this.getLocalization(page)
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