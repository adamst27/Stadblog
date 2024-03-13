import IdeaCard from "./IdeaCard";
const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> {name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt-layout">
        {data.length &&
          data.map((idea) => (
            <IdeaCard
              key={idea._id}
              idea={idea}
              handleEdit={() => handleEdit && handleEdit(idea)}
            />
          ))}
      </div>
    </section>
  );
};

export default Profile;
