import { useState } from 'react'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import OrgCard from '@/components/orgCard'
import AdminLayout from '@/components/AdminLayout'
import { FormControl, Grid, GridItem, Input, Link } from '@chakra-ui/react'
import AddOrg from '@/components/AddOrg'


const Org = ({orgs}) => {
    const [orgsData, setOrgsData] = useState(orgs)
    const [search, setSearch] = useState('')
  

  return (
    <AdminLayout>
      <FormControl>
          <Input type={'text'} placeholder="Search for organization" value={search} onChange={e => setSearch(e.target.value)} />
      </FormControl><br />
      <Grid templateColumns={{base:'repeat(1, 1fr)', md:'repeat(3, 1fr)'}} gap={5}>
          
              {(orgsData.filter(org => (((org.orgName).toLowerCase()).includes(search.toLowerCase())))).map((org, key)=> (
                  <Link href={`/admin/org/${org._id}`}><GridItem><OrgCard org={org} key={key} /></GridItem></Link>
              ))}
              <AddOrg setOrg={setOrgsData} />
          
      </Grid>
    </AdminLayout>
  )
}

export default withPageAuthRequired(Org)

export const getServerSideProps = async() => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_BE}/org`)
    const orgs = await req.json()

    return {
      props:{orgs}
    }
  }