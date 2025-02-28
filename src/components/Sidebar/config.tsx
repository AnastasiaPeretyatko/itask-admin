import { CustomGroupIcon, CustomHomeIcon, CustomSettingsIcon, CustomStudentIcon, CustomTutorIcon, LogoutIcon } from '../customIcon';

export const sidebarConfig = [
  { title: 'Home', icon: <CustomHomeIcon />, path: '/' },
  { title: 'Professors', icon: <CustomTutorIcon />, path: '/professors' },
  { title: 'Students', icon: <CustomStudentIcon />, path: '/students' },
  { title: 'Groups', icon: <CustomGroupIcon />, path: '/groups' },
];

export const sidebarMenuConfig = [
  { title: 'Настройки', icon: <CustomSettingsIcon />, path: '' },
  { title: 'Выйти', icon: <LogoutIcon />, path: '' },
];