import {useEffect, useState} from "react";
import {Card} from "@heroui/react";


// @ts-ignore
function Roadmap({roadmap}: {roadmap: Roadmap} ){
return(
    <div>
        <h1>{roadmap.name}</h1>
    </div>
);
}
export default Roadmap
