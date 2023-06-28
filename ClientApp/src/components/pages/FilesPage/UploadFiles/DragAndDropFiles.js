import React, { Component } from "react";
import { DragAndDropFile } from "./DragAndDropFile";
import "../../../../css/pages/FilesPage/DragAndDropFiles.css";
import DragAndDropIcon from '../../../../img/drag-and-drop-icon.png';
import { renameFile, getFileNameWithoutExtension } from '../../../../js/functions.js';
export class DragAndDropFiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drag: false,
            dropfiles: []
        };
        
        this.inputFileRef = React.createRef();
    }

    handleEventDefaultOptions = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    // Click
    handleClickEvent = (e) => {
        this.handleEventDefaultOptions(e);

        this.inputFileRef.current.value = "";   // clear input
        this.inputFileRef.current.click();
    };
    handleChangeEvent = (e) => {
        this.handleEventDefaultOptions(e);

        this.handleDropFiles(this.inputFileRef.current.files);
    };

    // Drop
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
        const filesWithoutExtension = this.dropFilesExtension(dropfiles);
        if(!this.validateDuplicatesDropFiles(filesWithoutExtension)) {
            alert('Drop files have duplicates. Reselect files');
            return;
        }
        
        let filesList = this.state.dropfiles;
        for (var i = 0; i < filesWithoutExtension.length; i++) {
            filesList.push(filesWithoutExtension[i]);
        }
        this.setState({ dropfiles: filesList });
        this.props.handleUpdateDropFilesCount(filesList.length);
    }

    dropFilesExtension(files) {
        const filesWithoutExtension = [];
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            const fileWithoutExtension = renameFile([file], getFileNameWithoutExtension(file.name));
            filesWithoutExtension.push(fileWithoutExtension);
        }
        return filesWithoutExtension;
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
                    removeButtonText={this.props.removeButtonText}
                />
        );

        return (
            <div>
                <input 
                    type="file" 
                    multiple={true}
                    id="fileInput"
                    className="input-hiddenAddFiles"
                    ref={this.inputFileRef}
                    onChange={this.handleChangeEvent}>
                </input>
                <div
                    onClick={this.handleClickEvent}
                    onDragOver={this.handleDragOverEvent}
                    onDragEnter={this.handleDragEnterEvent}
                    onDragLeave={this.handleDragLeaveEvent}
                    onDrop={this.handleDropEvent}
                    className="panel-dragAndDropFiles">
                    <span>
                        <img src={DragAndDropIcon} className="icon-dragAndDropFiles" />
                        <p>{this.props.text}</p>
                    </span>
                </div>
                <div>
                    {dropfilesList}
                </div>
            </div>
        );
    }
}
