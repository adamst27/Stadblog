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
      const ideaId = router.query.id; // Fetch ideaId from router.query
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
  }, [router.query.id]); // Listen to changes in router.query.id

  const updateIdea = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/idea/${router.query.id}`, {
        // Use router.query.id
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

export default EditIdea;
