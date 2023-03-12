import { Footer } from '@/components/Footer'
import Hero from '@/components/hero'
import Meta from '@/components/Meta'
import { Nav } from '@/components/Nav'
import { Box, Image, SimpleGrid, Stack } from '@chakra-ui/react'
import React from 'react'

// Our expertise and relationships with all the Network Providers in Nigeria has made this technology a plug and play innovation specifically tailored for the FMCG industry. 

// Our clientele in the retail and consumer industry trust us to manage their promos, marketing campaigns and brand activations for market share acquisition, this translates to more sales.

const index = () => {
  return (
    <>
    <Meta title={"MarketPro NG 💚"} />
    <Nav />
    <Stack bg={'#FFF7EB'}>
    <Hero />
    <SimpleGrid columns={4}>
      <Box>
        <Image src='one.svg' />
      </Box>
      <Box>
        <Image src='two.svg' />
      </Box>
      <Box>
        <Image src='three.svg' />
      </Box>
      <Box>
        <Image src='four.svg' />
      </Box>
    </SimpleGrid>
    </Stack>
    <Footer />
    </>
  )
}

export default index