import { useState,useEffect } from "react";
import axios from "axios";
import BackBtn from "../components/BackBtn";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id}=useParams();


  const handleDeleteBook = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .delete(`http://localhost:4000/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        alert("cannot delete book");
        console.log(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="p=4">
      <BackBtn />
      <h1 className="text-3Xl my-8">Delete Book</h1>

      {loading ? <Spinner/> : ''}

      <div className="w-[500px] border flex text-center h-20 justify-between mx-auto flex-col rounded-md border-white">
        <h3>Are you sure Your want to delete this Book ?</h3>
        <button onClick={handleDeleteBook} className="bg-red-500 rounded-md h-10">Delete</button>
      </div>
    
    </div>
  );
};

export default DeleteBook;
