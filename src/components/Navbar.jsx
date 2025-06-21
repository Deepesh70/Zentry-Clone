import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';    

const NAV_ITEMS = [
    'Nexus', 'Vault', 'Prolugue', 'About', 'Contact'];

   
const Navbar = () => {
    const[isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const navContainerRef = useRef(null);
    const audioElementRef = useRef(null);
    
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true);


    const { y:currentScrollY} = useWindowScroll();    useEffect(() => {
        const navContainer = document.querySelector('header');
        const navElement = document.querySelector('nav');
        if (!navContainerRef.current || !navContainer || !navElement) return;
        
        if (currentScrollY === 0) {
            setIsNavVisible(true);
            navElement.classList.remove('floating-nav');
        } else if(currentScrollY > lastScrollY) {
            setIsNavVisible(false);
            navElement.classList.add('floating-nav');
        } else if(currentScrollY < lastScrollY) {
            setIsNavVisible(true);
            navElement.classList.add('floating-nav');
        }
        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.3,
            ease: "power2.out"
        })     }, 
        [isNavVisible])
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
        }     }, [isAudioPlaying]);    return (               <header ref={navContainerRef} className='fixed top-0 left-0 z-50 w-full bg-transparent transition-all duration-300 px-4 py-2'>
        <nav className='flex size-full items-center justify-between p-4 rounded-xl bg-transparent'>
            <div className='flex items-center gap-7 '>            
                <img src='/img/logo.png' alt='Logo' className='w-10' />
                <Button 
                id="product-button"
                title="products"
                rightIcon= {<TiLocationArrow/>}
                containerClass= "bg-blue-50 flex items-center justify-center gap-1"
                />
            
            </div>
            <div className='flex h-full items-center'>                <div className='hidden md:block'>                        {NAV_ITEMS.map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className='nav-hover-btn text-white font-semibold hover:text-yellow-300'>
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