import {  useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import {Heading } from '@chakra-ui/react'
import AdminLayout from '@/components/AdminLayout'
import Meta from '@/components/Meta'

const Home =() => {
 const {user} = useUser()

  return (
    <AdminLayout>
        <Meta title={"MarketPro NG 💚 - Admin"} />
        <Heading size={'xl'} fontFamily={"monospace"}>Welcome {user.nickname},</Heading>
    </AdminLayout>
  )
}
const protectedRoute = withPageAuthRequired(Home)
export default protectedRoute

