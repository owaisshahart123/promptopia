// import { connectToDB } from "@utlis/database";
// import Prompt from "@models/prompt";

// export const GET = async(req)=>{

//     try{

//         await connectToDB();

//         const prompts = await Prompt.find({}).populate('creator');

//         return new Response(JSON.stringify(prompts),{
//             status: 200
//         })
//     } catch(err){
//         return new Response("Failed  to fetch all prompts",{
//             status: 500
//         })
//     }
// }
import { PrismaClient, Prisma} from '@prisma/client'

const prisma = new PrismaClient();

export const GET = async(req)=>{
    try{

        const prompts = await prisma.prompt.findMany({
            where: {
                publish: true
            }
        });
        return new Response(JSON.stringify(prompts),{
            status: 200
        })
    } catch(err){
        return new Response(err,{
                   status: 500
        })
    }
}