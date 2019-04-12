import React from 'react';

class InputForm extends React.Component {

    render = () => (
        <div>
            
            {this.props.type == "input" && 
            <input 
                aria-label={this.props.name}
                name={this.props.name}
                value={this.props.default}
                onChange={this.props.handleChange}
                placeholder={this.props.children}
                maxLength={this.props.maxLength}
            />}
            
            {this.props.type == "textarea" && 
            <textarea 
                aria-label={this.props.name}
                name={this.props.name}
                value={this.props.default}
                onChange={this.props.handleChange}
                placeholder={this.props.children}
                maxLength={this.props.maxLength}
            />}
             


            <style jsx>{`
                textarea {
                    width: 100%;
                    height: 600px;
                    box-sizing: border-box;
                    padding: 10px; 
                    resize: none;
                    color: #263344;
                    border-radius: .3em; 
                    border: 1px solid #263344;
                    font-size: 1em;
                }

                input {
                    width: 100%;
                    height: 40px;
                    margin-bottom: 24px;
                    box-sizing: border-box;
                    padding: 10px; 
                    resize: none;
                    color: #263344;
                    border-radius: .3em; 
                    border: 1px solid #263344;
                    font-size: 1em;
                }


                textarea:focus, input:focus {
                    box-shadow: inset 1px 1px 5px 1px #263344;
                }

                button {
                    background: #263344;
                    color: white;
                    width: 99%;
                    margin: auto;
                    height: 45px;
                    border-radius: 0.3em;
                    border: none;
                    margin-top: 12px;
                    box-shadow: 1px 1px 3px 1px #263344;
                }
                `}</style>
        </div>
    );
    
}

export default InputForm;