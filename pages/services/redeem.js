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
    AlertTitle,
    Skeleton
  } from '@chakra-ui/react';
  import { useState } from 'react';
  
  
  export default function RedeemForm(){
    const [code, setCode] = useState('')
    const [number, setNumber] = useState('')
    const [status, setStatus] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
  
    const redeem = async() => {
      setLoading(true)
      try{
        
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
        body:JSON.stringify({code, number})
      })
  
      const res = await red.json()
  
      if(res.status === 404) {
        setMessage('Code does not exist sorry')
        return setStatus('error')
      }else if(res.status === 403){
        setMessage('Code has been used, sorry!')
        return setStatus('error')
      }else if(res.status === 400){
        setMessage('Bad request, Please try again later')
        return setStatus('info')
      }else if(res.status === 401){
        setMessage()
        return setStatus()
      }else if(res.type === "raffle"){
        setMessage(`Congrats your number ${number} has been added to the raffle draw`)
        return setStatus('success')
      }
      setMessage(`Congrats your number ${number} has been credited with #${res.value} worth of airtime`)
      return setStatus('success')
      }catch(e){
        console.log(e)
      }finally{
        setLoading(false)
      }
      
    }
  
    
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        backgroundImage={"url('winbg.png')"}
        >
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
            Redeem code
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}>
            Enter the code you have below to claim your airtime.
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
          {loading ?
          <Stack>
          <Skeleton height='70px' />
        </Stack>:
        <Button
        bg={'blue.400'}
        color={'white'}
        onClick={redeem}
        _hover={{
          bg: 'blue.500',
        }}>
        Redeem
      </Button>
          }
            
          </Stack>
          {status && <Alert status={status}>
            <AlertIcon />
            <AlertTitle>{message}</AlertTitle>
          </Alert>}
        </Stack>
      </Flex>
    );
  }