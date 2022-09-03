import "./Search.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

import LikeContainer from "../../components/LikeContainer/LikeContainer";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import { Link } from "react-router-dom";

import { useQuery } from "../../hooks/useQuery";

import { searchPhotos, like } from "../../slices/photoSlice";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);
  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  const handleLike = (photo) => {
    dispatch(like(photo._id));

    resetMessage();
  };

  useEffect(() => {
    dispatch(searchPhotos(search));
  }, [dispatch, search]);

  if (loading) {
    return <p>Loading ...</p>;
  }
  return (
    <div id="search">
      <h2>você está buscando por: {search}</h2>
      {photos &&
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo}></PhotoItem>
            <LikeContainer
              photo={photo}
              user={user}
              handleLike={handleLike}
            ></LikeContainer>
            <Link className="btn" to={`/photos/${photo._id}`}>
              Ver mais
            </Link>
          </div>
        ))}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Não foram encontradas resultados para sua busca,{" "}
          <Link to={`/photos/${user._id}`}>clique aqui</Link>
        </h2>
      )}
    </div>
  );
};

export default Search;
