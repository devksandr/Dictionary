import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './menu/NavMenu';
import { NotificationProvider } from './notification/NotificationProvider';
export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
          <div>
            <NavMenu />
            <Container tag="main" fluid>
              <NotificationProvider>
                {this.props.children}
              </NotificationProvider>
            </Container>
          </div>
    );
  }
}
