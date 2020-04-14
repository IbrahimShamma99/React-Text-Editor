import React from "react";
/*import Editor from 'draft-js-plugins-editor';*/
import {/** Editor, */EditorState, RichUtils } from "draft-js";
import "../App.css";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from "draft-js-export-html";
import HtmlToPdf from './pdfExporter';

class PageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  onChange = editorState => {
    console.log(this.state.editorContentHtml)
    this.setState({
      editorState,
      editorContentHtml: stateToHTML(editorState.getCurrentContent())
      });
  };

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  render() {
    return (
      <div className="editorContainer">
        <div className="editors">
          <Editor
          editorState={this.state.editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onChange}
          />
        </div>
        <HtmlToPdf body={this.state.editorContentHtml}/>
      </div>
    );
  }
}

export default PageContainer;