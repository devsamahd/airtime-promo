import {  useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import {Grid, GridItem, Heading } from '@chakra-ui/react'
import AdminLayout from '@/components/AdminLayout'
import Meta from '@/components/Meta'
import AdminCard from '@/components/AdminCard'

const Home =() => {
 const {user} = useUser()
 const AdmData = [
  {
    _id:0,
    do:"Create Raffle/Airtime Promo",
    desc:"Start a new raffle/airtime promo campaign for a new organization or edit already existing ones."
  },
  {
    _id:1,
    do:"View General Stats",
    desc:"View your own stats(orgs count, promo count etc) and see how things are playing out on the platform."
  },
 ]

  return (
    <AdminLayout>
        <Meta title={"MarketPro NG 💚 - Admin"} />
        <Heading size={'xl'} fontFamily={"monospace"}>Welcome {user.nickname},</Heading><br /><hr /><br />
        <Grid templateColumns={{base:'repeat(1, 1fr)', md:'repeat(3, 1fr)'}} gap={5}>
          {AdmData.map((adm, key)=> (
              <GridItem onClick={() => setOrgid(adm._id)}><AdminCard cardInfo={adm} key={key} /></GridItem>
          ))}
        </Grid>
    </AdminLayout>
  )
}
const protectedRoute = withPageAuthRequired(Home)
export default protectedRoute

