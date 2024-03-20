"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdateIdea = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ideaId = searchParams.get("id");

  const [post, setPost] = useState({ idea: "", description: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/idea/${ideaId}`);
      const data = await response.json();

      setPost({
        idea: data.idea,
        description: data.description,
      });
    };

    if (ideaId) getPromptDetails();
  }, [ideaId]);

  const updateIdea = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!ideaId) return alert("Missing ideaId!");

    try {
      const response = await fetch(`/api/idea/${ideaId}`, {
        method: "PATCH",
        body: JSON.stringify({
          idea: post.idea,
          description: post.description,
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
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateIdea}
    />
  );
};

export default UpdateIdea;
