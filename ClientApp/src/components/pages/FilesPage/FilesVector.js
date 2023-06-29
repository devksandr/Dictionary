import React, {Component} from 'react';
import { FileLink } from './FileLink';

export class FilesVector extends Component {
    render() {
        const filesVector = this.props.vector.map(
            (file, index) => <FileLink 
                file={file} 
                key={index} 
                handleDelete={this.props.handleDelete.bind(this)}
                localization={this.props.localization}
            />
        );

        return (
            <div className='component-datavector'>
                <ul>{filesVector}</ul>
            </div>
        );
    }
}