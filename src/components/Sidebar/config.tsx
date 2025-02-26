import { CustomGroupIcon, CustomHomeIcon, CustomStudentIcon, CustomTutorIcon } from '../customIcon';

export const sidebarConfig = [
  { title: 'Home', icon: <CustomHomeIcon />, path: '/' },
  { title: 'Professors', icon: <CustomTutorIcon />, path: '/professors' },
  { title: 'Students', icon: <CustomStudentIcon />, path: '/students' },
  { title: 'Groups', icon: <CustomGroupIcon />, path: '/groups' },
];
