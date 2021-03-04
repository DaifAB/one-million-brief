import React,{useState,useEffect} from 'react'
import user from '../user.png'
import {
    useLocation
  } from "react-router-dom";
import axios from 'axios'

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

export default function Winner() {

    const[winner , setWinner] = useState({})

    let query = useQuery();
    const group_code = parseInt(query.get("code"))
    console.log(group_code);



    useEffect(() => {
        async function getWinner(){
            await axios.post('http://localhost:5000/group/finalWinner',{
                group_code : group_code
            }).then(response => {
                setWinner(response.data)
            }).catch(error => {
                console.log(error);
            })
        }
        getWinner()
    }, [group_code])


    return (
        <div className="winner-container">
            <h1>Congratulations ! You are the MILLIONAIRE !</h1>
            <div className="winner-cards">
                <img alt="" src={user} />
                <h3>{winner.full_name}</h3>
            </div>
        </div>
    )
}
