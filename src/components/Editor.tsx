import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import { useColorMode } from '@chakra-ui/react';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';

type EditorProps = {
  onChange: (value: string) => void
  initialContent?: string
  editable?: boolean
}

const Editor = ({
  onChange,
  editable,
  initialContent,
}: EditorProps) => {
  const { colorMode } = useColorMode();

  const editor: BlockNoteEditor = useCreateBlockNote({
    // editable,
    initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
    // onEditorContentChange: (editor) => {
    //   const newContent = JSON.stringify(editor.topLevelBlocks, null, 2);
    //   // setContent(editor.topLevelBlocks);
    //   // (editor) => onChange(JSON.stringify(editor.topLevelBlocks, null, 2)),
    //   onChange(newContent);
    // }, // Передаем данные в родительский компонент
  });

  return (
    <BlockNoteView
      editor={editor}
      editable={editable}
      theme={colorMode}
      onChange={() => onChange(JSON.stringify(editor.document, null, 2))}
    />
  );
};

export default Editor;