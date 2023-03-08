import AdminLayout from "@/components/AdminLayout"
import Codes from "@/components/Codes"
import FilterDrawer from "@/components/FilterDrawer"
import EditOrg from "@/components/Settings"
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client"
import { Box, Heading, Text } from "@chakra-ui/react"
import { useState } from "react"

const SingleOrg = ({resp, org}) => {
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [res, setRes] = useState(resp)

  const actual = res.filter(res => (res.type).includes(type) && ((res.usable).toString()).includes(status.toString()))

  return (
    <AdminLayout>
        <Heading size={'lg'} display={'flex'} justifyContent={'space-between'}> <Box display={'flex'}>{org.orgName} <Box fontSize={'xl'}><EditOrg orgid={org._id} /></Box></Box><Box fontSize={'lg'}><FilterDrawer setType={setType} setStatus={setStatus} status={status} type={type} /></Box></Heading>
        <br /><br />
        <Text>Created:</Text>
        <Codes res={actual} orgname={org.orgName} setRes={setRes} resp={resp} orgid={org._id} />
    </AdminLayout>
  )
}
export default withPageAuthRequired(SingleOrg) 

export const getStaticProps = async({params})=>{
    const {orgid} = params
    const data = await fetch(`${process.env.NEXT_PUBLIC_BE}/generateCode/${orgid}`)
    const resp = await data.json()
    
    const orgreq = await fetch(`${process.env.NEXT_PUBLIC_BE}/org/${orgid}`)
    const org = await orgreq.json()

    return {
      props:{resp, org}
  }
}
  
  export const getStaticPaths = async () => {
      const data = await fetch(`${process.env.NEXT_PUBLIC_BE}/org`)
      const res = await data.json()
      const paths =await res.map(org => ({params:{orgid:(org._id).toString()}}))
      return {
          paths,
          fallback: false
      }
  }