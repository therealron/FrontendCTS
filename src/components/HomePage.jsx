import {
  Carousel,
  CompetitionCard,
  CarouselCategory,
  CarouselProduct,
  HowDoesItWorkCard,
} from './'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const HomePage = () => {
  const [text, setText] = useState('')
  const [rows, setRows] = useState(2)

  const handleChange = (event) => {
    const textareaLineHeight = 24 // Adjust the line height based on your styling
    const previousRows = event.target.rows
    event.target.rows = 2 // Reset number of rows in textarea

    const currentRows = Math.floor(
      event.target.scrollHeight / textareaLineHeight
    )

    if (currentRows === previousRows) {
      event.target.rows = currentRows
    }

    if (currentRows >= rows) {
      setRows(currentRows)
    }

    setText(event.target.value)
  }

  const [status, setStatus] = useState('')

  useEffect(() => {
    const eventSource = new EventSource('http://127.0.0.1:8000/status/')
    eventSource.onmessage = (event) => {
      setStatus(event.data)
    }
    return () => {
      eventSource.close()
    }
  }, [])

  const startProcess = async () => {
    // const response = await axios.post('http://127.0.0.1:8000/start-process/')
    // console.log(response.data)
    try {
      const requestData = {
        query: text,
        // another_field: 123,
      }
      const response = await axios.post(
        'http://127.0.0.1:8000/start-process/',
        requestData
      )
      console.log(response.data)
    } catch (error) {
      // Handle the error here
      // For example, log it or set an error state
      console.error('An error occurred while starting the process:', error)
      // If error.response exists, it means the request was made and the server responded
      if (error.response) {
        console.error(
          'Server responded with a status code that falls out of the range of 2xx:',
          error.response.status
        )
        console.error('Response data:', error.response.data)
      } else if (error.request) {
        // The request was made but no response was received
        console.error(
          'The request was made but no response was received:',
          error.request
        )
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error setting up the request:', error.message)
      }
    }
  }

  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-screen flex flex-col justify-center items-center text-white">
      {/* <header className="text-4xl font-bold mb-6">
        <h1>REQAPOD</h1>
        <p className="text-xl font-light">REQuest A PODcast</p>
      </header> */}
      {/* <header
        className="text-4xl font-bold mb-6"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        <h1>REQAPOD</h1>
        <p
          className="text-xl font-light"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          REQuest A PODcast
        </p>
      </header> */}
      {/* <header
        className="text-4xl font-bold mb-6"
        style={{ fontFamily: "'Roboto Slab', serif" }}
      >
        <h1>REQAPOD</h1>
        <p
          className="text-xl font-light"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          REQuest A PODcast
        </p>
      </header> */}
      {/* <header className="text-center mb-10">
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '60px',
            fontWeight: '700',
            color: 'white',
          }}
        >
          REQAPOD
        </h1>
        <p
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '24px',
            fontWeight: '300',
            color: 'white',
            marginTop: '4px',
          }}
        >
          REQuest A PODcast
        </p>
        <p
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '22px',
            fontWeight: '400',
            color: 'white',
            marginTop: '8px',
          }}
        >
          Create an AI Generated Podcast in One-Click
        </p>
      </header> */}
      <header className="text-center mb-6 md:mb-10">
        <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white leading-none">
          REQAPOD
        </h1>
        <p className="font-open-sans text-xs md:text-sm text-teal-500 mt-2">
          REQuest A PODcast
        </p>
        <p className="font-open-sans text-sm md:text-lg text-white mt-2">
          Create an AI Generated Podcast in One-Click
        </p>
      </header>
      <div className="p-4 md:p-8 bg-white text-gray-800 rounded-lg shadow-lg w-full md:w-1/2">
        <textarea
          value={text}
          rows={rows}
          placeholder="eg. Name 5 companies that failed even after raising more than a billion dollars. For each of them, explain what went wrong and what they could have done differently."
          className="p-2 md:p-4 w-full border border-gray-200 rounded resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
        <button
          className="px-4 md:px-5 py-2 text-sm md:text-base bg-teal-400 text-white rounded cursor-pointer hover:bg-indigo-600 mt-4 block w-full transition duration-300 ease-in-out"
          onClick={startProcess}
        >
          make this a pod ;)
        </button>
      </div>

      {/* <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-1/2">
        <textarea
          value={text}
          rows={rows}
          placeholder="eg. Name 5 companies that failed even after raising more than a billion dollars. For each of them, explain what went wrong and what they could have done differently."
          className="p-4 w-full border border-gray-200 rounded resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
        <button
          className="px-5 py-2.5 bg-teal-400 text-white rounded cursor-pointer hover:bg-indigo-600 mt-4 block w-full transition duration-300 ease-in-out"
          onClick={startProcess}
        >
          make this a pod ;)
        </button> */}

      {/* <div>
          <button
            onClick={startProcess}
            className="px-5 py-2.5 bg-indigo-500 text-white rounded cursor-pointer hover:bg-indigo-600 mt-4 block w-full transition duration-300 ease-in-out"
          >
            Start Process
          </button>
          <p>Status: {status}</p>
        </div> */}
      {/* </div> */}
    </div>
  )
}
export default HomePage
