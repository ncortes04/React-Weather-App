import { useState } from 'react';
import '../styles/settings.css'
export default function Settings({toggle, setToggle, setCity}){
    const [dropDown, setDropDown] = useState({temp: false})
    const handleToggle = (value) =>{
        setToggle({units: value});
    }
    const handleDropdowns = (param) => {
        setDropDown({[param] : !dropDown.temp})
    }
    return(
        <div className="settings-container">
            <div className='settings-header-div'>
                <h2>Settings</h2>
            </div>
            <div className='temp-header-div'>
                <button  onClick={() => {handleDropdowns("temp")}} className='temp-dropdown-btn'><i className={dropDown.temp ? "arrow down" : "arrow up"}></i></button>
                <p className='temp-header'>Tempature</p>
            </div>
            <div className={dropDown.temp ? 'temp-dropdown-div' : 'temp-dropdown-div hidden'}>
                    <button className="settings-btn" onClick={() => {handleToggle("metric")}}>celcius</button>
                    <button className="settings-btn" onClick={() => {handleToggle("imperial")}}>imperial</button>
                    <button className="settings-btn" onClick={() => {handleToggle("standard")}}>standard</button>
            </div>
        </div> 
    )
}