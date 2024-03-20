"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter instead of next/navigation
import Form from "@components/Form";

const EditIdea = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    idea: "",
    description: "",
  });

  useEffect(() => {
    const getIdeaDetails = async () => {
      if (!router.isReady) return; // Check if router is ready
      const ideaId = router.query.id;
      if (!ideaId) return;
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
  }, [router.isReady, router.query.id]); // Listen to changes in router.isReady and router.query.id

  const updateIdea = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/idea/${router.query.id}`, {
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

  if (!router.isReady) return null; // Render nothing until router is ready

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

export default EditIdea;
