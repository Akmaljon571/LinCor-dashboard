import { Route, Routes } from "react-router-dom";
import { Xisobot } from "../components";


function Routerr() {
    return ( 
        <Routes>
            <Route path="/xisobot" element={<Xisobot/>} />
        
        </Routes>
    );
}

export default Routerr;
