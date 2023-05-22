import "../Ani.css";
import three from "../assets/spinThree.png";
import two from "../assets/spinTwo.png";
import one from "../assets/spinOne.png";
import "../App.css";
import { useEffect, useState,useRef } from "react";


function SpinCard (pros) {
    const imgData = [
    {
      ImageNo:1,
      ImageSrc:one
     },
     {
        ImageNo:2,
        ImageSrc:two
     },
     {
        ImageNo:3,
        ImageSrc:three
     }];
     const SliderPros = {
        ImageNo:"",
        ImageSrc:""
     }

    const [sliderPros, setSliderPros] = useState(SliderPros);
    const {ImageNo , ImageSrc} = sliderPros;
    const [count, setCount] = useState(0);
    const [aniCls , setAniCls] = useState("displayBlock faded");
    const PreFnc = () => {
        setAniCls(()=>("displayNone faded"));
        setTimeout(()=>{
            setAniCls("displayBlock faded");
        },100);
        if (count>0) {
            setCount((pre)=>pre-1)
        };
        if (count===0) {
            setCount(imgData.length-1)
        };
    };
    const NextFnc = () => {
        setAniCls("displayNone faded");
        setTimeout(()=>{
            setAniCls("displayBlock faded")
        },100)
        if (count <=imgData.length-2) {
            setCount((pre)=>pre+1) 
        }
        if (count === imgData.length-1) {
            setCount(0)
        }

    }
    useEffect(()=>{
        setSliderPros((pre)=>({
        ...pre, ImageNo:imgData[count].ImageNo , ImageSrc:imgData[count].ImageSrc
        }))
    },[count])
    useEffect(()=>{
        const interval = setInterval(()=>{
            NextFnc();
        },pros.intervalTime);
        return ()=>clearInterval(interval)

    },[count])
 
    return <div className="BOX">
        <div>
            <img src={ImageSrc} className={aniCls}></img>
        </div>
        <section className="btns">
              <button className="Prev" onClick={PreFnc}></button>
              <button className="Next" onClick={NextFnc}></button>
        </section>
       
    </div>
}
export default SpinCard;