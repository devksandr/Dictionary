import React, { Component } from 'react';
import axios from "axios";

export class FileInput extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }
    handleSubmit(event) {

        const file = this.fileInput.current.files[0];
        const formData = new FormData();
        formData.append("formFile", file);
        formData.append("name", file.name);

        const res = axios.post('api/files', formData)
            .then(response => {
                alert(`Selected file - ${this.fileInput.current.files[0].name}`);
            }).catch(error => {
                alert('err');
            });

        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Upload file:
                    <input type="file" ref={this.fileInput} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        );
    }
}