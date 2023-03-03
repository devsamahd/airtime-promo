import { Box, Badge } from "@chakra-ui/react"
import { FiStar } from "react-icons/fi"


const OrgCard = ({org}) => {
    
  
    return (
      <Box maxW='sm' w={'xsm'} borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Box p='6'>
          <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='full' px='2' colorScheme='teal'>
              New
            </Badge>
            <Box
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
              ml='2'
            >
              {org.codeCount} code(s) &bull; 0 used
            </Box>  
          </Box>
  
          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            noOfLines={1}
          >
            {org.orgName}
          </Box>
  
          <Box>
            Since {org.createdAt}
          </Box>
  
          <Box display='flex' mt='2' alignItems='center'>
            {Array(5)
              .fill('')
              .map((_, i) => (
                <FiStar
                  key={i}
                />
              ))}
            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
              0redeems/day
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }

  export default OrgCard

  