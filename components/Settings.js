import { Box, Button, Center, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure} from "@chakra-ui/react"
import { useRef, useState } from "react"
import { FiSettings } from "react-icons/fi"
import Swal from "sweetalert2"


const EditOrg = ({ orgid}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(false)
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  const [orgname, setOrgname] = useState('')
  const upOrg = async(e) => {
    e.preventDefault()
    try{
      setLoading(true)
      const gen = await fetch(`${process.env.NEXT_PUBLIC_BE}/org`,
      {
        method:'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({orgName: orgname, orgId: orgid})
      })
      const res = await gen.json()
      onClose()
      Swal.fire({
        title:'Nice',
        text: 'Organization name updated',
        timer: 3000
      })
      return res
    }catch(e){
      console.log(e)
    }finally{
      setLoading(false)
      
    }
  }

    return (
      <>
      <Box onClick={onOpen} ref={finalRef} color={'gray.400'} _hover={{color:'gray.600'}}>
        <FiSettings />
      </Box>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Name:</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Organization Name:</FormLabel>
              <Input ref={initialRef} placeholder='New Org name' value={orgname} onChange={e => setOrgname(e.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={upOrg}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
    )
  }

  export default EditOrg

  