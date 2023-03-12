import {
    Container,
    Stack,
    Flex,
    Box,
    Heading,
    Text,
    Button,
    Image,
    Link
  } from '@chakra-ui/react';
import Scroll from './Scroll';
  
  export default function Hero() {
    return (
      <Box bg={'#FFF7EB'}>
      <Container maxW={'6xl'}>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 0 }}
          py={{ base: 14, md: 20 }}
          direction={{ base: 'column', md: 'row' }}>
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: 'column', sm: 'row' }}>
                <Button border="1px solid black" bg={"white"} ml="10px" borderRadius={"50px"}>Contact Us</Button>
                <Link href='/services/redeem'><Button border="1px solid black" bg={"blue.500"} color="white" ml="10px" borderRadius={"50px"}>Redeem Code</Button></Link>
            </Stack>
            <Heading
              lineHeight={1}
              fontWeight={500}
              fontFamily={'monospace'}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
              <Text
                as={'span'}
                position={'relative'}>
                We help remarkable companies
              </Text>
              <br />
              <Text as={'span'} fontWeight={600} color={'grey.900'}>
                Grow
              </Text>
            </Heading>
            <Text color={'gray.600'} w={'90%'}>
            MarketPro is a premium airtime & data vending solution built for BRAND-LOYALTY-REWARD for FMCG brands doing business in Nigeria.            </Text>
            
          </Stack>
          <Flex
            flex={1}
            justify={'center'}
            align={'center'}
            position={'relative'}
            w={'full'}>
            <Box
              position={'relative'}
              height={'500px'}
              rounded={'2xl'}
              boxShadow={'2xl'}
              width={'full'}
              overflow={'hidden'}>
              <Image
                alt={'Hero Image'}
                fit={'cover'}
                align={'center'}
                w={'100%'}
                h={'100%'}
                src={
                    'ggg.svg'
                }
              />
            </Box>
          </Flex>
        </Stack>
      </Container>
      <Scroll /><br /><br />
      </Box>
    );
  }
  