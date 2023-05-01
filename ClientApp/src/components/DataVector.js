import React, {Component} from 'react';
import axios from "axios";

export class DataVector extends Component {

    handleDelete(file) {
        const fileName = file.entry;
        const res = axios.delete('api/files/' + fileName)
            .then(response => {
                alert(`File deleted`);
            }).catch(error => {
                alert('error when deleting');
            });
    }

    render() {
        const vector = this.props.vector.map((entry, index) => {
            return (
                <div key={index}>
                    <li>
                        <button onClick={() => this.handleDelete({entry})}>
                            del
                        </button>
                        {entry}
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