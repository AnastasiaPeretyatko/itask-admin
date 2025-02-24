import { Avatar, AvatarGroup, Card, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { TCourse } from '@/types/courses';

const CourseCard = ({ course }: {course: TCourse}) => {
  const router = useRouter();
  return (
    <Card
      key={course.id}
      maxW={64}
      height={32}
      padding={4}
      backgroundColor={'background.secondary'}
      boxShadow={'inner'}
      gap={5}
      justify={'space-between'}
      cursor={'pointer'}
      _hover={{
        boxShadow: 'lg',
      }}
      onClick={() => router.push(`/courses/${course.id}`)}
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
              borderColor={'inherit'}
              _hover={{
                _after: {
                  position: 'absolute',
                  top: '100%',
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
  );
};

export default CourseCard;
