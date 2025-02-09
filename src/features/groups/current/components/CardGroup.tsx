import { RootState } from '@/store/store'
import { Container, Grid, GridItem, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

const CardGroup = () => {
  const { data } = useSelector((state: RootState) => state.currentGroup)


  return (
    <Container variant={'wrapper_table'}>
      <Grid templateColumns="repeat(2, 1fr)">
        <GridItem>
          <Text>Degree: {data.degree}</Text>
        </GridItem>
        <GridItem>
          <Text>Education Mode: {data.educationMode}</Text>
        </GridItem>
        <GridItem>
          <Text>Course: {data.course}</Text>
        </GridItem>
        <GridItem>
          <Text>Group number: {data.groupNumber}</Text>
        </GridItem>
      </Grid>
    </Container>
  )
}

export default CardGroup
