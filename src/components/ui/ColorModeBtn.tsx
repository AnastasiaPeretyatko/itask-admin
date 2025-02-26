import { IconButton , useColorMode } from '@chakra-ui/react';
import { CustomMoonIcon, CustomSunIcon } from '../customIcon';

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
      icon={colorMode === 'dark' ? <CustomSunIcon/> : <CustomMoonIcon />}
      onClick={toggleColorMode}
    ></IconButton>
  );
};

export default ColorModeBtn;
