import axios from 'axios';
import react from 'react';

const fetchData = async (offset = 0,limit = 10) => {
    let response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    let listData = response.data;
    return listData;
}

const fetchDetailsData = async (id) => {
    let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let listData = response.data;
    return listData;
}

export const getStaticPaths = async () =>{
    let firstResponse = await fetchData(0,1);
    let dataCount = firstResponse.count;

    let response = await fetchData(0,dataCount);
    // console.log(response);
    let listData = response.results;
    const paths = listData.map(data => {
        let pId = data.url.replace('https://pokeapi.co/api/v2/pokemon/','').replace('/','');
        // console.log(pId);
        return { params: {id: pId.toString()}}
    })
    // return listData;
    return {
        paths,
        fallback: false
    };
}


export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await fetchDetailsData(id);
    // console.log(res);
    const detailsData = res;

    return {
        props : {
            detailsData
        }
    }
}

const Detailspage = ({detailsData}) =>{
    return(
        <div>
            <h1>{detailsData.name}</h1>
            <h2>{`Weight : ` + detailsData.weight + ` pounds`}</h2>
            <h2>{`Height : ` + detailsData.height + ` cm`}</h2>
            <h2>Moves</h2>
            <ul>
                {detailsData.moves.map(function(data){
                    return(
                        <li className="moves-list">{data.move.name}</li>
                    )
                   
                })

                }
            </ul>

        </div>
    )
}

export default Detailspage;