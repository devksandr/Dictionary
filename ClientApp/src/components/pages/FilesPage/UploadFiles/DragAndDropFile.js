import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { Context } from '../../../ContextProvider';
import { formatBytes } from '../../../../js/functions.js';
import { ThemeType } from '../../../../js/const';
import DocumentIcon from '../../../../img/document-icon.png';
import "../../../../css/pages/FilesPage/DragAndDropFile.css";
import "../../../../css/Offset.css";

export class DragAndDropFile extends Component {
    static contextType = Context;
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const imgInvertValue = this.context.theme.type.code === ThemeType.Light.code ? 0 : 1;
        const imgThemeStyle = { filter: `invert(${imgInvertValue})` };

        return (
            <Row className="row-dragAndDropFile noSideMargin">
                <Col xs="1" className="noSidePadding">
                    <img src={DocumentIcon} className="icon-dragAndDropFile" style={imgThemeStyle} alt="" />
                </Col>
                <Col xs="9" className="noSidePadding">
                    <div>{this.props.file.name}</div>
                    <div>{formatBytes(this.props.file.size)}</div>
                </Col>
                <Col xs="2" className="col-removeDragAndDropFile noSidePadding">
                    <Button 
                        color="danger"
                        onClick={() => this.props.handleRemoveDropFile(this.props.file.name)}>
                        {this.props.removeButtonText}
                    </Button>
                </Col>
            </Row>
        );
    }
}