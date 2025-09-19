import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'

const Home = () => {

    function moviereduce(state, action) {
        switch (action.type) {
            case ('SUCCESS'): return { ...state, data: action.payload, error: null, loading: false }
            case ('LOADING'): return { ...state, data: action.payload, error: null, loading: true }
            case ('ERROR'): return { ...state, error: action.payload, loading: false }
            default: return state
        }
    }


    let intialmovie = {
        data: [],
        loading: false,
        error: null,
    }
    let [trendmovie, dispatchtrend] = useReducer(moviereduce, intialmovie)
    // let [trendmovie, settrendmovie]= useState([])


    useEffect(() => {
        dispatchtrend({ type: "LOADING" })

        let fetchtrend = async () => {
            try {
                let res = await axios.get('https://movies4hub.vercel.app/movies')
                dispatchtrend({ type: 'SUCCESS', payload: res.data})
                console.log(res.data)

            } catch (error) {
                dispatchtrend({ type: 'ERROR', payload: error.message })
            }
        }
        fetchtrend()
    }, [])

    return (
        <div className='container-fluid'>

            <div className="row">
                {/* IF LOADING MODE */}
                {trendmovie.loading && <p>Loading...</p>}
                {/* IF ERROR MODE */}
                {trendmovie.error && <p>Error: {trendmovie.error}</p>}
                {/* IF SUCCES MODE */}
                {trendmovie.data && trendmovie.data.map((movie) => (
                    <div className='moviecard col-3 px-3' key={movie.title}>
                        <img src={movie.image} alt={movie.title || 'Movie'} />
                        {/* <video controls src="https://myflixerz.to/movie/demon-slayer-kimetsu-no-yaiba-infinity-castle-128764"></video> */}
                        <h2>{movie.title}</h2>
                    </div>
                ))}


            </div>
        </div>
    )
}

export default Home