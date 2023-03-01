import App from "../App";
import SideBar from "./sideBar";
import Settings from "./settings";
import { useState } from "react";
export default function Main() {
 const [city, setCity] = useState();
 const [toggle, setToggle] = useState({units: "imperial"})
    return(
        <div className="main-div">
            <SideBar  setCity={setCity}/>
            <App city={city} units={toggle.units}/>
            <Settings setToggle={setToggle} toggle={toggle} setCity={setCity}/>
        </div>
    )
}
