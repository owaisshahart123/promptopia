'use client'
import Link from "next/link";
import { useState } from "react";



export default function Form({
    type, post, setPost, submiting, handleSubmit,
}) {
    const [isChecked, setIsChecked] = useState(true);
    
    console.log(post.publish)

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        setPost({ ...post, publish: !isChecked})
        console.log(post.publish)
    
    };
    return (
        <section className=" w-full max-w-full flex-start flex-col">
            <h1 className="head_text text-left">
                <span className=" blue_gradient">{type} Post</span>
            </h1>
            <p className=" desc text-left max-w-md">
                {type} and Share amzing prompt with the world, and
                let your imagination run wild with any Ai-Powred Platform.
                {isChecked}....
            </p>

            <form
                onSubmit={handleSubmit}
                className=" mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
            >
                <label>
                    <span className=" font-satoshi w-full flex justify-between font-semibold text-base text-gray-700">Your Ai Prompt <label class="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            checked={post ? post.publish & isChecked: isChecked}
                            onChange={handleCheckboxChange}
                        />
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Publish</span>
                    </label></span>
                    <textarea
                        value={post.prompt}
                        onChange={(e) => setPost({
                            ...post,
                            prompt: e.target.value
                        })}
                        placeholder="Write your prompt here..."
                        required
                        className=" form_textarea"
                    />
                </label>
                <label>
                    <span className=" font-satoshi font-semibold text-base text-gray-700">Tag {' '}</span>
                    <span className=" font-normal">(#product, #webdevelopment, #idea)</span>
                    <input
                        value={post.tag}
                        onChange={(e) => setPost({ ...post, tag: e.target.value })}
                        type="text"
                        placeholder="#tag"
                        required
                        className=" form_input"
                    />
                </label>

                <div className=" flex-end max-3 mb-5 gap-4">
                    <Link className=" text-gray-500 text-sm " href="/">
                        Cancel
                    </Link>

                    <button type="submit"
                        className=" px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
                        disabled={submiting}>
                        {submiting ? `${type}...` : type}
                    </button>
                </div>
            </form>
        </section>
    )
}