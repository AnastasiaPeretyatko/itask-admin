import { BlockNoteEditor, locales, PartialBlock } from '@blocknote/core';
import { BlockNoteView, darkDefaultTheme, lightDefaultTheme, Theme } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import { Box, useColorMode } from '@chakra-ui/react';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';


type EditorProps = {
  onChange: (value: string) => void
  initialContent?: string
  editable?: boolean
}


const lightRedTheme = {
  colors: {
    editor: {
      text: 'rgba(0, 0, 0, 0.80)',
      background: 'inherit',
      // placeholder: 'lightgray',
    },
    menu: {
      background: '#ffffff',
      text: '#000000',
      // background: '#9b0000',
    },
    tooltip: {
      text: '#ffffff',
      background: '#4d78b8c3',
    },
    hovered: {
      text: '#0f0f0f',
      background: '#0000001f',
      // background: '#b00000',
    },
    // selected: {
    //   text: '#ffffff',
    //   background: '#c50000',
    // },
    // disabled: {
    //   text: '#9b0000',
    //   background: '#7d0000',
    // },
    shadow: 'none',
    border: 'none',
    sideMenu: '#bababa',
    highlights: lightDefaultTheme.colors!.highlights,
  },
  // borderRadius: 4,
  // fontFamily: 'Helvetica Neue, sans-serif',
} satisfies Theme;

// The theme for dark mode,
// users the light theme defined above with a few changes
const darkRedTheme = {
  ...lightRedTheme,
  colors: {
    // ...lightRedTheme.colors,
    // editor: {
    //   text: '#ffffff',
    //   // background: '#9b0000',
    // },
    // sideMenu: '#ffffff',
    // highlights: darkDefaultTheme.colors!.highlights,
  },
} satisfies Theme;

// The combined "red theme",
// we pass this to BlockNoteView and then the editor will automatically
// switch between lightRedTheme / darkRedTheme based on the system theme
const redTheme = {
  light: lightRedTheme,
  dark: darkRedTheme,
};


const Editor = ({
  onChange,
  editable,
  initialContent,
}: EditorProps) => {
  const locale = locales['ru'];
  const { colorMode } = useColorMode();

  const editor: BlockNoteEditor = useCreateBlockNote({
    dictionary: {
      ...locale,
      placeholders: {
        // ...locale.placeholders,
        default: 'Введите текст ...',
        // heading: 'This is a custom heading',
        bulletListItem: '',
        numberedListItem: '',
        checkListItem: '',
        heading: '',
      },
    },
    initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
  });

  return (
    <Box marginLeft={-54}>
      <BlockNoteView
        editor={editor}
        editable={editable}
        theme={redTheme.light}
        onChange={() => onChange(JSON.stringify(editor.document, null, 2))}
        data-theming-css-demo
      />
    </Box>
  );
};

export default Editor;