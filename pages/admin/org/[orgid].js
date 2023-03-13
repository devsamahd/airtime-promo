import AdminLayout from "@/components/AdminLayout"
import Codes from "@/components/Codes"
import FilterDrawer from "@/components/FilterDrawer"
import EditOrg from "@/components/Settings"
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client"
import { Box, Center, Heading, Input, Spinner } from "@chakra-ui/react"
import { useState, useEffect } from "react"

const SingleOrg = ({orgid, orgN}) => {
  const [orgName, setOrgName] = useState(orgN)
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [res, setRes] = useState([])
  const [loading,setLoading] = useState(false)
  const [page, setPage] = useState([0,10])
  const [pn, setPn] = useState(1)
  const [pages, setPages] = useState(0) 
  const [cnt, setCnt] = useState(0)

  

  const increment = () => {
    if(page[0]+10 >= pages*10){
        setPage([(pages*10)-10, 10])
      }else{
        setPn(prev => prev+1)
        setPage(prev => [parseInt(prev[0])+10, 10])
      }
    
  }

  
  const decrement = () => {
    if(page[0] <= 0){
        setPage([0, 10])
      }else{
        setPn(prev => prev-1)
        setPage(prev => [parseInt(prev[0])-10, 10])
      }
    
  }

  

  const setcrement = (pager) => {
    setPn(pager)
    if(pager>=pages)
    {
      setPn(prev=>prev)
    }
    else{
      setPn(pager)
      setPage([pager-1 >=0?(pager-1)*10:0, 10])
  }
  }
  useEffect(()=>{
    (async()=>{
      try{
        setLoading(true)
        const data = await fetch(`${process.env.NEXT_PUBLIC_BE}/generateCode/${orgid}/?skip=${page[0]}&limit=${10}&type=${type?type:''}&status=${status?status:''}`)
        const resp = await data.json()
        setPages(Math.round(parseInt(resp.count)/10))
        setRes(resp.resp)
        setCnt(resp.count)
      }catch(e){
        console.log(e)
      }finally{
        setLoading(false)
      }
    
    })()
    
  },[page, type, status])

  
  

  return (
    <AdminLayout>
        <Heading size={'lg'} display={'flex'} justifyContent={'space-between'}> <Box display={'flex'}>{orgName} <Box fontSize={'xl'}><EditOrg orgid={orgid} setOrg={setOrgName} /></Box></Box><Box fontSize={'lg'}><FilterDrawer setType={setType} setStatus={setStatus} status={status} type={type} /></Box></Heading>
        <br /><br /><br /><br />
        {loading ? 
        <Center>
        <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      /></Center>
        :<>
          <Codes pg={page[0]} res={res} orgname={orgName} codeCount={cnt} setPage={setPage} resp={res} orgid={orgid} tp={type} st={status} /><br /><br /><br />
          <Box display={'flex'} justifyContent={'space-evenly'}>
            <Input width={20} type={'submit'} onClick={decrement} disabled={pn > 1 ? false : true}  value="Prev" />
            <Box>Page <Input type={'number'} onChange={e=>setcrement(e.target.value)} width="45px" value={pn} border="0" /> of {pages}</Box>
            <Input bg={"green.500"} color="white" width={20} type={'submit'} onClick={increment} disabled={pn < pages? false : true}  value="Next" />
          </Box>
        </>}
    </AdminLayout>
  )
}
export default withPageAuthRequired(SingleOrg) 

export const getServerSideProps = async({params})=>{
    const {orgid} = params
    const orgreq = await fetch(`${process.env.NEXT_PUBLIC_BE}/org/${orgid}`)
    const orgs = await orgreq.json()
    const orgN = orgs.orgName
    return {
      props:{orgid, orgN }
  }
}