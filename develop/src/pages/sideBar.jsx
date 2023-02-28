import { useRef, useState } from "react"
import useLocalStorage from "../hooks/setLocalStorage"
export default function SideBar({setCity}){
    const cityRef = useRef()
    const [error, setError] = useState()
    const [cityLocal, setCityLocal] = useLocalStorage("city", [])
    const handleChange = (event) => {
        if(cityRef.current.value === '') {
            setError(true)
            return
        }
        setError(false)
        setCity(cityRef.current.value)
        if(cityLocal.length === 0) {
           return setCityLocal([cityRef.current.value])
        }
        if(cityLocal.includes(cityRef.current.value) == false){
            setCityLocal([...cityLocal, cityRef.current.value])
        }
     }
     
    return(
        <aside className="sidebar">
            <div>
                <h2>Search</h2>
            </div>
            <input ref={cityRef}></input>
            <p>{error ? "Cannot Leave Input Blank" : null}</p>
            <button onClick={handleChange}></button>
            <p>Previous Search</p>
            {cityLocal && cityLocal.map((item) => {
               return(
                <button onClick={() => {
                    setCity(item)}
                }>{item}</button>
                ) 
            })}
        </aside>
    )
}