import React, { Component, createContext } from 'react';
import '../../css/notification/notification.css';
import { NotificationVector } from './NotificationVector';

const NotificationContext = createContext();

class NotificationProvider extends Component {
  
    constructor (props) {
        super(props);
        this.state = {
          notifications: []
        };
    }

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

    render() {
        const { children } = this.props;
        const notificationVector = this.state.notifications.length > 0 ? <NotificationVector
          notificationsVector={this.state.notifications}
          handleRemove={this.removeNotification.bind(this)}
        /> : null;
        return (
            <NotificationContext.Provider value={{ showNotification: this.showNotification }}>
                {children}
                {notificationVector}
            </NotificationContext.Provider>
        );
    }
}

export { NotificationProvider, NotificationContext };