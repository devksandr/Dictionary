import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../css/menu/NavMenu.css';
import { Pages, ApiRequest } from '../../js/const.js';
import axios from "axios";
import DictionaryLogo from '../../img/dictionary-logo.png';
import "../../css/menu/logo.css";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      localization: [],
      collapsed: true
    };
  }

  componentDidMount() {
    this.handleGetLocalization();
  }

  async handleGetLocalization() {
    try {
      const response = await axios.get(ApiRequest.Localization.GetPage + Pages.Menu);
      this.setState({ localization: response.data });
    } catch (error) {
      alert('Unable to get menu localization');
    }
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    if(this.state.localization.length === 0) return;
    
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
                <NavLink tag={Link} className="text-dark" to="/">{this.state.localization.items.MenuFilesItem}</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/phrases">{this.state.localization.items.MenuPhrasesItem}</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/settings">{this.state.localization.items.MenuSettingsItem}</NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
