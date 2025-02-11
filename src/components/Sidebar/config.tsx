import { BsHouse, BsPeople } from 'react-icons/bs';
import { PiStudentLight } from 'react-icons/pi';

export const sidebarConfig = [
  { title: 'Home', icon: <BsHouse />, path: '/' },
  { title: 'Professors', icon: <BsPeople />, path: '/professors' },
  { title: 'Groups', icon: <BsPeople />, path: '/groups' },
  { title: 'Students', icon: <PiStudentLight />, path: '/students' },
  { title: 'Courses', icon: <PiStudentLight />, path: '/courses' },
];
