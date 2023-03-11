import AdminLayout from "@/components/AdminLayout"
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client"
import { Center, Heading } from "@chakra-ui/react"
const SingleOrg = ({orgs}) => {
 
  return (
    <AdminLayout>
        <Center><Heading size={"lg"}>{orgs.orgName}</Heading>Stats</Center>
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