"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const editIdea = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    idea: "",
    description: "",
  });
  const searchParams = useSearchParams();
  const ideaId = searchParams.get("id");

  useEffect(() => {
    const getIdeaDetails = async () => {
      if (!ideaId) return; // Corrected to check for `ideaId` instead of `id`
      try {
        const response = await fetch(`/api/idea/${ideaId}`);
        const data = await response.json();
        setPost({
          idea: data.idea,
          description: data.description,
        });
      } catch (error) {
        console.error("Error fetching idea details:", error);
      }
    };
    getIdeaDetails();
  }, [ideaId]);

  const updateIdea = async (e) => {
    e.preventDefault();
    setSubmitting(true);
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
      } else {
        console.error("Failed to update idea:", res.statusText);
      }
    } catch (error) {
      console.error("Error updating idea:", error);
    } finally {
      setSubmitting(false);
    }
  };

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
