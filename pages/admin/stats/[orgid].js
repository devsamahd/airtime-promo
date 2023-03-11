import AdminLayout from "@/components/AdminLayout"
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client"
import { Center, Heading, Box, SimpleGrid, Stack, Text, Spinner } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export const Stat = (props) => {
    const { label, value, ...boxProps } = props
    return (
      <Box
        px={{ base: '4', md: '6' }}
        py={{ base: '5', md: '6' }}
        bg=""
        borderRadius="lg"
        boxShadow="lg"
        {...boxProps}
      >
        <Stack>
          <Text fontSize="sm" color="gray.500" display={'flex'} justifyContent="space-between">
            {label}
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" focusable="false" class="chakra-icon showcase-1hx74kd" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
          </Text>
          <Heading size={{ base: 'sm', md: 'md' }}>{value}</Heading>
        </Stack>
      </Box>
    )
  }

const SingleOrg = ({orgid}) => {
  
 const [stats, setStats] = useState([])
 const [orgs, setOrgs] = useState([])

 const [loading, setLoading] = useState(false)

 useEffect(()=>{
    setLoading(true)
    try{
        (async()=>{
            const orgreq = await fetch(`${process.env.NEXT_PUBLIC_BE}/org/${orgid}`)
            const org = await orgreq.json()
            setOrgs(org)
            setStats([{label:'Total Codes', value:org.codeCount},
            {label:'Total Unused Codes', value:org.codeCount-org.usedCode},
            {label:'Total used Codes', value:org.usedCode},
            {label:'Total Raffle Codes', value:org.raffleCode},
            {label:'Total used Raffle Codes', value:(org.raffleCode-org.unusedRaffleCode)},
            {label:'Total unused Raffle Codes', value:org.unusedRaffleCode},
            {label:'Total Airtime Codes', value:org.airtimeCode},
            {label:'Total used Airtime Codes', value:org.airtimeCode-org.unusedAirtimeCode},
            {label:'Total unused Airtime Codes', value:org.unusedAirtimeCode}])
        })()
        
    }catch(e){
        console.log(e)
    }finally{
        setLoading(false)
    }
 },[])
  return (
    <AdminLayout>
        {orgs && <Center><Heading size={"lg"}>{orgs.orgName}</Heading></Center>}
        {!loading?<Box as="section" py={{ base: '4', md: '8' }}>
                <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: '5', md: '6' }}>
                    {stats.map(({ label, value }) => (
                    <Stat key={label} label={label} value={value} />
                    ))}
                </SimpleGrid>
        </Box>:<Center>
        <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      /></Center>}
    </AdminLayout>
  )
}
export default withPageAuthRequired(SingleOrg) 

export const getServerSideProps = async({params})=>{
    const {orgid} = params
    
    return {
      props:{orgid}
  }
}