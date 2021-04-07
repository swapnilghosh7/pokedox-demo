import react , {useEffect,useCallback} from 'react';
import Link from 'next/link';


export const ListingView = (props) => {
    let callbackFetchFunction = (node) =>{
            if(node)
            {
                props.fetchMoreItemsCallback(node);
            }
           
    }
       
    return(
        <div>
            <ul className="listingPageWrapper">
                {props.listData && props.listData.map((data,index) => {
                    if(props.listData.length === index+1)
                    {
                        return (<li key={'listing' + index} ref={callbackFetchFunction} className="listingPageItems"> 
                            <Link href={ 'pokemon/' + data.url.split('/')[4]}>
                                <a className="pokemonUrl">{data.name}</a>
                            </Link>
                            </li>
                            )
                    }
                    else {
                        return (<li key={'listing' + index} className="listingPageItems"> 
                            <Link href={'pokemon/' + data.url.split('/')[6]}>
                                <a className="pokemonUrl">{data.name}</a>
                            </Link>
                        </li>)
                    }
                        
                    })
                }
            </ul>
        </div>
    )
}