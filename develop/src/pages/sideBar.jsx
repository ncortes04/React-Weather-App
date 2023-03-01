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
     const handleDelete = (passed) => {
        cityLocal.splice(cityLocal.indexOf(passed), 1)
        setCityLocal([...cityLocal])
    }
     
    return(
        <aside className="sidebar">
            <div className="sidebar-header-div">
                <h2 className="sidebar-header">Search</h2>
            </div>
            <div className="input-div">
                <input className="search-input primary-hover" onBlur={(e) => {e.target.placeholder = "Enter City Name"}} onFocus={(e) => {e.target.placeholder = ''}} ref={cityRef}></input>
                <button className="search-btn" onClick={handleChange}>Search</button>
            </div>
            {error ? <p>Cannot Leave Input Blank</p> : null}
            <div className="previous-search-div ">
                 <div className="previous-search-header">
                    <p className="previous-search">Previous Searches</p>
                </div>
                {cityLocal && cityLocal.map((item) => {
                return(
                    <div className="input-div">
                        <div className="history-input primary-hover boxshadow">
                         <button className="pd-2 history-btn" onClick={() => {
                            setCity(item)}}>{item}</button>
                         <button className="delete-btn" 
                         onClick={() => {
                            handleDelete
                         (item)}}
                           >Delete
                        </button>
                        </div>
                   
                    </div>
                    ) 
                })}
            </div>
        </aside>
    )
}