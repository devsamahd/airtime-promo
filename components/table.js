import { TableContainer, Th, Td, Table, TableCaption, Thead, Tr, Tbody, Tfoot } from '@chakra-ui/react'
import React, { useState } from 'react'

const CustomTable = ({tvalue, resp}) => {
    const [page, setPage] = useState([0,10])
    const inc = () => {
        setPage([page[0], page[1]+10])
      }
    const used = resp.filter(t => t?.used?.status === true) 
    let amt = []
    resp.map(t => amt.push(t.value))
    let total=0;
    for (let i = 0; i < amt.length; i++) {
        total = total + amt[i]; 
    }

  return (
    <TableContainer>
        <Table>
            <TableCaption onClick={inc} _hover={{cursor:'pointer'}}>Show more</TableCaption>
            <Thead>
            <Tr>
                <Th>S/N</Th>
                <Th>Code</Th>
                <Th>Type</Th>
                <Th isNumeric>value</Th>
                <Th>Status</Th>
            </Tr>
            </Thead>
            <Tbody>
            {(tvalue.slice(page[0],page[1])).map((tv,key) => <Tr key={key}>
                <Td>{key+1}</Td>
                <Td>{tv.code}</Td>
                <Td>{tv.type}</Td>
                <Td isNumeric>#{tv.value}</Td>
                <Td color={tv.used?.status ? 'red' : 'green'}>{tv.used?.status ? 'used' : 'Valid'}</Td>
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