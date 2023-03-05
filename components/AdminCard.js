import { Box } from "@chakra-ui/react"
import { FaCompass } from "react-icons/fa"


const AdminCard = ({cardInfo}) => {
    
  
    return (
      <Box maxW='sm' w={'xsm'} borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Box p='6'>
          <FaCompass />
          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            noOfLines={1}
          >
            {cardInfo.do}
          </Box>
  
          <Box>
            {cardInfo.desc}
          </Box>
        </Box>
      </Box>
    )
  }

  export default AdminCard

  