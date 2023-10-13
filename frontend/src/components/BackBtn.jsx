import { Link } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs"

const BackBtn = ({destination="/"}) => {
  return (
    <div className="flex">
        <Link
         to={destination}
         className="bg-sky-900 text-white px-4 py-1 rounded-md w-fit my-3"
        >
            <BsArrowLeft className="text-2xl"/>
        </Link>
    </div>
  )
}

export default BackBtn