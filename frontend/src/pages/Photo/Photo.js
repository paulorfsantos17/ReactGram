import "./Photo.css";

import Message from "../../components/Message/Message";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

import { getPhoto, like, comment } from "../../slices/photoSlice";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import LikeContainer from "../../components/LikeContainer/LikeContainer";
import { upload } from "../../utils/config";

const Photo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>aguarde...</p>;
  }

  const handleLike = () => {
    dispatch(like(photo._id));
    resetMessage();
  };

  const handleComment = (e) => {
    e.preventDefault();

    const commentData = {
      id: photo._id,
      comment: commentText,
    };

    dispatch(comment(commentData));
    setCommentText("");
    resetMessage();
  };
  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className="message-container">
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </div>
      <div className="comments">
        {photo.comments && (
          <>
            <h3>Comentários: ({photo.comments.length})</h3>
            <form onSubmit={handleComment}>
              <input
                type="text"
                placeholder="Insira o seu comentário..."
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText}
              />
              <input type="submit" value="Enviar" />
              {photo.comments.length === 0 && <p>Não há comentários... </p>}
              {photo.comments && photo.comments.map(
                (comment, index) =>
                  comment && (
                    <div className="comment" key={index}>
                      <div className="author">
                        {comment.userImage && (
                          <img
                            src={`${upload}/users/${comment.userImage}`}
                            alt={comment.userName}
                          />
                        )}
                        <Link to={`/users/${comment.userId}`}>
                          <p>{comment.userName}</p>
                        </Link>
                      </div>
                      <p>{comment.comment}</p>
                    </div>
                  )
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Photo;
