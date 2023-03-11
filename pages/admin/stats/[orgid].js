import AdminLayout from "@/components/AdminLayout"
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client"
import { Center, Heading, Box, SimpleGrid, Stack, Text } from "@chakra-ui/react"

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

const SingleOrg = ({orgs}) => {
 const stats = [
    {label:'Total Codes', value:orgs.codeCount},
    {label:'Total Unused Codes', value:orgs.unusedCode},
    {label:'Total used Codes', value:orgs.usedCode},
    {label:'Total Raffle Codes', value:orgs.raffleCode},
    {label:'Total used Raffle Codes', value:(orgs.raffleCode-orgs.unusedRaffleCode)},
    {label:'Total unused Raffle Codes', value:orgs.unusedRaffleCode},
    {label:'Total unused Airtime Codes', value:orgs.airtimeCode},
    {label:'Total used Raffle Codes', value:orgs.airtimeCode-orgs.unusedAirtimeCode},
    {label:'Total unused Raffle Codes', value:orgs.unusedAirtimeCode},
 ]
  return (
    <AdminLayout>
        <Center><Heading size={"lg"}>{orgs.orgName}</Heading>Stats</Center>
        <Box as="section" py={{ base: '4', md: '8' }}>
            
                <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: '5', md: '6' }}>
                    {stats.map(({ label, value }) => (
                    <Stat key={label} label={label} value={value} />
                    ))}
                </SimpleGrid>
        </Box>
    </AdminLayout>
  )
}
export default withPageAuthRequired(SingleOrg) 

export const getServerSideProps = async({params})=>{
    const {orgid} = params
    const orgreq = await fetch(`${process.env.NEXT_PUBLIC_BE}/org/${orgid}`)
    const orgs = await orgreq.json()
    return {
      props:{orgs}
  }
}