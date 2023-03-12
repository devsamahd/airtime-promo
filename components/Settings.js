import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { FiSettings } from "react-icons/fi"
import Swal from "sweetalert2"


const EditOrg = ({ orgid, setOrg }) => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(false)
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  const [orgname, setOrgname] = useState('')
  const [del, setDel] = useState('')
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
      await setOrg(res.orgName)
      onClose()
      Swal.fire({
        title: "Success",
        text: "Org name updated successfully",
        icon: "success",
        timer: 3000
      })
      return res
    }catch(e){
      console.log(e)
    }finally{
      setLoading(false)

    }
  }

  const rundelete = async() => {
    const gen = await fetch(`${process.env.NEXT_PUBLIC_BE}/org/${orgid}`,
      {
        method:'DELETE'
      })
      const res = await gen.json()
      if (res) router.push('/admin/org')
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
              <FormLabel>New Organization Name:</FormLabel>
              <Input ref={initialRef} placeholder='New Org name' value={orgname} onChange={e => setOrgname(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Delete Organization:</FormLabel>
              <FormLabel color={'gray.600'}>Enter "delete" to activate delete button.</FormLabel>
              <Input ref={initialRef} placeholder='Enter here' value={del} onChange={e => setDel(e.target.value)} /><br/><br />
              {del.toLowerCase()==="delete"&&<Button border="1px solid red" onClick={rundelete}>Delete</Button>}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={upOrg}>
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
    )
  }

  export default EditOrg

  