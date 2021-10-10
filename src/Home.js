import BlogList from "./Bloglist";
import useFetch from "./useFetch";

const Home = () => {
    // change the name of the data by using colon
    const {data: blogs, isPending, error} = useFetch("http://localhost:8000/blogs")

  return (
    <div className="home">
      {isPending && <div>Loading...</div>}
      {error && <div>{error} Error...Couldn't fetch data...ASSHOLE!!</div>}
      {blogs && <BlogList blogs={blogs} title="All Blogs" />}
    </div>
  );
};

export default Home;
