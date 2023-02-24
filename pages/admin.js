import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import CustomTable from '@/components/table'
import { Button, Container, FormControl, Input, Skeleton, Stack } from '@chakra-ui/react'
import Head from 'next/head'
import { useState } from 'react'

const Home =({resp}) => {
  const [res, setRes] = useState(resp)
  const [number, setNumber] = useState(0)
  const [loading, setLoading] = useState(false)
  const generate = async(e) => {
    e.preventDefault()
    try{
      setLoading(true)
      const gen = await fetch('http://127.0.0.1:310/generateCode',
      {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({'quantity':number})
      })
      const res = await gen.json()
      return res
    }catch(e){
      console.log(e)
    }finally{
      const data = await fetch('http://127.0.0.1:310/generateCode')
      const res =await data.json()
      setRes(res)
      setLoading(false)
    }
    
  }
  return (
    <Container maxW='5xl'>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>  
      <br /><br />
      <FormControl id="number">
          <Input
            placeholder="Number of codes to generate"
            _placeholder={{ color: 'gray.500' }}
            type="number"
            value={number}
            onChange={(e)=> setNumber(e.target.value)}
          />
        </FormControl><br /><Button onClick={generate}>generate</Button> <br /><br />
        {loading ?
        <Stack>
        <Skeleton height='50px' /><br />
        <Skeleton height='50px' /><br />
        <Skeleton height='50px' />
      </Stack>:
      <CustomTable tvalue={res.reverse()} />
        }
    </Container>
  )
}
const protectedRoute = withPageAuthRequired(Home)
export default protectedRoute

export const getStaticProps = async() => {
  const data = await fetch('http://127.0.0.1:310/generateCode')
  const resp = await data.json()
  return {
    props:{resp}
  }
}