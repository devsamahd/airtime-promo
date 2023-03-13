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
    Text,
  } from '@chakra-ui/react'
import { useState } from 'react'
import { FaFileExport } from 'react-icons/fa'
import CsvDownload from 'react-json-to-csv'
import { fd } from './Codes'

export default function Export({orgid, orgname, status, type, codeCount}) {
    const [loading,setLoading] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const header = ['S/N', 'Code', 'Value', 'Status', 'Created At', 'Redeemed At', 'Redeemed By ']
    const [exportable,setExportable] = useState([])
    
    const exportit = async() => {
        onOpen()
        setLoading(true)
        try{
            const data = await fetch(`${process.env.NEXT_PUBLIC_BE}/generateCode/${orgid}/?skip=${0}&limit=${codeCount+10}&type=${type?type:''}&status=${status?status:''}`)
            const resp = await data.json()
            console.log(resp)
            const newres = resp.resp.map((cor, key)=> {return {sn: key+1  , code:cor.code, value:cor.value, used:cor.usable ? 'valid' : 'used', createdAt:fd(cor.createdAt), redeemedAt: !cor.used ? '-' : fd(cor.used.createdAt), redeemedBy: cor.used ? cor.used.number : '-'}})
            setExportable(newres)
        }catch(e){
          console.log(e)
        }finally{
          setLoading(false)
        }
    }
  
  
    return (
      <>
        <Box pos={'fixed'} bottom={'90px'} right={'60px'} borderRadius={50} p={4} bg={'green.700'} color="white" _hover={{bg: 'green.800'}} onClick={exportit}><FaFileExport /></Box>
        
  
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Export Data</ModalHeader>
            {!loading && <ModalCloseButton />}
            <ModalBody pb={6}>
            Export <b>{status ? 'used':status === ''? 'all': 'used'} {type}</b> data. <br />
            {loading && <><Spinner /><i> Preparing document... {exportable.length} data loaded...</i></>}
            </ModalBody>
            <ModalFooter>
                {!loading && <><Box bg={"blue.500"} color={"white"} p={2} borderRadius={5} mr={3}><CsvDownload data={exportable} headers={header} delimiter="," filename={`${orgname}${status?'-valid-':'-used-'}${type}`}/></Box>
                <Button onClick={onClose}>Cancel</Button></>}
                {loading && <Text color={'red'}>Reload to cancel</Text>}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }