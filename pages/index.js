import { Footer } from '@/components/Footer'
import Hero from '@/components/hero'
import Meta from '@/components/Meta'
import { Nav } from '@/components/Nav'
import { Stack } from '@chakra-ui/react'
import React from 'react'

const index = () => {
  return (
    <>
    <Meta title={"MarketPro NG 💚"} />
    <Nav />
    <Stack bg={'#FFF7EB'}>
    <Hero />
    
    </Stack>
    <Footer />
    </>
  )
}

export default index