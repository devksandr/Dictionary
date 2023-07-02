import React, { Component, createContext } from 'react';
import { NotificationType } from '../../js/const';
import '../../css/notification/notification.css';
import NotificationLogoSuccess from '../../img/notification/notification-success.png';
import '../../css/notification/icon.css';

const notificationAppearTime = 2000;

export class Notification extends Component {
    constructor (props) {
        super(props);

        this.state = {
            notification: null,
            timer: setTimeout(this.remove.bind(this), notificationAppearTime)
        };
    }

    remove() {
        clearTimeout(this.state.timer);
        this.setState({ timer: null });
        this.props.handleRemove(this.props.id);
    }

    getClassType(type) {
        switch (type) {
            case NotificationType.Info: 
                return { classStyle: 'notification-type-info', icon: null };
            case NotificationType.Success: 
                return { classStyle: 'notification-type-success', icon: NotificationLogoSuccess };
            case NotificationType.Warning:
                return { classStyle: 'notification-type-warning', icon: null };
            case NotificationType.Error:
                return { classStyle: 'notification-type-error', icon: null };
        }
    }

    render() {
        const notificationType = this.getClassType(this.props.type);
        const message = this.props.message;

        return (
            <div className={`notification-container ${notificationType.classStyle}`}>
                <img src={notificationType.icon} className="notification-icon" />
                {message}
                <button onClick={this.remove.bind(this)}>del</button>
            </div>
        );
    }
}
