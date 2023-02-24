import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle
} from '@chakra-ui/react';
import { useState } from 'react';


export default function RedeemForm(){
  const [code, setCode] = useState('')
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('')

  const redeem = async() => {
    if(!code || !number) {
      setMessage('Please complete the form')
      return setStatus('warning')
    }
    if(!((/^[0-9]{10,11}$/).test(number))){
      setMessage('Invalid number')
      return setStatus('warning')
    }

    const red = await fetch(`${process.env.NEXT_PUBLIC_BE}/generateCode`,
    {
     method:'PUT',
     headers: {
       'Content-Type': 'application/json'
     },
     body:JSON.stringify({code})
   })

  const res = await red.json()

  if(res.status === 404) {
    setMessage('Code does not exist sorry')
    return setStatus('error')
  }else if(res.status === 403){
    setMessage('Code has been used, sorry!')
    return setStatus('error')
  }
  setMessage(`Congrats your number ${number} has been credited with #${res.value} worth of airtime`)
  return setStatus('success')
  }

  
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Redeem your code now
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          Enter the code you have below to claim your airtime. This field is case sensitive!
        </Text>
        <FormControl id="number">
          <Input
            placeholder="Your phone number here"
            _placeholder={{ color: 'gray.500' }}
            type="number"
            value={number}
            onChange={(e)=> setNumber(e.target.value)}
          />
        </FormControl>
        <FormControl id="code">
          <Input
            placeholder="Your code here"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={code}
            onChange={(e)=> setCode(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={'blue.400'}
            color={'white'}
            onClick={redeem}
            _hover={{
              bg: 'blue.500',
            }}>
            Redeem
          </Button>
        </Stack>
        {status && <Alert status={status}>
          <AlertIcon />
          <AlertTitle>{message}</AlertTitle>
        </Alert>}
      </Stack>
    </Flex>
  );
}