"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router
import Form from "@components/Form";

const editIdea = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    idea: "",
    description: "",
  });
  const { id } = router.query; // Access query directly from router

  useEffect(() => {
    const getIdeaDetails = async () => {
      if (!id) return; // Exit early if id is not present
      try {
        const response = await fetch(`/api/idea/${id}`);
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
  }, [id]);

  const updateIdea = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/idea/${id}`, {
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
