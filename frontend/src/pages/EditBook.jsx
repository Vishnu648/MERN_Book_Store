import { useState,useEffect } from "react";
import axios from "axios";
import BackBtn from "../components/BackBtn";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const {id}=useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/books/${id}`)
      .then((res) => {
        setTitle(res.data.book.title)
        setAuthor(res.data.book.author)
        setPublishYear(res.data.book.publishYear)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        alert('Something went wrong, please check console')
        return console.log(error.message);
      });
  }, []);


  const handleEditBook = (e) => {
    e.preventDefault();
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:4000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        alert("cannot save data");
        console.log(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="p=4">
      <BackBtn />
      <h1 className="text-3Xl my-8">Edit Book</h1>

      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-lg mx-auto w-[600px] p-4">
        <form onSubmit={handleEditBook}>
          <div className="my-4">
            <label className="text-xl mr-4">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 text-black border-black px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4">Author:</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-2 text-black border-black px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4">Publish Year:</label>
            <input
              type="text"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="border-2 text-black border-black px-4 py-2 w-full"
            />
          </div>
          <button
            className="p-2 bg-sky-950 text-white m-8 w-40 rounded-sm mx-auto"
            onClick={handleEditBook}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
