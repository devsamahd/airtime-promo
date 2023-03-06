import AdminLayout from "@/components/AdminLayout"
import Codes from "@/components/Codes"
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client"
import { Heading, Text } from "@chakra-ui/react"

const SingleOrg = ({resp, orgid}) => {
  return (
    <AdminLayout>
        <Heading size={'lg'}>CocaCola Inc</Heading><br /><br />
        <Text>Created:</Text>
        <Codes resp={resp} orgid={orgid} />
    </AdminLayout>
  )
}

export default withPageAuthRequired(SingleOrg) 

export const getStaticProps = async({params})=>{
    const {orgid} = params
    const data = await fetch(`${process.env.NEXT_PUBLIC_BE}/generateCode/${orgid}`)
    const resp = await data.json()

    return {
      props:{resp, orgid}
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