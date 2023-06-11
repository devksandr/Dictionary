import React, { Component } from "react";
import { DragAndDropFile } from "./DragAndDropFile";
import "../../../../css/pages/FilesPage/DragAndDropFiles.css";

export class DragAndDropFiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drag: false,
            dropfiles: []
        };
    }

    handleEventDefaultOptions = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    handleDragOverEvent = (e) => {
        this.handleEventDefaultOptions(e);
    };
    handleDragEnterEvent = (e) => {
        this.handleEventDefaultOptions(e);

        this.dragCounter++;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({ drag: true });
        }
    };
    handleDragLeaveEvent = (e) => {
        this.handleEventDefaultOptions(e);

        this.dragCounter--;
        if (this.dragCounter === 0) {
            this.setState({ drag: false });
        }
    };
    handleDropEvent = (e) => {
        this.handleEventDefaultOptions(e);

        this.setState({ drag: false });
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.handleDropFiles(e.dataTransfer.files);
            e.dataTransfer.clearData();
            this.dragCounter = 0;
        }
    };

    handleDropFiles(dropfiles) {
        let dropfilesList = this.state.dropfiles;
        for (var i = 0; i < dropfiles.length; i++) {
            dropfilesList.push(dropfiles[i].name);
        }
        this.setState({ dropfiles: dropfilesList });
    }

    render() {
        const dropfilesList = this.state.dropfiles.map(
            (file, index) => <DragAndDropFile file={file} key={index} />
        );

        return (
            <div>
                <div
                    onDragOver={this.handleDragOverEvent}
                    onDragEnter={this.handleDragEnterEvent}
                    onDragLeave={this.handleDragLeaveEvent}
                    onDrop={this.handleDropEvent}
                    className="panel-dragAndDropFiles">
                    Click or drop files here
                </div>
                <div>
                    <p>files names:</p>
                    {dropfilesList}
                </div>
            </div>
        );
    }
}
