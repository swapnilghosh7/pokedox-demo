import react , {useEffect} from 'react';
export const ListingView = (props) => {
    console.log(props);
    return(
        <div>
            Listing Page
            <ul className="listingPageWrapper">
                {props.listData && props.listData.map((data,index) => {
                        return (<li key={'listing' + index} className="listingPageItems"> <a href={data.url} className="pokemonUrl">{data.name}</a></li>)
                    })
                }
            </ul>
        </div>
    )
}