import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export class FileLink extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>
                <button onClick={() => this.props.handleDelete(this.props.file.id)}>del</button>
                <Link to={"/file/" + this.props.file.id} state={{mydata: "myvalue"}}>{this.props.file.name}</Link>
            </li>
        );
    }
}