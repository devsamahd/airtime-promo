import { Box, SimpleGrid, Stat, StatArrow, StatHelpText, StatNumber, Text } from '@chakra-ui/react'
import { FaRegDotCircle} from 'react-icons/fa'
import AdminLayout from './AdminLayout'



const Statistics = ({stat}) => {

  const stats = [
    { label: 'Total Orgs', value: stat.orgCount },
    { label: 'Total Codes', value: stat.usableCodesCount+stat.usedCodesCount },
    { label: 'Total unused codes', value: stat.usableCodesCount }
  ]
  return (
  <AdminLayout>
    <Box as="section" py={{ base: '4', md: '8' }}>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: '5', md: '6' }}>
        {stats.map(({ label, value }) => (
          <Stat key={label} >
          <Text fontSize="sm" color={"gray.500"} justifyContent="space-between" display={"flex"}>
            <Box>Stats</Box>
            <FaRegDotCircle />
            </Text>
            <StatNumber>{label}</StatNumber>
            <StatHelpText>
            <StatArrow type='increase' />
            {value}
            </StatHelpText>
            </Stat>
        ))}
      </SimpleGrid>
    </Box>
  </AdminLayout>
)
}
export default Statistics