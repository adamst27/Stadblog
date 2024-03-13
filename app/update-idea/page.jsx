"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
const editIdea = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    idea: "",
    description: "",
  });
  const ideaId = searchParams.get("id");
  useEffect(() => {
    const getIdeaDetails = async () => {
      const response = await fetch(`/api/idea/${ideaId}`);
      const data = await response.json();
      setPost({
        idea: data.idea,
        description: data.description,
      });
    };
    if (ideaId) getIdeaDetails();
  }, [ideaId]);
  const updateIdea = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!ideaId) return alert("idea id not found");
    try {
      const res = await fetch(`/api/idea/${ideaId}`, {
        method: "PATCH",
        body: JSON.stringify({
          idea: post.idea,
          description: post.description,
        }),
      });
      if (res.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  console.log(post);
  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateIdea}
    />
  );
};

export default editIdea;
