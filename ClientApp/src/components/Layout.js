import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './menu/NavMenu';
import { NotificationProvider } from './notification/NotificationProvider';
import { ContextProvider } from './ContextProvider';
export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
          <div>
            <NavMenu />
            <Container tag="main" fluid>
              <ContextProvider>
                {this.props.children}
              </ContextProvider>
            </Container>
          </div>
    );
  }
}
