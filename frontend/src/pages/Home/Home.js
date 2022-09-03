import './Home.css'

import LikeContainer from '../../components/LikeContainer/LikeContainer'
import PhotoItem from '../../components/PhotoItem/PhotoItem'
import { Link } from 'react-router-dom'

import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'
import { getPhotos, like } from '../../slices/photoSlice'

const Home = () => {

  const dispatch = useDispatch()
  const resetMessage = useResetComponentMessage(dispatch)
  const user = useSelector(state => state.auth.user)
  const {photos, loading} = useSelector(state => state.photo)

  useEffect(()=> {
      dispatch(getPhotos())
  }, [dispatch])

  const handleLike = (photo) => {
    dispatch(like(photo._id))

    resetMessage()
  }

  if(loading) {
    return <p>Loading ...</p>
  }


  return (
    <div id='home'>
      {photos && photos.map((photo) => (
        <div key={photo._id}>
          <PhotoItem photo={photo}></PhotoItem>
          <LikeContainer photo={photo} user={user} handleLike={handleLike}></LikeContainer>
          <Link className='btn' to={`/photos/${photo._id}`}>Ver mais</Link>
        </div>
      ))}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Ainda não há fotos publicadas, <Link  to={`/photos/${user._id}`} >clique aqui</Link>
        </h2>
      )}
    </div>
  )
}

export default Home