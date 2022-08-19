import { useEffect, useState } from "react"
import { getMachineries, searchMachineries } from "../Services/machineries"
import { getUser } from "../Services/users";

export const useGetMachineries = (machineries = '') => {
    
    const [state, setState] = useState([]);
    const token = localStorage.getItem('token');

    

    useEffect(() => {
      if (machineries.length > 0) {
        getUser(token).then( (res) => {
                searchMachineries(machineries).then( foundMachineries => {
                setState(foundMachineries[0].filter( machinery => machinery?.user !== res.userDB._id)); 
              })
            }
        )
      } else {
        getMachineries().then( data => {
          setState(data.machineries)
        })
      }
        
      
            
  }, [machineries,token]);



  return state;

}