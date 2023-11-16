'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from '@components/profile'
export default function MyProfile(){

    
    const {data: session}= useSession();
    const router = useRouter();
    const [myPosts, setMyPosts] = useState([]);
    useEffect(()=>{

        const fetchPost = async() => {
        
            const response = await fetch('/api/prompt');
            const data = await response.json();

            setMyPosts(data);
        }

        fetchPost();
    },[]);

    const handleEdit= (promt)=>{
    
        router.push(`/update-prompt?id=${post.id}`)
    }

    const handleDelete= async (post)=>{
        
        const hasConfirm = confirm(
            "Are you sure you want to delete this prompt?"
        );

        if(hasConfirm){
            try{

                await fetch(`/api/prompt/${[post._id.toString()]}`,{
                    method: "DELETE"
                })

                const filterPosts = myPosts.filter((item) => item._id !== post._id);

                setMyPosts(filterPosts);
            } catch(err){
                console.log(err)
            }
        }

    }
    return(
        <Profile
        name="My"
        desc="Welcome to your personalized profile page"
        data={myPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        />
    )
}