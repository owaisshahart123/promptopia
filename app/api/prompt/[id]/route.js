import {PrismaClient, Prisma} from '@prisma/client'

const prisma = new PrismaClient();
import { connectToDB } from "@utlis/database";
import Prompt from "@models/prompt";
// Get (read)
// export const GET = async(req, {params})=>{

//     try{

//         await connectToDB();

//         const prompt = await Prompt.findById(params.id).populate('creator');

//         if(!prompt) return new Response("Prompt not found 404",{
//             status: 404
//         });

//         return new Response(JSON.stringify(prompt),{
//             status: 200
//         })
//     } catch(err){
//         return new Response("Failed  to fetch all prompt",{
//             status: 500
//         })
//     }
// }
export const GET = async(req, {params}) =>{

    try{

        const prompt = await prisma.prompt.findUnique({
            where: {
                id: parseInt(params.id)
            }
        })
        return new Response(JSON.stringify(prompt),{
               status: 200
              })
    } catch(err){
        return new Response(err,{
         status: 500
    })
    }
}
// Patch (update)
// export const PATCH = async (request, { params }) => {
//     const { prompt, tag } = await request.json();

//     try {
//         await connectToDB();

//         const existingPrompt = await Prompt.findById(params.id);

//         if (!existingPrompt) {
//             return new Response("Prompt not found", { status: 404 });
//         }

//         existingPrompt.prompt = prompt;
//         existingPrompt.tag = tag;

//         await existingPrompt.save();

//         return new Response("Successfully updated the Prompts", { status: 200 });
//     } catch (error) {
//         return new Response("Error Updating Prompt", { status: 500 });
//     }
// };

export const PATCH = async (req, { params }) => {
    const { publish, text, tag} = await req.json();

    try{
        const updatedPost = await prisma.prompt.update({
            where: {
              id: parseInt(params.id)
            },
            data: {
                text,
                tag,
                publish,
              },
        })
        return new Response("edited prompt", { status: 200 });

    } catch(err){
         return new Response(err, { status: 500 });
    }
}
// Delete (delete)

// export const DELETE = async (request, { params }) => {

    
//     try {
//         await connectToDB();

//         // Find the prompt by ID and remove it
//         await Prompt.findByIdAndDelete(params.id);

//         return new Response("Prompt deleted successfully", { status: 200 });
//     } catch (error) {
//         return new Response("Error deleting prompt", { status: 500 });
//     }
// };

export const DELETE = async(req, { params }) =>{
    try{
        
        await prisma.prompt.delete({
            where: {
                id: parseInt(params.id)
            }
        })
        return new Response("Prompt deleted successfully", { status: 200 });
    } catch(err){
        return new Response(err, { status: 500 });
    }
}