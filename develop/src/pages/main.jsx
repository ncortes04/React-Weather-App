import App from "../App";
import SideBar from "./sideBar";
import { useState } from "react";
export default function Main() {
 const [city, setCity] = useState('san diego');
    return(
        <div className="main-div">
            <SideBar  setCity={setCity}/>
            <App city={city}/>
        </div>
    )
}
