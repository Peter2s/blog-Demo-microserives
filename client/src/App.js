import './App.css';
import {CreatePost} from "./Components/CreatePost";
import {PostList} from "./Components/PostList";

function App() {
  
  return (
    <div className="App">
      <div className="container">
        <CreatePost/>
          <PostList/>
      </div>
    </div>
  );
}

export default App;
