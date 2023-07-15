import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { NotificationType, ThemeType } from '../../js/const';
import '../../css/notification/notification.css';
import '../../css/notification/icon.css';
import NotificationIconClose from '../../img/notification/notification-close.png';
import NotificationIconSuccess from '../../img/notification/notification-success.png';
import NotificationIconError from '../../img/notification/notification-error.png';
import NotificationIconInfo from '../../img/notification/notification-info.png';
import NotificationIconWarning from '../../img/notification/notification-warning.png';


const NOTIFICATION_APPEAR_TIME = 3000;

export class Notification extends Component {
    constructor (props) {
        super(props);

        this.state = {
            notification: null,
            timer: setTimeout(this.remove.bind(this), NOTIFICATION_APPEAR_TIME)
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
                return { classStyle: 'notification-type-info', icon: NotificationIconInfo };
            case NotificationType.Success: 
                return { classStyle: 'notification-type-success', icon: NotificationIconSuccess };
            case NotificationType.Warning:
                return { classStyle: 'notification-type-warning', icon: NotificationIconWarning };
            case NotificationType.Error:
                return { classStyle: 'notification-type-error', icon: NotificationIconError };
            default:
                alert('Wrong notification type use');
        }
    }

    render() {
        const notificationType = this.getClassType(this.props.type);
        const message = this.props.message;

        const imgInvertValue = this.props.theme.code === ThemeType.Light.code ? 0 : 1;
        const imgThemeStyle = { filter: `invert(${imgInvertValue})` };

        const textStyle = { color: ThemeType.Light.fontColorInversion };

        return (
            <Row className={`notification-container ${notificationType.classStyle}`}>
                <Col xs="2" className="notification-icon-type-container">
                    <img src={notificationType.icon} className="notification-icon-type" style={imgThemeStyle} alt="" />
                </Col>
                <Col xs="9" className="notification-text-container" style={textStyle}>
                    {message}
                </Col>
                <Col xs="1" className="notification-icon-close-container" onClick={this.remove.bind(this)}>
                    <img src={NotificationIconClose}  className="notification-icon-close" alt="X" />
                </Col>
            </Row>
        );
    }
}
