import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

class CodeBlock extends React.Component {

  static defaultProps = {
    language: null,
  }

  render() {
    const { language, value } = this.props;

    return (
      <SyntaxHighlighter language={language}>
        {value}
      </SyntaxHighlighter>
    );
  }
}


export default CodeBlock;