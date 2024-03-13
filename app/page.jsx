import Feed from "@components/Feed";
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient">Projects Ideas</span>
      </h1>
      <p className="desc text-center">
        stadblog is a place to share and discover projects ideas for developers
      </p>
      <Feed />
    </section>
  );
};

export default Home;
