"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/UpdateForm";
import { data } from "autoprefixer";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({ prompt: "", tag: "", publish:""});
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.text,
        tag: data.text,
        publish: data.publish
      });
    };
    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          text: post.prompt,
          tag: post.tag,
          publish: post.publish
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <h1>{post.publish}..</h1>
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
    </>
  );
};

export default UpdatePrompt;