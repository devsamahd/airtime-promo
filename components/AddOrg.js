import { Box, Button, Center, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure} from "@chakra-ui/react"
import { useRef, useState } from "react"
import Swal from "sweetalert2"


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
      await gen.json()

      const data = await fetch(`${process.env.NEXT_PUBLIC_BE}/org`)
      const res =await data.json()
      setOrg(res)
      onClose()
      Swal.fire({
        title: "Success",
        text: "successfully created organization dataset",
        icon: "success",
        timer: 3000
      })
      return res
    }catch(e){
      Swal.fire({
        title: "An error occured!",
        icon: "error"
      })
      console.log(e)
    }finally{
      setLoading(false)
      
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
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
    )
  }

  export default AddOrg

  