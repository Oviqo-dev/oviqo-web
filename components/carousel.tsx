import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";

export default function Carousel({activeItemIndex, setActiveItemIndex, carouselData})
{
    return(
        <>
        <div className="text-black flex items-center gap-2">
        <button 
            onClick={()=>{
               activeItemIndex !== 0  && setActiveItemIndex(prevIndex=>prevIndex-1)
            }}>
            <HiArrowSmLeft/>
        </button>


        <div className="w-full max-w-full grid place-items-center bg-gray-200 rounded-md h-100">{carouselData[activeItemIndex].title}</div>
        <button onClick={()=>{
               activeItemIndex !== carouselData.length-1  && setActiveItemIndex((prevIndex)=>prevIndex+1)
            }}><HiArrowSmRight/></button>
        </div>
        </>
    )

};

