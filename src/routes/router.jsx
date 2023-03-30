import { Route, Routes } from "react-router-dom";
import Xisobod from "../components/xisobod/xisobod";


function Routerr() {
    return ( 
        <Routes>
            <Route path="/Xisobod" element={<Xisobod/>} />
        
        </Routes>
    );
}

export default Routerr;


/*
    Xisobod
    Course 
    video
    workbook
    workbook_open
    add user with course
*/