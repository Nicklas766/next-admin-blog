import React from 'react';

class Button extends React.Component {

    render = () => (
        <button onClick={this.props.onSelect}>
            
            {this.props.children}
            
            <style jsx>{`
                button {
                    background: #4c7af1;
                    color: white;
                    width: 100%;
                    letter-spacing: 1px;
                    margin: 12px auto;
                    height: 40px;
                    border-radius: 0.3em;
                    border: none;
                }

                button:hover {
                    cursor: pointer;
                }
            `}</style>
        </button>      
    ); 
}

export default Button;