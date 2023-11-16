'use client';
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({data, handleTagClick})=>{
    return(
        <div className=" mt-16 prompt_layout">
        {data.map((post)=> (
            <PromptCard
            key={post.id}
            post={post}
            handleTagClick={handleTagClick}
            />
        ))}
        </div>
    )
}



export default function xFeed(){
    
    const [searchText, setSearchText]= useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [posts, setPosts] = useState([]);
    const [searchedResults, setSearchedResults] = useState([]);


    

 
    useEffect(()=>{

        const fetchPost = async() => {
        
            const response = await fetch('/api/prompt');
            const data = await response.json();

            setPosts(data);
        }

        fetchPost();
    },[]);

    const filterPrompts = (searchText)=>{
        const regex = new RegExp(searchText, "i");
        return posts.filter(
            (item)=> 
            regex.test(item.creator.username) ||
            regex.test(item.tag) ||
            regex.test(item.prompt)
        )

    }

    const handleSearch = (e)=>{
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        setSearchTimeout(
        setTimeout(()=>{
            const searchResult = filterPrompts(e.target.value);
            setSearchedResults(searchResult);
        }, 500)
        );
    }
    const handleTagClick = (tagName) => {
        setSearchText(tagName);
    
        const searchResult = filterPrompts(tagName);
        setSearchedResults(searchResult);
      };
    
    

    return (
        <section className=" feed">
            <form className=" relative w-full flex-center" >
            <input type="text"
            placeholder="Search for a tag or a username"
            value={searchText}
            onChange={handleSearch}
            className="search_input peer"
            />
            </form>

           {/* {searchText ? (
             <PromptCardList
             data={searchedResults}
             handleTagClick={handleTagClick}
             />
           ) : ( <PromptCardList
            data={posts}
            handleTagClick={handleTagClick}
            />
            
           )}
            */}
            <PromptCardList
            data={posts}
            handleTagClick={handleTagClick}
            />
        </section>
    )
}