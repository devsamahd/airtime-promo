import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Box,
    Button,
    Spinner,
  } from '@chakra-ui/react'
import { useState } from 'react'
import { FaFileExport } from 'react-icons/fa'
import CsvDownload from 'react-json-to-csv'
import { fd } from './Codes'

export default function Export({orgid, orgname, status, type}) {
    const [loading,setLoading] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const header = ['S/N', 'Code', 'Value', 'Status', 'Created At', 'Redeemed At', 'Redeemed By ']
    const [exportable,setExportable] = useState([])
    
    const exportit = async() => {
        onOpen()
        setLoading(true)
        try{
            const data = await fetch(`${process.env.NEXT_PUBLIC_BE}/generateCode/${orgid}/?type=${type?type:''}&status=${status?status:''}`)
            const resp = await data.json()
            setExportable(resp.map((cor, key)=> {return {sn: key+1, code:cor.code, value:cor.value, used:cor.usable ? 'valid' : 'used', createdAt:fd(cor.createdAt), redeemedAt: !cor.used ? '-' : fd(cor.used.createdAt), redeemedBy: cor.used ? cor.used.number : '-'}}))
          }catch(e){
            console.log(e)
          }finally{
            setLoading(false)
          }
    }
  
  
    return (
      <>
        <Box pos={'fixed'} bottom={'90px'} right={'60px'} borderRadius={10} p={3} bg={'green.400'} color="white" _hover={{bg: 'green.600'}} onClick={exportit}><FaFileExport /></Box>
        
  
        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Export Data</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            Export <b>{status ? 'used':status === ''? 'all': 'used'} {type}</b> data. <br />
            {loading && <><Spinner /><i> Preparing document...</i></>}
            </ModalBody>
            <ModalFooter>
                {!loading && <Box bg={"green.500"} color={"white"} p={2} borderRadius={5} mr={3}><CsvDownload data={exportable} headers={header} delimiter="," filename={orgname}/></Box>}
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }