import { TableContainer, Th, Td, Table, TableCaption, Thead, Tr, Tbody, Tfoot } from '@chakra-ui/react'
import React from 'react'

const CustomTable = ({tvalue, resp}) => {
    const used = resp.filter(t => t.used === true)
    let amt = []
    resp.map(t => amt.push(t.value))
    let total=0;
    for (let i = 0; i < amt.length; i++) {
        total = total + amt[i]; 
    }

  return (
    <TableContainer>
        <Table variant='striped' colorScheme='teal'>
            <TableCaption>All codes</TableCaption>
            <Thead>
            <Tr>
                <Th>S/N</Th>
                <Th>Code</Th>
                <Th isNumeric>value</Th>
                <Th>Status</Th>
            </Tr>
            </Thead>
            <Tbody>
            {tvalue.map((tv,key) => <Tr key={key}>
                <Td>{key+1}</Td>
                <Td>{tv.code}</Td>
                <Td isNumeric>#{tv.value}</Td>
                <Td color={tv.used ? 'red' : 'green'}>{tv.used ? 'used' : 'Valid'}</Td>
            </Tr>)}
            </Tbody>
            <Tfoot>
            <Tr>
                <Th>Total: {resp.length}</Th>
                <Th>Used: {used.length} Unused: {resp.length - used.length}</Th>
                <Th isNumeric>Total: {total}</Th>
                <Th ></Th>
            </Tr>
            </Tfoot>
        </Table>
    </TableContainer>
  )
}

export default CustomTable