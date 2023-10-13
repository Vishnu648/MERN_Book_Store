import {useState,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackBtn from '../components/BackBtn';
import Spinner from '../components/Spinner';

const ShowBook = () => {

  const [books, setBooks] = useState({})
  const [loading, setLoading] = useState(false)
  const {id}=useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/books/${id}`)
      .then((res) => {
        setBooks(res.data.book);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('something went wrong')
        return console.log(error.message);
      });
  }, []);

  return (
    <div className='p=4'>
      <BackBtn/>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-lg mx-auto w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-white">Id:</span>
            <span>{books._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-white">Title:</span>
            <span>{books.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-white">Author:</span>
            <span>{books.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-white">Publish Year:</span>
            <span>{books.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-white">created At:</span>
            <span>{new Date(books.createdAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook