import { useContext } from "react";
import DentalContext from "../context/DentalProvider";

const useDental = () => {    
    return useContext(DentalContext);
}

export default useDental;