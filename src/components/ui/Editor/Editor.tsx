import { BlockNoteEditor, locales, PartialBlock } from '@blocknote/core';
import { BlockNoteView, lightDefaultTheme, Theme } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import { Box, useColorMode } from '@chakra-ui/react';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import dynamic from 'next/dynamic';
import { colors } from '@/style/colors';

type EditorProps = {
  onChange?: (value: string) => void
  initialContent?: string
  editable?: boolean
}


const lightRedTheme = {
  colors: {
    editor: {
      text: colors.black[80], // rgba(0, 0, 0, 0.8)
      background: 'inherit',
      // placeholder: 'lightgray',
    },
    menu: {
      background: colors.white.primary, // #fff
      text: colors.black.zero, // #000000
      // background: 'red.menu',
    },
    tooltip: {
      text: colors.white.primary, // #fff
      background: colors.tooltipBlue, // #4d78b8c3
    },
    hovered: {
      text: colors.veryDarkGray, // #0f0f0f
      background: colors.darkBlue, // #0000001f
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
    sideMenu: colors.marbleGray, // #bababa
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
    //   text: 'colors.white.primary',
    //   // background: 'colors.red.disabled.text',
    // },
    // sideMenu: 'colors.white.primary',
    // highlights: darkDefaultTheme.colors!.highlights,
  },
} satisfies Theme;

// const darkRedTheme = {
//   ...lightRedTheme,
//   colors: {
//     ...lightRedTheme.colors,
//     editor: {
//       text: colors.white.primary, // #fff
//       background: colors.black[200], // #1A1D1F
//     },
//     menu: {
//       background: colors.black[300], // #272B30
//       text: colors.white.primary, // #fff
//     },
//     tooltip: {
//       text: colors.white.primary, // #fff
//       background: colors.tooltipBlue, // #4d78b8c3
//     },
//     hovered: {
//       text: colors.almostWhite, // #e6e6e6
//       background: colors.darkBlue, // #0000001f
//     },
//     sideMenu: colors.black[400], // #303336
//   },
// } satisfies Theme;


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
        default: 'Введите текст...',
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