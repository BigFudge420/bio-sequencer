import React from "react";
import { useState, useEffect } from "react";
import Input from "./pages/Input";
import Data from "./pages/Data";

export default function App(){
    const [data, setData] = useState({})
    const [submitted, setSubmitted ] = useState(false)

    return (
        <div>
            {
                submitted 
                ? <Data data={data}/> 
                : <Input setData={setData} setSubmitted={setSubmitted}/>
            }
        </div>
    )
}