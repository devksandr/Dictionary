import React, {Component} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

export class DataVector extends Component {

    handleDelete(fileId) {
        const res = axios.delete('api/files/' + fileId)
            .then(response => {
                alert(`File deleted`);
            }).catch(error => {
                alert('error when deleting');
            });
    }

    render() {
        const vector = this.props.vector.map((file, index) => {
            const id = file.id;
            const name = file.name;

            return (
                <div key={index}>
                    <li>
                        <button onClick={() => this.handleDelete(id)}>del</button>
                        <Link to={"/file/" + id} state={{mydata: "myvalue"}}>{name}</Link>
                    </li>
                </div>
            );
        });

        return (
            <div className='component-datavector'>
                <ul>{vector}</ul>
            </div>
        );
    }
}