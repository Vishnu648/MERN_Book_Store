import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/books")
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        return console.log(error.message);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3Xl my-8">Books Store</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-500 text-2xl" />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-white bg-black rounded-md">No.</th>
              <th className="border border-white bg-black rounded-md">Title</th>
              <th className="border border-white bg-black rounded-md">
                Author
              </th>
              <th className="border border-white bg-black rounded-md">Year</th>
              <th className="border border-white bg-black rounded-md">
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((b, index) => {
              return (
                <tr key={books._id} className="h-8">
                  <td className="border text-center border-white">{index + 1}</td>
                  <td className="border text-center border-white">{b.title}</td>
                  <td className="border text-center border-white">{b.author}</td>
                  <td className="border text-center border-white">{b.publishYear}</td>
                  <td className="border text-center border-white">
                    <div className="flex justify-center gap-x-4">
                        <Link to={`/books/details/${b._id}`}>
                          <BsInfoCircle className="text-2xl text-green-300"/>
                        </Link>
                        <Link to={`/books/edit/${b._id}`}>
                          <AiOutlineEdit className="text-2xl text-blue-400"/>
                        </Link>
                        <Link to={`/books/delete/${b._id}`}>
                          <MdOutlineDelete className="text-2xl text-red-300"/>
                        </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
