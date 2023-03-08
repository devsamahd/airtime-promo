import Statistics from '@/components/Statistics'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'

 function stat({resp}){
    console.log(resp)
    return (
        <Statistics />
    )
}

export default withPageAuthRequired(stat)

export const getStaticProps = async() => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BE}/stats`)
    const resp = await data.json()
    return {
        props:{resp}
    }
}