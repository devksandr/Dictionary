import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { FileLink } from './FileLink';

export class DataVector extends Component {
        render() {
            const filesVector = this.props.vector.map(
                (file, index) => <FileLink 
                    file={file} 
                    key={index} 
                    handleDelete={this.props.handleDelete.bind(this)}
                />
        );

        return (
            <div className='component-datavector'>
                <ul>{filesVector}</ul>
            </div>
        );
    }
}