import { CreatePost } from "../../../wiiwii-server/controllers/PostController";

function Home() {
  const CreatePost = () =>  {
    navigate('/')
  }
  return (
    <div className="home-container">
      <h1>WiiWii</h1>
      <button onClick={CreatePost}>Create Post</button>
    </div>
  );
}

export default Home;
