"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
const IdeaCard = ({ idea, handleIdeaClick, handleEdit, handleDelete }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const handleCopy = () => {
    setIsCopied(idea.idea);
    navigator.clipboard.writeText(idea.idea);
    setTimeout(() => setIsCopied(""), 3000);
  };
  function handleUserClick() {
    if (idea.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${idea.creator._id}?name=${idea.creator.username}`);
  }
  return (
    <div className="prompt_card mb-2">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleUserClick}
        >
          <Image
            src={idea.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {idea.creator.username}
            </h3>
            <p className="text-sm font-inter text-gray-500">
              {idea.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              isCopied === idea.idea
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="text-sm my-4 font-inter text-gray-500">{idea.idea}</p>
      <p className="text-sm font-inter text-gray-500 blue_gradient">
        {idea.description}
      </p>
      {session?.user.id &&
        session?.user.id === idea.creator._id &&
        pathname === "/profile" && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="text-sm font-inter green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="text-sm font-inter orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )}
    </div>
  );
};

export default IdeaCard;
