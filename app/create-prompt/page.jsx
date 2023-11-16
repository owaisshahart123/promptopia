'use client';
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

export default function CreatePrompt(){

    const router = useRouter();
    const {data: session } = useSession();

    const [submiting, setSubmiting]= useState(false);
    const [post, setPost]= useState({
        prompt: '',
        tag: '',
        publish: true
    });

    const CreatePrompt = async (e)=>{
    e.preventDefault();
    setSubmiting(true);

    try{
    
        const response = await fetch('/api/prompt/new',{
            method: 'Post',
            body: JSON.stringify({
                // userId: session?.user.id,
                text: post.prompt,
                tag: post.tag,
                publish: post.publish
            }),
        })
        if(response.ok){
            router.push('/')
        }
    } catch(err){
    console.log(err)
    } finally {
        setSubmiting(false)
    }
    };

    return(
        <Form
        type="Create"
        post={post}
        setPost={setPost}
        submiting={submiting}
        handleSubmit={CreatePrompt}
        />
    )
}