"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Form from "@components/Form";

const EditIdea = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    idea: "",
    description: "",
  });

  useEffect(() => {
    if (!router.isReady) return; // Wait until router is ready
    const fetchIdeaDetails = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const ideaId = searchParams.get("id");
      if (!ideaId) return;
      try {
        const response = await fetch(`/api/idea/${ideaId}`);
        if (!response.ok) throw new Error("Failed to fetch idea details");
        const data = await response.json();
        setPost({
          idea: data.idea,
          description: data.description,
        });
      } catch (error) {
        console.error("Error fetching idea details:", error);
      }
    };

    fetchIdeaDetails();
  }, [router.isReady]); // Re-run effect when router.isReady changes

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

  if (!router.isReady) {
    return <div>Loading...</div>; // Render loading state until router is ready
  }

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
