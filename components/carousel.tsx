import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";

interface CarouselItems{
    title: string;
    type: string;
}

interface CarouselProps{
    activeItemIndex:number;
    setActiveItemIndex: React.Dispatch<React.SetStateAction<number>>;
    carouselData: CarouselItems[];
}


export default function Carousel({activeItemIndex, setActiveItemIndex, carouselData}:CarouselProps)
{
    return(
        <>
        <div className="text-black flex items-center gap-2">
        <button 
            onClick={()=>{
                if (activeItemIndex !== 0)
                { 
                    setActiveItemIndex(prevIndex=>prevIndex-1)
                }
                else
                {
                    setActiveItemIndex(carouselData.length-1)
                }
            }} className="h-7.5 w-7.5 bg-gray-200 rounded-full justify-items-center mx-auto hover:bg-gray-300">
            <HiArrowSmLeft/>
        </button>


        <div className="w-full max-w-full grid bg-gray-200 rounded-md h-100">
            <div className="flex">
                <div className="flex-1 max-w-[40%] flex items-center justify-center">
                    <div className="bg-white rounded-md p-2 pt-0 pb-0"><div>{carouselData[activeItemIndex].type}</div></div>
                    <div className="text-4xl " >{carouselData[activeItemIndex].title}</div>
                </div>

                <div className="flex-1 max-w-[60%] bg-white m-3 rounded-lg">

                </div>
            
            </div>
        
        </div>


        <button onClick={()=>{
               if( activeItemIndex !== carouselData.length-1)  
                {
                    setActiveItemIndex((prevIndex)=>prevIndex+1)
                }
                else
                {
                    setActiveItemIndex(0)
                }
            }} className="h-7.5 w-7.5 bg-gray-200 rounded-full justify-items-center mx-auto hover:bg-gray-300"><HiArrowSmRight/></button>
        </div>
        </>
    )

};

