import React, { useState } from 'react';
import {
  Editor,
  EditorState,
  Modifier,
  CompositeDecorator,
} from 'draft-js';
import 'draft-js/dist/Draft.css'; // Make sure to include Draft.js styles

const ColorfulTextExample = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [selections, setSelections] = useState([]);

  const handleColorChange = (color) => {
    const currentSelection = editorState.getSelection();
    setSelections([...selections, { color, selection: currentSelection }]);
  };

  const applyColors = (contentState) => {
    let newContentState = contentState;

    selections.forEach(({ color, selection }) => {
      const startOffset = selection.getStartOffset();
      const endOffset = selection.getEndOffset();

      newContentState = Modifier.applyInlineStyle(
        newContentState,
        selection,
        `BACKGROUND_${color}`
      );
    });

    return newContentState;
  };

  const decorator = new CompositeDecorator([
    {
      strategy: (contentBlock, callback) => {
        const content = contentBlock.getText();
        selections.forEach(({ color, selection }) => {
          const startOffset = selection.getStartOffset();
          const endOffset = selection.getEndOffset();

          const matches = content.match(
            new RegExp(`.{${startOffset}}(.{${endOffset - startOffset}})`)
          );

          if (matches) {
            callback(matches.index, matches.index + matches[1].length);
          }
        });
      },
      component: (props) => {
        const { children, offsetKey } = props;
        const color = offsetKey.match(/BACKGROUND_(.+)/)[1];

        return (
          <span
            style={{
              backgroundColor: color,
              padding: '2px',
            }}
          >
            {children}
          </span>
        );
      },
    },
  ]);

  const handleApplyColors = () => {
    const contentState = editorState.getCurrentContent();
    const newContentState = applyColors(contentState);

    setEditorState(EditorState.push(editorState, newContentState));
    setSelections([]);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleColorChange('red')}>Red</button>
        <button onClick={() => handleColorChange('green')}>Green</button>
        <button onClick={() => handleColorChange('blue')}>Blue</button>
      </div>
      <div>
        <button onClick={handleApplyColors}>Apply Colors</button>
      </div>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        spellCheck = {true}
        placeholder='Write Something Here...............'
      />
    </div>
  );
};

export default ColorfulTextExample;
