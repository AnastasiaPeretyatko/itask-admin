import { IconButton, Button, useColorMode } from '@chakra-ui/react';
import { CustomMoonIcon, CustomSunIcon } from '../customIcon';

type Props = {
  isOpenSidebar?: boolean;
};

const ColorModeBtn = ({ isOpenSidebar }: Props) => {
  const { toggleColorMode, colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  if (!isOpenSidebar) {
    return (
      <IconButton
        isRound
        variant="solid"
        backgroundColor="background.main"
        color="text.bold"
        aria-label="Toggle dark mode"
        fontSize="md"
        ml={4}
        icon={isDarkMode ? <CustomSunIcon /> : <CustomMoonIcon />}
        onClick={toggleColorMode}
      />
    );
  }

  return (
    <Button
      variant="sidebar"
      justifyContent={!isOpenSidebar ? 'center' : 'start'}
      leftIcon={isDarkMode ? <CustomSunIcon bgSize={3} /> : <CustomMoonIcon bgSize={3} />}
      onClick={toggleColorMode}
    >
      {isOpenSidebar ? isDarkMode ? 'Светлая тема' : 'Тёмная тема' : null}

    </Button>
  );
};

export default ColorModeBtn;