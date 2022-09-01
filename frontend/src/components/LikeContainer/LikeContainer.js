import './LikeContainer.css'
import {BsHeart,BsHeartFill} from 'react-icons/bs'
import { useEffect } from 'react'

const LikeContainer = ({photo, user, handleLike}) => {
  return (
    <div className="like">
      {photo.likes && user && (
        <>
          {photo.likes.includes(user._id) ?(
            <BsHeartFill></BsHeartFill>
          ): (
            <BsHeart  onClick={() => handleLike(photo) }></BsHeart>
          )}
          <p>{photo.likes.length} likes(s)</p>
        </>
      )}
    </div>
  )
}

export default LikeContainer