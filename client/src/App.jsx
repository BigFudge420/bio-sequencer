import React from "react";
import { useState, useEffect } from "react";
import Input from "./pages/Input";
import Data from "./pages/Data";
import DNABackground from "./components/DNABackground";

export default function App(){
    const [data, setData] = useState({})
    const [resReceived, setResReceived ] = useState(false)
    const [active, setActive] = useState(true)

    return (
        <div className="min-h-screen min-w-screen">
            
            <DNABackground
                particleCount={200}        
                maxConnectDist={140}     
            />
            
            {
                resReceived
                ? <Data data={data}/> 
                : <Input setData={setData} setResReceived={setResReceived}/>
            }
        </div>
    )
}