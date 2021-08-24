/**
 * Rich text input
 *
 *
 */
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { formUtils } from "./../../helpers";
import htmlToDraft from "html-to-draftjs";
export default function RichText({ value, onChange, disabled }) {
  const transformValue = () => {
    if (typeof value === "object") {
      return value;
    }
    if (typeof value === "string" && value) {
      const blocksFromHTML = convertFromHTML(formUtils.decodeHtml(value));
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      return EditorState.createWithContent(state);
    }
    return EditorState.createEmpty();
  };
  return (
    <Editor
      editorState={transformValue()}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onChange}
      readOnly={disabled}
    />
  );
}
