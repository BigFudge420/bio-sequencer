import React from "react";
import { useState, useEffect } from "react";
import Input from "./pages/Input";
import Data from "./pages/Data";
import DNABackground from "./components/DNABackground";

export default function App(){
    const [data, setData] = useState({})
    const [submitted, setSubmitted ] = useState(false)
    const [active, setActive] = useState(true)

    return (
        <div className="min-h-screen min-w-screen">
            
            <DNABackground
                particleCount={200}        
                maxConnectDist={140}     
            />
            
            {
                submitted 
                ? <Data data={data}/> 
                : <Input setData={setData} setSubmitted={setSubmitted}/>
            }
        </div>
    )
}