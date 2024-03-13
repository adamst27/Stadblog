"use client";
import IdeaCard from "./IdeaCard";
import { useState, useEffect } from "react";

const IdeaCardList = ({ data, handleIdeaClick }) => {
  return (
    <div className="mt-16 prompt-layout">
      {data.map((idea) => (
        <IdeaCard
          key={idea._id}
          idea={idea}
          handleIdeaClick={handleIdeaClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch("/api/idea");
      const data = await res.json();
      setPosts(data);
    };
    fetchPost();
  }, []);
  console.log(posts);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    const filtered = posts.filter((idea) =>
      idea.idea.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredPosts(filtered);
    setPosts(filteredPosts);
  };
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for Ideas"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <IdeaCardList data={posts} handleIdeaClick={(idea) => {}} />
    </section>
  );
};

export default Feed;
