import { useCallback } from "react";
import Header from "../components/Header";
import Slide from "../components/Slide";
import Button4 from "../components/Button4";
import NonFilter from "../components/NonFilter";
import Filter from "../components/Filter";




import "../styles/Main.css"

const Main = () => {



    return(
        <div className="div-main">
            <Header/>
            <Slide/>
            <Button4/>
            <NonFilter/>
            <Filter/>
            
        </div>

    )
};

export default Main;
