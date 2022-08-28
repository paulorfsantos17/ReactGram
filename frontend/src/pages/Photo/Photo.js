import "./Photo.css";
import { upload } from "../../utils/config";

import Message from "../../components/Message/Message";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getPhoto } from "../../slices/photoSlice";

const Photo = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>aguarde...</p>;
  }

  return (
    <div>{photo && <img src={`${upload}/photos/${photo.image}`} alt="" />}</div>
  );
};

export default Photo;
