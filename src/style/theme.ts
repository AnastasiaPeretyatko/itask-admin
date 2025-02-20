import { extendTheme } from '@chakra-ui/react';
import { colors, semanticTokens } from './colors';
import { avatarTheme } from './components/avatar';
import { buttonTheme } from './components/button';
import { containerTheme } from './components/container';
import { headingTheme } from './components/heading';
import { inputTheme } from './components/input';
import { listTheme } from './components/list';
import { menuTheme } from './components/menu';
import { modalTheme } from './components/modal';
import { popoverTheme } from './components/popover';
import { tableTheme } from './components/table';
import { textareaTheme } from './components/textarea';

export const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  styles: {
    global: {
      body: {
        bg: 'background.main',
        color: 'font',
      },
    },
  },
  semanticTokens,
  colors,
  components: {
    Avatar: avatarTheme,
    Container: containerTheme,
    Button: buttonTheme,
    Heading: headingTheme,
    Input: inputTheme,
    List: listTheme,
    Modal: modalTheme,
    Table: tableTheme,
    Menu: menuTheme,
    Popover: popoverTheme,
    Textarea: textareaTheme,
  },
});
