import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";

interface CarouselItems{
    title: string;
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
               if (activeItemIndex !== 0){ setActiveItemIndex(prevIndex=>prevIndex-1)}
            }}>
            <HiArrowSmLeft/>
        </button>


        <div className="w-full max-w-full grid place-items-center bg-gray-200 rounded-md h-100">{carouselData[activeItemIndex].title}</div>
        <button onClick={()=>{
               if( activeItemIndex !== carouselData.length-1)  {setActiveItemIndex((prevIndex)=>prevIndex+1)}
            }}><HiArrowSmRight/></button>
        </div>
        </>
    )

};

