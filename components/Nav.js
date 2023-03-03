import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Flex,
    HStack,
    IconButton,
    Image,
    useBreakpointValue,
  } from '@chakra-ui/react'
  import { FiMenu } from 'react-icons/fi'
  
  export const Nav = () => {
    const isDesktop = useBreakpointValue({ base: false, lg: true })
    return (
      <Box as="section">
        <Box as="nav" bg="bg-surface" boxShadow="sm">
          <Container maxW={'6xl'} py={{ base: '4', lg: '5' }}>
            <HStack spacing="10" justify="space-between">
              <Image src='mplogo.svg' />
              {isDesktop ? (
                <Flex justify="right" flex="1">
                  <ButtonGroup variant="link" spacing="8">
                    {['Product', 'Pricing', 'Resources'].map((item) => (
                      <Button key={item}>{item}</Button>
                    ))}
                  </ButtonGroup>
                  <HStack spacing="3">
                    <Button bg={"white"} border="1px solid black" ml="20px" borderRadius={"50px"}>Contact Support</Button>
                  </HStack>
                </Flex>
              ) : (
                <IconButton
                  variant="ghost"
                  icon={<FiMenu fontSize="1.25rem" />}
                  aria-label="Open Menu"
                />
              )}
            </HStack>
          </Container>
        </Box>
      </Box>
    )
  }