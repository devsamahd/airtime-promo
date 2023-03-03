import { Box, Button, Center, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure} from "@chakra-ui/react"
import { useRef, useState } from "react"


const AddOrg = ({setOrg}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(false)
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  const [orgname, setOrgname] = useState('')
  const addOrg = async(e) => {
    e.preventDefault()
    try{
      setLoading(true)
      const gen = await fetch(`${process.env.NEXT_PUBLIC_BE}/org`,
      {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({orgname})
      })
      const res = await gen.json()
      console.log(res)
      return res
    }catch(e){
      console.log(e)
    }finally{
      const data = await fetch(`${process.env.NEXT_PUBLIC_BE}/org`)
      const res =await data.json()
      setOrg(res)
      setLoading(false)
      onClose()
    }
  }

    return (
      <>
      <Box onClick={onOpen} ref={finalRef} maxW='sm' w={'md'} borderWidth='1px' borderRadius='lg' overflow='hidden' bg={'blue.50'} color={'gray.400'} _hover={{color:'gray.600'}}>
        <Center>
            <Box p='6' >
                Add New Organization
            </Box>
        </Center>
      </Box>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new Organization dataset</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Organization Name:</FormLabel>
              <Input ref={initialRef} placeholder='First name' value={orgname} onChange={e => setOrgname(e.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={addOrg}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
    )
  }

  export default AddOrg

  