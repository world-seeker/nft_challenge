import Image from "next/image";
import {signIn,signOut,useSession} from "next-auth/react"


import { SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon,
    HomeIcon,
} from '@heroicons/react/outline';
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState } from "../../atoms/modalAtom";



function Header() {

    const {data:session} = useSession();
    const router = useRouter();
    const [open,setOpen] = useRecoilState(modalState);
    
  


  return (
    <div className="shadow-sm border-b px-2 bg-white sticky top-0 z-50" >
        <div className="flex mx-auto justify-between max-w-6xl">
            {/** Left */}
            <div onClick={()=>router.push('/')} className="relative w-24  hidden lg:inline-grid cursor-pointer ">
                <Image
                className="object-contain"
                alt={"inst"}
                src = "https://links.papareact.com/ocw"
                fill
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
               />         
            </div>
            <div onClick={()=>router.push('/')} className="relative  w-10 lg:hidden flex-shrink-0 cursor-pointer">
            <Image
                className="object-contain"
                alt={"inst"}
                src = "https://links.papareact.com/jjm"
                fill
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              />
            </div>
           {/**Center */}
          <div className="max-w-xs">
             <div className="relative p-3   mt-1"> 
               <div className="inset-y-0 absolute pl-3 flex items-center
               pointer-events-none">
                <SearchIcon className="h-5 w-5 
                text-gray-500"/>
               </div>
                <input
                className="bg-gray-50 block w-full pl-10 sm:text-sm 
                border border-gray-300 rounded-md
                 focus:ring-black focus:border-black"
                 type="text"
                  placeholder="search"
                  />
             </div>
          </div>



           {/** Right */}
           <div className="flex items-center justify-end space-x-4">
       <HomeIcon onClick={()=>router.push('/')} className='h-6 w-10 navbtn'/>
       <MenuIcon className='w-12 cursor-pointer md:hidden hover:scale-125 transition-all duration-150 ease-out '/>
       

        {session ? (
          <>
          
        <div className='relative navbtn'>
        <PaperAirplaneIcon className="rotate-45 h-6 w-10 navbtn hidden md:inline-grid"/>
       <div className="absolute -top-1 -right-2 justify-center text-white text-xs w-5 h-5 bg-red-500 flex md:items-center animate-pulse rounded-full  ">3</div>
       </div>
        <PlusCircleIcon onClick={()=>setOpen(true)} className="navbtn h-6 w-10"/>
        <UserGroupIcon className="navbtn h-6 w-10"/>
         <HeartIcon className="navbtn h-6 w-10"/>
       
         <img
          onClick={signOut}
         className="rounded-full h-10 w-10 cursor-pointer" 
         src={session?.user?.image}
         alt="pp"
         />
         </>
        ):
        <button onClick={signIn}>SignIN</button>
        }


      
       </div>
      




        </div>
     



    </div>
  )
}

export default Header