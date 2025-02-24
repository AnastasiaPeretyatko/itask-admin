import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton , useColorMode } from '@chakra-ui/react';

const ColorModeBtn = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <IconButton
      isRound
      variant="solid"
      backgroundColor="background.main"
      color="text.bold"
      aria-label="Toggle dark mode"
      fontSize="md"
      ml={4}
      icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
    ></IconButton>
  );
};

export default ColorModeBtn;
