"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const UpdateIdeaPage = () => {
  return (
    <Suspense
      fallback={
        <>
          <p>Loading...</p>
        </>
      }
    >
      <UpdatePrompt />
    </Suspense>
  );
};

export default UpdateIdeaPage;

const UpdateIdea = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ideaId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    idea: "",
    description: "",
  });

  useEffect(() => {
    const getIdeaDetails = async () => {
      const response = await fetch(`/api/prompt/${ideaId}`);
      const data = await response.json();
      setPost({
        idea: data.idea,
        description: data.description,
      });
    };

    if (ideaId) {
      getIdeaDetails();
    }
  }, [ideaId]);

  const UpdateIdea = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    if (!ideaId) {
      return alert("Prompt ID not found.");
    }

    try {
      const response = await fetch(`/api/prompt/${ideaId}`, {
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
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={UpdateIdea}
    />
  );
};
