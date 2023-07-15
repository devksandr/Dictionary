import React, { Component } from 'react';
import '../../css/notification/notification.css';
import { Notification } from './Notification';

export class NotificationVector extends Component {
    render() {
        const notifications = this.props.notificationsVector.map(
            (notification) => <Notification 
                key={notification.id}
                id={notification.id} 
                type={notification.type}
                message={notification.message}
                handleRemove={this.props.handleRemove.bind(this)}
                theme={this.props.theme}
            />
        );

        return (
            <div className='notifications-container'>
                {notifications}
            </div>
        );
    }
}
