import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    FormControl,
    Select,
    FormLabel,
  } from '@chakra-ui/react'
import { useRef } from 'react'

function FilterDrawer({status, type, setType, setStatus}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
  
    return (
      <>
        <Button ref={btnRef} colorScheme='green' onClick={onOpen}>
          Filter
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>
  
            <DrawerBody>
              <FormControl>
                <FormLabel>Type:</FormLabel>
                <Select value={type} onChange={e => setType(e.target.value)}>
                    <option value={''}>All</option>
                    <option value={'airtime'}>Airtime</option>
                    <option value={'raffle'}>Raffle</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Status:</FormLabel>
                <Select value={status} onChange={e => setStatus(e.target.value)}>
                    <option value={''}>all</option>
                    <option value={true}>Valid</option>
                    <option value={false}>used</option>
                </Select>
              </FormControl>
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

  export default FilterDrawer