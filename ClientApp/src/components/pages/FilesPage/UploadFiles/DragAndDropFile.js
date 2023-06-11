import React, { Component } from 'react';

export class DragAndDropFile extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>{this.props.file}</div>
        );
    }
}