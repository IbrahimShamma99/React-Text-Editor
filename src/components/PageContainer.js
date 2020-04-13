import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import BlockStyleToolbar, {
  getBlockStyle
} from "./blockStyles/BlockStyleToolbar";
import "../App.css";

class PageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }
  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  onChange = editorState => {
    this.setState({
      editorState
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

  onUnderlineClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  };

  onBoldClick = event => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  };

  onItalicClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  };

  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  render() {
    return (
      <div className="editorContainer">
        <div className="toolbar">
          <BlockStyleToolbar
            editorState={this.state.editorState}
            onToggle={this.toggleBlockType}
          />
          <button className="styleButton" onClick={this.onUnderlineClick}>
            U
          </button>
          <button className="styleButton" onClick={this.onBoldClick}>
            <b>B</b>
          </button>
          <button className="styleButton" onClick={this.onItalicClick}>
            <em>I</em>
          </button>
        </div>

        <div className="editors">
          <Editor
            blockStyleFn={getBlockStyle}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default PageContainer;