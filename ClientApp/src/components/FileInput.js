import React, { Component } from 'react';
import axios from "axios";

export class FileInput extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }
    handleSubmit(event) {
        const files = this.fileInput.current.files;
        const formData = new FormData();
        for (var i = 0; i < files.length; i++) {
            formData.append("formFiles", files[i]);
        }

        this.props.handleSubmit(formData);
        event.preventDefault();
        document.getElementById("addFileInput").value = ""; // clear input
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Upload file:
                    <input 
                        id="addFileInput" 
                        type="file" 
                        ref={this.fileInput} 
                        multiple={true}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        );
    }
}