import react, {useEffect, useState} from 'react';
import axios from 'axios';
import { ListingView } from '../views/ListingView';
import { LoadingScreen } from '../views/LoadingScreen';



const fetchData = async (offset = 0,limit = 10) => {
    let response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    let listData = response.data;
    return listData;
}



export const ListingContainer = () =>{
    const [count, setCount] = useState(0);
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoadingScreen] = useState(true);

    let stateArray = [setCount,setCourseList,setLoadingScreen]

    useEffect(async () => {
        let listData = await fetchData(0,10);
        // console.log(listData);
        if(listData)
        {
            setCount(listData.count);
            setCourseList([
                ...courseList,
                ...listData.results
            ]
            )
            setLoadingScreen(false);
        }
        
    }, [])

    return (
         <>
            <h1>Hello, Swapnil</h1>
            {loading == false && courseList &&
                    <ListingView listData = {courseList} />
            }
            {loading == true &&
                    <LoadingScreen />
            }
            
        </>
    );
}