import React, { Component } from 'react';
import axios from "axios";
import { Pages, CultureCode } from '../../../js/const.js';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

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
            }
        );
    }

    /*
    handleGetLocalization() {
        axios.get('api/localization/page/' + Pages.Settings)
            .then(response => {
                const data = response.data;
                this.setState({ localization: data });
            }
        );
    }
    */

    handleChangeCulture(event) {
        const lang = event.target.value;
        this.setState({ currentCulture: lang });
    }

    handleSubmitChangeCulture() {
        const formData = new FormData();
        formData.append("cultureCode", this.state.currentCulture);

        axios.put('api/localization/culture/' + this.state.currentCulture)
            .then(response => {
                //this.handleGetLocalization();
            }).catch(error => {
                alert('culture err');
            }
        );
    }

    render() {
        return (
            <div>
                <h1>Настройки</h1>
                <div>
                    <legend>Язык</legend>
                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                name="radio-lang-ru"
                                value={CultureCode.Russian}
                                onChange={this.handleChangeCulture.bind(this)}
                                checked={this.state.currentCulture === CultureCode.Russian} />
                                Русский
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
                                Английский
                        </Label>
                    </FormGroup>
                    <Button onClick={this.handleSubmitChangeCulture.bind(this)}>Submit</Button>
                </div>
            </div>
        );
    }
}