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
    initialData: { idea: "", description: "" }, // Default data
  });

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const [post, setPost] = useState(data || { idea: "", description: "" }); // Use data or default
  const [submitting, setIsSubmitting] = useState(false);

  // Fetch data on the server-side for guaranteed prerendering (optional)
  export async function getStaticProps({ params }) {
    const ideaId = params.id; // Access ideaId from route parameters
    if (!ideaId) return { notFound: true }; // Handle missing ideaId

    try {
      const response = await fetch(`/api/idea/${ideaId}`);
      const data = await response.json();
      return {
        props: {
          initialPost: data,
        },
      };
    } catch (error) {
      console.error(error); // Handle fetch errors gracefully
      return { notFound: true }; // Potentially handle error cases with a 404 page
    }
  }

  useEffect(() => {
    if (ideaId && !router.isFallback) {
      // Client-side data fetching (optional)
      // This can be used if `getStaticProps` is not suitable
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
