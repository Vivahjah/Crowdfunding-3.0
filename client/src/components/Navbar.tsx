import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CustomButton } from "./"
import { logo, menu, search, thirdweb } from "../assets"
import { navlinks } from "../constants"



const Navbar = () => {

  const [isActive, setIsActive] = useState<string>("dashboard")
  const [toggle, setToggle] = useState<boolean>(false)
  const [toggleDrawer, setToggleDrawer] = useState<boolean>(false)
  const navigate = useNavigate()

  const address = "0x123...abc"





  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px]
    gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px]
       bg-[#1c1c24] rounded-[100px]">
        <input type="text" placeholder="Search for campaigns"
          className="flex w-full font-epilogue font-normal text-[14px]
        placeholder:text-[#4b5264] text-white bg-transparent outline-none" />
        <div className="w-[71px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center 
        cursor-pointer">
          <img src={search} alt="search" className="w-[15px] h-[15px] object-contain " />
        </div>
      </div>
      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={!address ? "Create a campaign" : "Connect"}
          styles={!address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
          handleClick={() => {
            if (address) navigate("create-campaign")
            else console.log("connect")
          }}
        />
        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center 
          items-center cursor-pointer">
            <img src={thirdweb} alt="user" className="w-[50%] h-[50%] object-contain" />
          </div>
        </Link>
      </div>
      {/* Small screen navbar */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center
          items-center cursor-pointer">
          <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" />
        </div>
        <img src={menu} alt="menu" className="w-[30px] h-[30px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)} />
        <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10
        shadow-secondary py-4 ${!toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"}
        transition-all duration-700`}>
          {navlinks.map((link) => (
            <div key={link.name} className={`flex p-4 ${isActive === link.name && "bg-[#3a3a43]"}`}
              onClick={() => {
                setIsActive(link.name)
                setToggleDrawer(false)
                navigate(link.name === "dashboard" ? "/" : `/${link.name}`)
              }}>
              <img src={link.imgUrl} alt={link.name} className="w-[24px] h-[24px] object-contain" />
              <p className="ml-4 font-epilogue font-normal text-[16px] text-white">{link.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Navbar