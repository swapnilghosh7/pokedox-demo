import react , {useEffect,useCallback} from 'react';


export const ListingView = (props) => {
    let callbackFetchFunction = (node) =>{
            if(node)
            {
                props.fetchMoreItemsCallback(node);
            }
           
    }
       
    return(
        <div>
            Listing Page
            <ol className="listingPageWrapper">
                {props.listData && props.listData.map((data,index) => {
                    if(props.listData.length === index+1)
                    {
                        return (<li key={'listing' + index} ref={callbackFetchFunction} className="listingPageItems"> <a href={data.url} className="pokemonUrl">{data.name}</a></li>)
                    }
                    else {
                        return (<li key={'listing' + index} className="listingPageItems"> <a href={data.url} className="pokemonUrl">{data.name}</a></li>)
                    }
                        
                    })
                }
            </ol>
        </div>
    )
}