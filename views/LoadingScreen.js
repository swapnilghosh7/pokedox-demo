import react , {useEffect} from 'react';
import Image from 'next/image';
export const LoadingScreen = () => {
    return(
        <div className="loading-screen">
            <div className="loader">
            <Image
                src="/1491.gif"
                alt="Loader"
                width={80}
                height={80}
            />
            </div>
        </div>
    )
}