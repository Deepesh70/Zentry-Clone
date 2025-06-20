import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';

const NAV_ITEMS = [
    'Nexus', 'Vault', 'Prolugue', 'About', 'Contact'];

   
const Navbar = () => {
    const[isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    // const navContainerRef = useRef(null);
    const audioElementRef = useRef(null);
     const toggleAudioIndicator = () =>{
        setIsAudioPlaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev);

     }
     useEffect(() => {
        if(isAudioPlaying){
            audioElementRef.current.play();
        }
        else{
            audioElementRef.current.pause();
        }
     }, [isAudioPlaying]);
    return (    
        <header className='relative top-0.5  z-50 w-full '>
        <nav className='flex size-full items-center justify-between p-4    '>
            <div className='flex items-center gap-7 '>            
                <img src='/img/logo.png' alt='Logo' className='w-10' />
                <Button 
                id="product-button"
                title="products"
                rightIcon= {<TiLocationArrow/>}
                containerClass= "bg-blue-50 flex items-center justify-center gap-1"
                />
            
            </div>
            <div className='flex h-full items-center'>
                <div className='hidden md:block'>
                        {NAV_ITEMS.map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className='nav-hover-btn'>
                                {item}
                            </a>
                        ))}
                </div>
                <button className='ml-10 flex items-center space-x-0.5' onClick = {toggleAudioIndicator}><audio ref={audioElementRef} className='hidden' src="/audio/loop.mp3" loop/>
                {[1,2,3,4].map((bar) =>(
                    <div key={bar} className={`indicator-line ${isIndicatorActive ? "active" : ""}`} style={{animationDelay: `${bar*0.1}s`}}/>
                ))}
                </button>
            </div>
        </nav>
            
        </header>
            )
}
export default Navbar;