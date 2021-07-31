import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'
import Ava from './assets/brick.png'

function Post({username, caption, imageUrl}) {
    return (
        <div className='post'>
            <div className="postHeader">
                <Avatar 
                    className='postAvatar' 
                    alt='Aldodevv' 
                    src={Ava}
                />
                <h3 className='postUsername'>{username}</h3>
            </div>

            <img src={imageUrl} className='postImage'/>
            

            <h4 className='postText'>
                <strong>{username}</strong> {caption}
            </h4>
        </div>
    )
}

export default Post
