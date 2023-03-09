import CustomTable from '@/components/table'
import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Skeleton, Stack, useDisclosure } from '@chakra-ui/react'
import moment from 'moment'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import CsvDownload from 'react-json-to-csv'

export const fd = (date) => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
  }
const Codes =({res, setRes, resp, orgid, orgname}) => {
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [type, setType] = useState(null)
  const [number, setNumber] = useState(0)
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState(0)

  const generate = async(e) => {
    e.preventDefault()
    try{
      setLoading(true)
      const gen = await fetch(`${process.env.NEXT_PUBLIC_BE}/generateCode`,
      {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({'quantity':number, type, value, orgId:orgid})
      })
      const res = await gen.json()
      return res
    }catch(e){
      console.log(e)
    }finally{
      const data = await fetch(`${process.env.NEXT_PUBLIC_BE}/generateCode`)
      const res =await data.json()
      setRes(res.filter(res => res.orgId === orgid))
      setLoading(false)
    }
    
  }
  const header = ['S/N', 'Code', 'Value', 'Status', 'Created At', 'Redeemed At', 'Redeemed By ']
  const exportable = res.map((cor, key)=> {return {sn: key+1, code:cor.code, value:cor.value, used:cor.usable ? 'valid' : 'used', createdAt:fd(cor.createdAt), redeemedAt: !cor.used ? '-' : fd(cor.used.createdAt), redeemedBy: cor.used ? cor.used.number : '-'}})

  return (
    <>

      <Box onClick={onOpen} pos={'fixed'} bottom={'90px'} right={'60px'} fontSize={30} borderRadius={'50%'} p={2} bg={'green.600'} color="white" _hover={{bg: 'green.600'}}><FaPlus /></Box>
      <Box pos={'fixed'} bottom={'30px'} right={'60px'} borderRadius={10} p={3} bg={'green.600'} color="white" _hover={{bg: 'green.600'}}><CsvDownload data={exportable} headers={header} delimiter="," filename={orgname}/></Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Generate Codes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl id="number">
          <FormLabel>Number of codes to generate:</FormLabel>
            <Input
              placeholder="Number of codes to generate"
              _placeholder={{ color: 'gray.500' }}
              type="number"
              value={number}
              onChange={(e)=> setNumber(e.target.value)}
            />
          </FormControl>
          <br />
          <FormControl>
          <FormLabel>Code type:</FormLabel>
          <Select placeholder='Code type' value={type} onChange={e=>setType(e.target.value)}>
            <option value='airtime'>Airtime</option>
            <option value='raffle'>Raffle</option>
          </Select>
          </FormControl>
          <br />
        {type === "airtime" && <FormControl id="value">
            <FormLabel>Value:</FormLabel>
            <Input
              placeholder="Value"
              _placeholder={{ color: 'gray.500' }}
              type="number"
              value={value}
              onChange={(e)=> setValue(e.target.value)}
            />
            
          </FormControl>}
          
          <br /><Button onClick={generate}>generate</Button> <br /><br />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
          {loading ?
          <Stack>
          <Skeleton height='50px' /><br />
          <Skeleton height='50px' /><br />
          <Skeleton height='50px' />
        </Stack>:
        <CustomTable tvalue={res.reverse()} resp={resp.filter(res => res.orgId === orgid)}
        />
          }
    </>
  )
}
export default Codes