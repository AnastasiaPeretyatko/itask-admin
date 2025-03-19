import { BlockNoteEditor, locales, PartialBlock } from '@blocknote/core';
import { BlockNoteView, lightDefaultTheme, Theme } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import { Box, useColorMode } from '@chakra-ui/react';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import dynamic from 'next/dynamic';

type EditorProps = {
  onChange?: (value: string) => void
  initialContent?: string
  editable?: boolean
}


const lightRedTheme = {
  colors: {
    editor: {
      text: 'black.80',
      background: 'inherit',
      // placeholder: 'lightgray',
    },
    menu: {
      background: 'white.primary',
      text: 'black.zero',
      // background: 'red.menu',
    },
    tooltip: {
      text: 'white.primary',
      background: 'tooltipBlue',
    },
    hovered: {
      text: 'veryDarkGray',
      background: 'darkBlue',
      // background: 'red.hovered',
    },
    // selected: {
    //   text: 'white.primary',
    //   background: 'red.selected',
    // },
    // disabled: {
    //   text: 'red.disabled.text',
    //   background: 'red.disabled.background',
    // },
    shadow: 'none',
    border: 'none',
    sideMenu: 'marbleGray',
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
    //   text: 'white.primary',
    //   // background: 'red.disabled.text',
    // },
    // sideMenu: 'white.primary',
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
  editable = false,
  initialContent,
}: EditorProps) => {
  // eslint-disable-next-line import/namespace
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
    <Box
      marginLeft={-54}
      width={'full'}
    >
      <BlockNoteView
        editor={editor}
        editable={editable}
        theme={redTheme[colorMode]}
        onChange={() => onChange && onChange(JSON.stringify(editor.document, null, 2))}
      />

    </Box>
  );
};

export default dynamic(() => Promise.resolve(Editor), { ssr: false });