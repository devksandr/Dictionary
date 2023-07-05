import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './menu/NavMenu';
import { ContextProvider } from './ContextProvider';
export class Layout extends Component {
    static displayName = Layout.name;
    render() {
        return (
            <ContextProvider>
                <NavMenu />
                <Container tag="main" fluid>
                    {this.props.children}
                </Container>
            </ContextProvider>
        );
    }
}
