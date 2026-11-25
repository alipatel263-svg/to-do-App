import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useFilterData } from "../hooks/filter.data";


export function Search(){

    const [topics] = useState(['HTML Tutorial', 'Javascript Projects', 'CSS  Tutorial', 'HTML Project', 'Javascropt Examples']);
    const [searchString, setSearchString] = useState('');

    function handleChange(e){
        setSearchString(e.target.value);

    }

    let filteredData = useFilterData(searchString, topics);

    return(
        <div className="container">
            <h3>Topics</h3>
            <input type="text" onChange={handleChange} placeholder="Search Topics" />
            <ul>
                {
                    filteredData.map(topic=><li key={topic}>{topic}</li>)
                }
            </ul>
        </div>
    )
}
