import React, {Component} from 'react';

export class DataVector extends Component {

    render() {
        const vector = this.props.vector.map((entry, index) => {
            return (
                <div key={index}>
                    <li>{entry}</li>
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