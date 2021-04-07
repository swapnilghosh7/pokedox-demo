import react, {useEffect, useState, useCallback, useRef} from 'react';
import axios from 'axios';
import { ListingView } from '../views/ListingView';
import { LoadingScreen } from '../views/LoadingScreen';



const fetchData = async (offset = 0,limit = 10) => {
    console.log(offset + "...." + limit)
    let response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    let listData = response.data;
    return listData;
}



export const ListingContainer = () =>{
    const [count, setCount] = useState(0);
    const [listcount, setListCount] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoadingScreen] = useState(true);

    let stateArray = [setCount,setCourseList,setLoadingScreen]

    useEffect(async () => {
        if(hasMore)
        {
            let listData = await fetchData((count*listcount),listcount);
          // console.log(listData);
            if(listData)
            {
                // setCount(listData.count);
                setCourseList([
                    ...courseList,
                    ...listData.results
                ]
                )
                setLoadingScreen(false);
                if(listData.next == null)
                {
                    setHasMore(false);
                }
            }
        }
        
    }, [count])

    const observer = useRef();

    let fetchMoreItemsCallback = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && hasMore) {
            setLoadingScreen(true);
            setCount(count + 1)
          }
        })
        if (node) observer.current.observe(node)
      }, [loading, hasMore])

    return (
         <>
           
            <div className="container">
                <h1>Hello, Swapnil</h1>
            { courseList &&
                    <ListingView fetchMoreItemsCallback={fetchMoreItemsCallback} listData = {courseList} />
            }
            {loading == true &&
                    <LoadingScreen />
            }
            </div>
            
            
        </>
    );
}