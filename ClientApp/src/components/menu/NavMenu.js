import React, { Component } from 'react';
import { Context } from '../ContextProvider';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../css/menu/NavMenu.css';
import { Pages } from '../../js/const.js';
import DictionaryLogo from '../../img/dictionary-logo.png';
import "../../css/menu/logo.css";

export class NavMenu extends Component {
  static displayName = NavMenu.name;
  static contextType = Context;
  constructor (props, context) {
    super(props, context);
    
    this.state = {
      collapsed: true
    };

    //this.localization = this.context.localization.data[Pages.Menu].items;
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand tag={Link} to="/">
            <img src={DictionaryLogo} className="logo-dictionary" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">{this.context.localization.data[Pages.Menu].items.MenuFilesItem}</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/phrases">{this.context.localization.data[Pages.Menu].items.MenuPhrasesItem}</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/settings">{this.context.localization.data[Pages.Menu].items.MenuSettingsItem}</NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
