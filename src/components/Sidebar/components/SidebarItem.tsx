import { Button, Text, Tooltip } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import React from 'react';

type Props = {
  data: {
    title: string
    icon: React.JSX.Element
    path?: string
  }
  isCollapse: boolean
}

const SidebarItem = ({ data, isCollapse }: Props) => {
  const t = useTranslations();
  const router = useRouter();

  return !isCollapse ? (
    <Tooltip
      label={data.title}
      placement="right"
    >
      <Button
        variant="sidebar"
        leftIcon={data.icon}
        onClick={() => data.path && router.push(data.path)}
        isActive={router.asPath === data.path}
      ></Button>
    </Tooltip>
  ) : (
    <Button
      variant="sidebar"
      justifyContent={isCollapse ? 'flex-start' : 'center'}
      leftIcon={data.icon}
      onClick={() => data.path && router.push(data.path)}
      isActive={router.asPath === data.path}
    >
      <Text
        sx={
          !isCollapse
            ? { opacity: 0, overflow: 'hidden', transition: 'all .5s ease' }
            : {}
        }
      >
        {t(data.title)}
      </Text>
    </Button>
  );
};

export default SidebarItem;
