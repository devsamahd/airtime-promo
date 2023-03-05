import Statistics from '@/components/Statistics'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'

 function stat(){
    return (
        <Statistics />
    )
}

export default withPageAuthRequired(stat)