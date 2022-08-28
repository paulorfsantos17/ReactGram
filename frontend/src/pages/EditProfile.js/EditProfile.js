import "./EditProfile.css";

import { upload } from "../../utils/config";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { profile, resetMessage, updateProfile } from "../../slices/userSlice";

import Message from "../../components/Message/Message";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user, message, error, loading } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  useEffect(() => {
    if(user) {
      setName(user.name)
      setEmail(user.email)
      setBio(user.bio)
    }
  }, [user])

  const handleSubmit = async(e) => {
    e.preventDefault()

    const userData = {
      name
    }

    if(profileImage) {
      userData.profileImage = profileImage
    }

    if(bio) {
      userData.bio = bio
    }

    if(password) {
      userData.password = password
    }

    const formData = new FormData()
    

    const keys = Object.keys(userData)
    const userFormData = keys.forEach(key => formData.append(key, userData[key]))
 
    
    formData.append("user", userFormData)

    await dispatch(updateProfile(formData))

    setTimeout(() => {
      dispatch(resetMessage)
    },2000)
  };

  const handleFile = (e) => {
    const image = e.target.files[0]

    setPreviewImage(image)
    setProfileImage(image)
  }
  return (
    <div id="edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">
        Adicione uma imagem de perfil e conte mais sobre você...
      </p>
      {(user.profileImage || previewImage) && (
        <img  className="profile-image"src={
          previewImage ? URL.createObjectURL(previewImage) : `${upload}/users/${user.profileImage}`
        } alt="" />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
        <input type="email" placeholder="Email" disabled value={email || ""} />
        <label>
          <span>Imagem de Perfil:</span>
          <input
            type="file"
            onChange={handleFile}
          />
        </label>
        <label>
          <span>Bio:</span>
          <input
            type="text"
            placeholder="Descrição do perfil"
            value={bio || ""}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <label>
          <span>Quer alterar sua senha?</span>
          <input
            type="text"
            placeholder="Digite sua nova senha"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {!loading && <input type="submit"  value="Atualizar"/>}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error}  type="error"/>}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
};

export default EditProfile;
