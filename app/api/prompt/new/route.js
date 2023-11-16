// import { connectToDB } from "@utlis/database";
// import Prompt from "@models/prompt";

// export const POST = async (req)=>{

//     const { userId, prompt, tag } = await req.json();
    
//     try{

//        await connectToDB();
       
//        const newPrompt = new Prompt({
//         creator: userId,
//         prompt,
//         tag
//        })

//        await newPrompt.save();

//        return new Response(JSON.stringify(newPrompt),{
//         status: 201
//        })
//     } catch(err){
//     return new Response("Failed to create a new Prompt", { status: 500})
//     }
// }
import { PrismaClient, Prisma} from '@prisma/client'

const prisma = new PrismaClient();

export const POST = async (req)=>{

  const { publish, text, tag} = await req.json();

  try{
    const createdPrompt = await prisma.prompt.create({
      data: {
        text,
        tag,
        publish,
      }
    });
    return new Response(JSON.stringify(createdPrompt),{
      status: 201
    })
  } catch(err){
    return new Response(err, { status: 500})
  }
}
