import { useState } from "react";
import axios from "axios";
import BackBtn from "../components/BackBtn";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = (e) => {
e.preventDefault();
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post("http://localhost:4000/books", data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("something went wrong");
        console.log(error.message);
      });
  };

  return (
    <div className="p=4">
      <BackBtn />
      <h1 className="text-3Xl my-8">Create Book</h1>

      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-lg mx-auto w-[600px] p-4">
        <form onSubmit={handleSaveBook}>
        <div className="my-4">
          <label className="text-xl mr-4">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className="border-2 text-black border-black px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4">Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e)=>setAuthor(e.target.value)}
            className="border-2 text-black border-black px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4">Publish Year:</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e)=>setPublishYear(e.target.value)}
            className="border-2 text-black border-black px-4 py-2 w-full"
          />
        </div>
        <button 
          className="p-2 bg-sky-950 text-white m-8"
          onClick={handleSaveBook}
        > Save </button>
      </form>
      </div>
    </div>
  );
};

export default CreateBook;
