import Posts from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostform";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <div className="posts-section">
        <Posts />
      </div>
      <div className="form-section">
        <AddPostForm />
      </div>
    </div>
  );
}

export default App;
