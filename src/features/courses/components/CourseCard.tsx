import { Avatar, AvatarGroup, Card, Heading } from '@chakra-ui/react';
import React from 'react';
import PreviewCourse from './PreviewCourse';
import WindowModal from '@/components/modal/WindowModal';
import { TCourse } from '@/types/courses';

const CourseCard = ({ course }: {course: TCourse}) => {
  return (
    <WindowModal
      action={
        <Card
          key={course.id}
          height={32}
          padding={4}
          backgroundColor={'background.main'}
          boxShadow={'inner'}
          gap={5}
          justify={'space-between'}
          cursor={'pointer'}
          _hover={{
            boxShadow: 'lg',
          }}
        >
          <Heading
            size={'sm'}
            fontWeight={600}
            color={'text.bold'}
          >{course.name}</Heading>
          <AvatarGroup
            size={'sm'}
            justifyContent={'flex-start'}
            max={3}
          >
            {
              course.course_assignment.map((el) => (
                <Avatar
                  key={el.id}
                  // name={el.professor.fullName}
                  borderColor={'inherit'}
                  _hover={{
                    _after: {
                      position: 'absolute',
                      top: '100%',
                      content: `"${el.professor.fullName}"`,
                      padding: 1,
                      bg: 'blackAlpha.800',
                      fontSize: '12',
                      zIndex: 10,
                    },
                  }}
                />
              ))
            }
          </AvatarGroup>
        </Card>
      }
      body={(onClose) => (<PreviewCourse
        course={course}
        onClose={onClose}
      />)}
    />

  );
};

export default CourseCard;
