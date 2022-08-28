import "./Profile.css";
import { upload } from "../../utils/config";

import Message from "../../components/Message/Message";
import { Link, useParams } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getUserDetails } from "../../slices/userSlice";
import {
  publishPhoto,
  resetMessage,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
} from "../../slices/photoSlice";

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    photos,
    photo,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  const [editImage, setEditImage] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editId, setEditId] = useState("");

  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  function resetComponentMessage() {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    const formData = new FormData();

    const keys = Object.keys(photoData);
    const photoFormData = keys.forEach((key) =>
      formData.append(key, photoData[key])
    );

    formData.append("photo", photoFormData);

    dispatch(publishPhoto(formData));

    setTitle("");

    resetComponentMessage()
    
  };



  const handleFile = (e) => {
    const image = e.target.files[0];

    setImage(image);
  };

  const handleDelete = (id) => {
    dispatch(deletePhoto(id));
    resetComponentMessage()
  };

  const showOrHideForm = ()=> {
    newPhotoForm.current.classList.toggle("hide")
    editPhotoForm.current.classList.toggle("hide")
  }

  const handleUpdate  = (e) => {
    e.preventDefault()

    const photoData ={
      title: editTitle,
      id: editId
    }

    dispatch(updatePhoto(photoData))
    showOrHideForm()

    resetComponentMessage()
  }
  const handleCancelEdit = (e) => {
    showOrHideForm()
  }

  const handleEdit  = (photo) => {
    if(editPhotoForm.current.classList.contains("hide")) {
      showOrHideForm()
    }
    setEditId(photo._id)
    setEditTitle(photo.title)
    setEditImage(photo.image)
  }

  if (loading) {
    return <p>Carregando ...</p>;
  }

  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && (
          <img src={`${upload}/users/${user.profileImage}`} alt={user.name} />
        )}
        <div className="profile-description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      {id === userAuth._id && (
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Compartilhe algum momento seu:</h3>
            <form onSubmit={handleSubmit}>
              <label>
                <span>Título para a foto:</span>
                <input
                  type="text"
                  placeholder="Insira um título"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </label>
              <label>
                <span>Imagem:</span>
                <input type="file" onChange={handleFile} />
              </label>
              {!loadingPhoto && <input type="submit" value="Postar" />}
              {loadingPhoto && (
                <input type="submit" value="Aguarde..." disabled />
              )}
            </form>
          </div>
          <div className="edit-photo hide" ref={editPhotoForm}>
            <p>Editando:</p>
            {editImage && <img src={`${upload}/photos/${editImage}`} alt={editTitle} />}
            <form onSubmit={handleUpdate}>
              <label>
                <span>Título para a foto:</span>
                <input
                  type="text"
                  placeholder="Insira o novo título"
                  onChange={(e) => setEditTitle(e.target.value)}
                  value={editTitle}
                />
              </label>
              {!loadingPhoto && <input type="submit" value="Atualizar" />}
              {loadingPhoto && (
                <input type="submit" value="Aguarde..." disabled />
              )}
              <button className="cancel-btn" onClick={handleCancelEdit}>Cancelar Edição</button>
            </form>
          </div>
          {errorPhoto && <Message msg={errorPhoto} type="error" />}
          {messagePhoto && <Message msg={messagePhoto} type="success" />}
        </>
      )}
      <div className="user-photo">
        <h2>Fotos Publicadas</h2>
        <div className="photos-container">
          {photos &&
            photos.map((photo) => {
              return (
                <div className="photo" key={photo._id}>
                  {photo.image && (
                    <img
                      src={`${upload}/photos/${photo.image}`}
                      alt={photo.title}
                    ></img>
                  )}
                  {id === userAuth._id ? (
                    <div className="actions">
                      <Link to={`/photos/${photo._id}`}>
                        <BsFillEyeFill></BsFillEyeFill>
                      </Link>
                      <BsPencilFill onClick={() => handleEdit(photo)}></BsPencilFill>
                      <BsXLg onClick={() => handleDelete(photo._id)}></BsXLg>
                    </div>
                  ) : (
                    <Link className="btn" to={`photos/${photo._id}`}>
                      Ver
                    </Link>
                  )}
                </div>
              );
            })}
          {photos.length === 0 && <p>Não há fotos publicadas.</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
