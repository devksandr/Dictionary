import React, { Component } from "react";
import { DragAndDropFile } from "./DragAndDropFile";
import "../../../../css/pages/FilesPage/DragAndDropFiles.css";
import DragAndDropIcon from '../../../../img/drag-and-drop-icon.png';

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
        if(!this.validateDuplicatesDropFiles(dropfiles)) {
            alert('Drop files have duplicates. Reselect files');
            return;
        }
        
        let dropfilesList = this.state.dropfiles;
        for (var i = 0; i < dropfiles.length; i++) {
            dropfilesList.push(dropfiles[i]);
        }
        this.setState({ dropfiles: dropfilesList });
        this.props.handleUpdateDropFilesCount(dropfilesList.length);
    }

    validateDuplicatesDropFiles(newDropfiles) {
        // Compare new files with each other
        for (let i = 0; i < newDropfiles.length; i++) {
            for (let j = i+1; j < newDropfiles.length; j++) {
                if(newDropfiles[i].name === newDropfiles[j].name) {
                    return false;
                }
            }
        }

        // Compare new files with each old one
        let oldDropfiles = this.state.dropfiles;
        for (let i = 0; i < newDropfiles.length; i++) {
            for (let j = 0; j < oldDropfiles.length; j++) {
                if(newDropfiles[i].name === oldDropfiles[j].name) {
                    return false;
                }
            }
        }

        return true;
    }

    handleRemoveDropFile(dropFileName) {
        const updatedDropfiles = this.state.dropfiles.filter(dropFile => dropFile.name !== dropFileName)
        this.setState({ dropfiles: updatedDropfiles });
        this.props.handleUpdateDropFilesCount(updatedDropfiles.length);
    }

    render() {
        const dropfilesList = this.state.dropfiles.map(
            (file, index) => 
                <DragAndDropFile 
                    file={file} 
                    key={index}
                    handleRemoveDropFile={this.handleRemoveDropFile.bind(this)}
                />
        );

        return (
            <div>
                <div
                    onDragOver={this.handleDragOverEvent}
                    onDragEnter={this.handleDragEnterEvent}
                    onDragLeave={this.handleDragLeaveEvent}
                    onDrop={this.handleDropEvent}
                    className="panel-dragAndDropFiles">
                    <span>
                        <img src={DragAndDropIcon} className="icon-dragAndDropFiles" />
                        <p>Click or drop files here</p>
                    </span>
                </div>
                <div>
                    {dropfilesList}
                </div>
            </div>
        );
    }
}
