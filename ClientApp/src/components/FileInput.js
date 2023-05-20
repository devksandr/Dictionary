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
        this.props.handleSubmit(formData);
        event.preventDefault();
        document.getElementById("addFileInput").value = ""; // clear input
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Upload file:
                    <input id="addFileInput" type="file" ref={this.fileInput} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        );
    }
}