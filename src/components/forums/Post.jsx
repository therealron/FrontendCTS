import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { HandThumbUpIcon } from '@heroicons/react/24/solid'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../../utils/constants'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

// const dummyComments = [
// {
//   id: '1',
//   body: 'This is comment 1',
//   comments: [],
// },
// {
//   id: '2',
//   body: 'this is comment 2',
//   comments: [],
// },
// {
//   id: '3',
//   body: 'this is comment 3',
//   comments: [],
// },
// ]

// const curr_post = {
//   title:
//     'An agent that summarizes news from different sources and provides it to me',
//   body:
//     'I would like an agent that can run every day, and summarize financial news for me' +
//     ' I would like the agent to think of 5 questions that a beginner in finance/economics would ask. ' +
//     ' and find answers to them. ',
// }

export const Post = () => {
  // post = curr_post

  const [comments, setComments] = useState([])

  const { post_id } = useParams()
  const { user } = useContext(AuthContext)
  const [Like, setLike] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [volunteer, setVolunteer] = useState(false)

  const [post, setPost] = useState([])
  useEffect(() => {
    // Make an Axios GET request to fetch and sort the posts
    // console.log(BASE_URL + `posts/get/${post_id}`)

    axios
      .get(BASE_URL + `posts/${post_id}`) // Use the actual endpoint URL
      .then((response) => {
        // console.log('response = ', response)
        setPost(response.data)
        setLike(post.likes.length)
        console.log(
          'post.users_volunteer_to_build.includes(user._id) = ',
          post.users_volunteer_to_build.includes(user._id)
        )
        setVolunteer(post.users_volunteer_to_build.includes(user._id))
        setIsLiked(post.likes.includes(user._id))
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const onComment = (newComment) => {
    // const newComment = {
    //   body: commentBody,
    // }

    // console.log('newComment = ' + `${typeof newComment.value}`)
    if (newComment.body.trim() === '') {
      return
    }

    setComments((prev) => [newComment, ...prev])
    // setCommentBody('')
  }

  const upvoteHandler = (e) => {
    setIsLiked(!isLiked)

    try {
      axios.put(BASE_URL + 'posts/' + post_id + '/like', { userId: user._id })
    } catch (err) {}
  }

  const trytobuildhandler = (e) => {
    // requests_volunteered_to_build
    setVolunteer(!volunteer)
    try {
      axios.put(BASE_URL + 'posts/' + post_id + '/volunteer', {
        userId: user._id,
      })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="flex flex-col ">
      <div className="flex flex-col gap-3 w-screen p-6">
        <span className="text-3xl font-bold mb-4 border-b-2 pb-2">
          Title: {post?.title}
          {/* {post_id} */}
        </span>
        <div className="border rounded p-4">
          <p className="text-gray-700 text-lg p-10 leading-relaxed border-b-2">
            {post?.desc}
          </p>
          <div>
            {isLiked ? (
              <>
                {' '}
                <button
                  className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={upvoteHandler}
                >
                  <HandThumbUpIcon className="w-5 h-5 inline-block mr-1" />
                  Upvote
                </button>{' '}
              </>
            ) : (
              <>
                <button
                  className="bg-indigo-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={upvoteHandler}
                >
                  <HandThumbUpIcon className="w-5 h-5 inline-block mr-1" />
                  Upvoted
                </button>
              </>
            )}
            {volunteer ? (
              <>
                <button
                  className="bg-indigo-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
                  onClick={trytobuildhandler}
                >
                  Added to Console
                </button>
              </>
            ) : (
              <>
                <button
                  className="bg-indigo-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
                  onClick={trytobuildhandler}
                >
                  Try to build
                </button>
              </>
            )}

            {volunteer ? (
              <>
                <Link to="/createstart">
                  <button
                    className="bg-teal-300 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={trytobuildhandler}
                  >
                    Build Now?
                  </button>
                </Link>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col gap-3  p-6">
            <CommentInput onComment={onComment} />

            <div className=" flex flex-col gap-3 p-6 ">
              {comments.map((comment) => (
                <div className="border rounded border-zinc-200">
                  <CommentItem comment={comment} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CommentInput = ({ onComment }) => {
  const [commentBody, setCommentBody] = useState('')

  return (
    <div className="flex flex-col">
      {/* <input
        value={commentBody}
        placeholder="What would you like to comment?"
        className="border-[1px] rounded-full border-zinc-400 p-4 w-3/4 "
        style={{ wordWrap: 'break-word' }}
        onChange={(event) => setCommentBody(event.target.value)}
      ></input> */}
      <textarea
        className="w-full p-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        value={commentBody}
        placeholder="What would you like to comment?"
        // className="border-[1px] rounded-full border-zinc-400 p-4 w-3/4 "
        // style={{ wordWrap: 'break-word' }}
        onChange={(event) => {
          if (event.target.value !== '') {
            console.log('event.target.value = ' + event.target.value)
            setCommentBody(event.target.value)
          }
        }}
      ></textarea>
      <button
        class="border-[1px] rounded-full border-zinc-400 w-20 "
        onClick={() => {
          onComment({ body: commentBody, comments: [] })
          setCommentBody('')
        }}
      >
        Comment
      </button>
    </div>
  )
}

const CommentItem = ({ comment }) => {
  const [isReplying, setIsReplying] = useState(false)
  const [comments, setComments] = useState(comment.comments)

  const onComment = (newComment) => {
    // if (newComment !== '') {
    //   console.log('newComment = ', newComment)
    // }
    setComments((prev) => [newComment, ...prev])
  }

  return (
    <div className="flex flex-col border-[1px] border-zinc-500 rounded-md p-4">
      <span> {comment.body}</span>
      {isReplying ? (
        <button
          className="border-[1px] rounded-full border-zinc-400 w-20"
          onClick={() => setIsReplying(false)}
        >
          Cancel
        </button>
      ) : (
        <button
          className="border-[1px] rounded-full border-zinc-400 w-20"
          onClick={() => setIsReplying(true)}
        >
          Reply
        </button>
      )}
      {isReplying && <CommentInput onComment={onComment} />}
      <div className="flex flex-col gap-3">
        {comments.map((comment) => (
          <CommentItem comment={comment} />
        ))}
      </div>
    </div>
  )
}

export default Post
