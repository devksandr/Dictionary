import React, { Component } from 'react';
import axios from "axios";
import { Pages, CultureCode } from '../../../js/const.js';
import { Button, FormGroup, Label, Input } from 'reactstrap';

export class SettingsPage extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            localization: [],
            currentCulture: null
        };
    }

    componentDidMount() {
        this.handleGetCultureCode();
    }

    handleGetCultureCode() {
        axios.get('api/localization/culture/')
            .then(response => {
                const data = response.data;
                this.setState({ currentCulture: data });
                this.handleGetLocalization();
            }
        );
    }

    handleGetLocalization() {
        axios.get('api/localization/page/' + Pages.Settings)
            .then(response => {
                const data = response.data;
                this.setState({ localization: data });
            }
        );
    }

    handleChangeCulture(event) {
        const lang = event.target.value;
        this.setState({ currentCulture: lang });
    }

    handleSubmitChangeCulture() {
        axios.put('api/localization/culture/' + this.state.currentCulture)
            .then(response => {
                //this.handleGetLocalization();
                
                window.location.reload(false);  // Fast way to update menu localization
                // TODO find way to pass params to menu from page
            }).catch(error => {
                alert('culture err');
            }
        );
    }

    render() {
        return (
            <div>
                <h1>{this.state.localization.SettingsHeader}</h1>
                <div>
                    <legend>{this.state.localization.SettingsLanguageLabel}</legend>
                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                name="radio-lang-ru"
                                value={CultureCode.Russian}
                                onChange={this.handleChangeCulture.bind(this)}
                                checked={this.state.currentCulture === CultureCode.Russian} />
                                {this.state.localization.SettingsLanguageRussian}
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                name="radio-lang-en"
                                value={CultureCode.English}
                                onChange={this.handleChangeCulture.bind(this)}
                                checked={this.state.currentCulture === CultureCode.English} />
                                {this.state.localization.SettingsLanguageEnglish}
                        </Label>
                    </FormGroup>
                    <Button onClick={this.handleSubmitChangeCulture.bind(this)}>{this.state.localization.SettingsButtonSave}</Button>
                </div>
            </div>
        );
    }
}