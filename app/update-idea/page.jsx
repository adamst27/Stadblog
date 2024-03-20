"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";

import Form from "@components/Form";

const UpdateIdea = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ideaId = searchParams.get("id");

  const { data, error } = useSWR(`/api/idea/${ideaId}`, fetcher, {
    revalidateOnFocus: false, // Avoid refetching on focus
  });

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const initialPost = { idea: "", description: "" }; // Default data
  const [post, setPost] = useState(initialPost);
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (ideaId && !router.isFallback) {
      const getPromptDetails = async () => {
        const response = await fetch(`/api/idea/${ideaId}`);
        const data = await response.json();
        setPost(data);
      };
      getPromptDetails();
    }
  }, [ideaId, router.isFallback]);

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

  // Conditionally display content based on data availability
  if (error) return <div>Error fetching idea</div>;
  if (!data) return <div>Loading idea...</div>;

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
