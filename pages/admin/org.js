import { useState } from 'react'
import Codes from '@/components/Codes'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import OrgCard from '@/components/orgCard'
import AdminLayout from '@/components/AdminLayout'
import { Grid, GridItem } from '@chakra-ui/react'
import AddOrg from '@/components/AddOrg'


const Org = ({resp, orgs}) => {
    const [orgsData, setOrgsData] = useState(orgs)
    const [page, setPage] = useState([0,10])
    const [type, setType] = useState(null)
    const [res, setRes] = useState(resp.slice(page[0],page[1]))
    const [number, setNumber] = useState(0)
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState(0)
    const [orgid, setOrgid] = useState(null)
  
    const increment = () => {
      setPage([page[0]+10, page[1]+10])
    }
    const decrement = () => {
      setPage([page[0]-10, page[1]-10])
    }
  
  
    const generate = async(e) => {
      e.preventDefault()
      try{
        setLoading(true)
        const gen = await fetch(`${process.env.NEXT_PUBLIC_BE}/generateCode`,
        {
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({'quantity':number, type, value})
        })
        const res = await gen.json()
        return res
      }catch(e){
        console.log(e)
      }finally{
        const data = await fetch(`${process.env.NEXT_PUBLIC_BE}/generateCode`)
        const res =await data.json()
        setRes(res)
        setLoading(false)
      }
      
    }

    

  return (
    <AdminLayout>
        {
            orgid ? 
            <>
                <Codes orgid={orgid} resp={resp} />
            </>
            :
            <>
            <Grid templateColumns={{base:'repeat(1, 1fr)', md:'repeat(3, 1fr)'}} gap={5}>
                
                    {orgsData.map((org, key)=> (
                        <GridItem onClick={() => setOrgid(org._id)}><OrgCard org={org} key={key} /></GridItem>
                    ))}
                    <AddOrg setOrg={setOrgsData} />
                
            </Grid>
            </>
        }
    </AdminLayout>
  )
}

export default withPageAuthRequired(Org)

export const getServerSideProps = async() => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BE}/generateCode`)
    const resp = await data.json()
    const req = await fetch(`${process.env.NEXT_PUBLIC_BE}/org`)
    const orgs = await req.json()

    return {
      props:{resp, orgs}
    }
  }