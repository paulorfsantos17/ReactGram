const Photo = require("../models/Photo");
const User = require("../models/User");
const mongoose = require("mongoose");

const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;
  const user = await User.findById(reqUser._id);

  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  if (!newPhoto) {
    res.status(422).json({
      errors: ["Houve um problema, por favor tente novamente mais tarde!"],
    });
  }

  res.status(201).json(newPhoto);

};

const deletePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  try {
    const photo =  await Photo.findById(mongoose.Types.ObjectId(id));

    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada."] });
      return;
    }

    if (!photo.userId.equals(reqUser._id)) {
      console.log(photo.userId)
      res.status(422)
        .json({ errors: ["Ocorreu um erro, por favor tente mais tarde."] });
      return;
    }
    await Photo.findByIdAndDelete(photo._id);
    res
      .status(200)
      .json({ id: photo._id, message: "Foto excluída com sucesso." });
  }  catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada."] });
    return;
  }
};

const getAllPhotos = async(req, res) => {
  const photos = await Photo.find({}).sort([["createdAt", -1]]).exec()

  return res.status(200).json(photos)
}

const getUserPhotos = async (req, res) => {
  const {id} = req.params 
  const photos = await Photo.find({userId: id}).sort([["createdAt", -1]]).exec()

  return res.status(200).json(photos)
}

const getPhotoById = async(req, res) => {
  const {id} = req.params
  try {
    const photo =  await Photo.findById(mongoose.Types.ObjectId(id))

    res.status(200).json(photo)
  } catch(error) {
    res.status(404).json({errors: ["Foto não encontrada."]})
    return 
  }

}

const updatePhoto = async(req, res) => {
  const {id} = req.params
  const {title} = req.body 

  const reqUser = req.user


  try {
    const reqUser = req.user
    const photo = await Photo.findById(id)
    if (!photo.userId.equals(reqUser._id)) {
      res.status(422).json({errors: ["Ocorreu um erro, por favor tente novamente mais tarde!"]})
      return 
    }
    if(title) {
      photo.title = title
    }
    
    await photo.save()

    res.status(200).json({photo, message: "Foto Atualizada."})
  } catch (error) {
    res.status(404).json({errors: ["Photo não encontrada."]})
  }
}

const likePhoto =  async(req, res) => {
    const {id} = req.params
    const reqUser = req.user
    
    try {
      const photo = await Photo.findById(id)

      if(photo.likes.includes(reqUser._id)) {
        res.status(422).json({errors: ["Você já curtiu a foto."]})
        return
      }

      photo.likes.push(reqUser._id)
      await photo.save()

      res.status(200).json({photoId: photo._id, userId: reqUser._id, message:"Você curtiu está foto."})
    } catch (error) {
      res.status(404).json({errors: ["Photo não encontrada."]})
    }
  
   
}

const commentPhoto = async(req, res) => {
  const {id} = req.params
  const {comment} = req.body 

  const reqUser = req.user

  

  try {
    const user = await User.findById(reqUser._id)
    const photo = await Photo.findById(id)
    const userComment = {
      comment,
      userName:user.name,
      userImage: user.profileImage,
      userId: user._id
    }

    photo.comments.push(userComment)
    await photo.save()

    res.status(200).json({
      commet: userComment, message: "Você acabou de comentar a foto."
    })
  } catch (error) {
    res.status(404).json({errors: ["Photo não encontrada."]})
    
  }
}

const searchPhoto = async(req, res) => {
  const {q} =  req.query
  const photos = await Photo.find({title: new RegExp(q, "i")}).exec()
  if(!photos) {
    res.status(404).json({errors: ["Não foi encotrado nem uma foto"]}) 
    return  
  }

  res.status(200).json(photos)
}

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhoto
};
