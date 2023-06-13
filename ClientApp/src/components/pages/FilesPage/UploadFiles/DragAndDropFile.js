import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { formatBytes } from '../../../../js/functions.js';
import DocumentIcon from '../../../../img/document-icon.png';
import "../../../../css/pages/FilesPage/DragAndDropFile.css";
import "../../../../css/Offset.css";

export class DragAndDropFile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row className="row-dragAndDropFile noSideMargin">
                <Col xs="1" className="noSidePadding">
                    <img src={DocumentIcon} className="icon-dragAndDropFile" />
                </Col>
                <Col xs="9" className="noSidePadding">
                    <div>{this.props.file.name}</div>
                    <div>{formatBytes(this.props.file.size)}</div>
                </Col>
                <Col xs="2" className="col-removeDragAndDropFile noSidePadding">
                    <Button 
                        color="danger"
                        onClick={() => this.props.handleRemoveDropFile(this.props.file.name)}>
                        Remove
                    </Button>
                </Col>
            </Row>
        );
    }
}