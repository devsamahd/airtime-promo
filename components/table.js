import { TableContainer, Th, Td, Table, Thead, Tr, Tbody} from '@chakra-ui/react'
import { fd } from './Codes'

const CustomTable = ({tvalue, pg }) => {
  return (
    <TableContainer>
        <Table>
            <Thead>
            <Tr>
                <Th>S/N</Th>
                <Th>Code</Th>
                <Th>Type</Th>
                <Th isNumeric>value</Th>
                <Th>Status</Th>
                <Th>Created At</Th>
                <Th>Redeemed At</Th>
                <Th>Reedemed By</Th>
            </Tr>
            </Thead>
            <Tbody>
            {tvalue.map((tv,key) => <Tr key={key}>
                <Td>{key+1+pg}</Td>
                <Td>{tv.code}</Td>
                <Td>{tv.type}</Td>
                <Td isNumeric>#{tv.value}</Td>
                <Td color={tv.used?.status ? 'red' : 'green'}>{tv.used?.status ? 'used' : 'Valid'}</Td>
                <Td>{fd(tv.createdAt)}</Td>
                <Td>{tv.used?.status ? fd(tv.used.createdAt) : '-'}</Td>
                <Td>{tv.used?.status ? '+234'+tv.used.number : '-'}</Td>
            </Tr>)}
            </Tbody>
        </Table>
    </TableContainer>
  )
}

export default CustomTable