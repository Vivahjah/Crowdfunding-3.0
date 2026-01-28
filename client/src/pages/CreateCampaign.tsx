import { money } from "../assets"
import { CustomButton } from "../components"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { ethers } from "ethers"
import { checkIfImage } from "../utils"



type FormProps = {
  name: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
}





const CreateCampaign = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [form, setForm] = useState<FormProps>({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Hello world");
  }



  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 ">
      {isLoading && "Loading..."}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px]
        text-white">Start a Campaign</h1>
      </div>
      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="name" className="font-epilogue font-medium text-[14px]
            leading-[22px] text-white">Your Name</label>
            <input type="text" id="name" placeholder="John Doe"
              className="sm:w-full bg-transparent border-[1px] border-[#3a3a43] 
            rounded-[10px] outline-none py-[15px] px-[20px] font-epilogue
            font-normal text-[14px] leading-[22px] text-white 
            placeholder:text-[#4b5264]"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="title" className="font-epilogue font-medium text-[14px]
            leading-[22px] text-white">Campaign Title</label>
            <input type="text" id="title" placeholder="Write a title"
              className="bg-transparent border-[1px] border-[#3a3a43] 
            rounded-[10px] outline-none py-[15px] px-[20px] font-epilogue
            font-normal text-[14px] leading-[22px] text-white
            placeholder:text-[#4b5264]"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="description" className="font-epilogue font-medium text-[14px]
          leading-[22px] text-white">Story</label>
          <textarea id="description" placeholder="Write your story"
            className="bg-transparent border-[1px] border-[#3a3a43] 
          rounded-[10px] outline-none py-[15px] px-[20px] font-epilogue
          font-normal text-[14px] leading-[22px] text-white
          placeholder:text-[#4b5264] min-h-[120px] resize-none"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="target" className="font-epilogue font-medium text-[14px]
            leading-[22px] text-white">Goal</label>
            <input type="text" id="target" placeholder="ETH 0.50"
              className="bg-transparent border-[1px] border-[#3a3a43] 
            rounded-[10px] outline-none py-[15px] px-[20px] font-epilogue
            font-normal text-[14px] leading-[22px] text-white
            placeholder:text-[#4b5264]"
              value={form.target}
              onChange={(e) => setForm({ ...form, target: e.target.value })} />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="deadline" className="font-epilogue font-medium text-[14px]
            leading-[22px] text-white">End Date</label>
            <input type="date" id="deadline" placeholder="End Date"
              className="bg-transparent border-[1px] border-[#3a3a43]
            rounded-[10px] outline-none py-[15px] px-[20px] font-epilogue
            font-normal text-[14px] leading-[22px] text-white
            placeholder:text-[#4b5264]"
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="image" className="font-epilogue font-medium text-[14px]
          leading-[22px] text-white">Campaign Image</label>
          <input type="text" id="image" placeholder="Place image URL of your campaign"
            className="bg-transparent border-[1px] border-[#3a3a43]
          rounded-[10px] outline-none py-[15px] px-[20px] font-epilogue
          font-normal text-[14px] leading-[22px] text-white
          placeholder:text-[#4b5264]"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })} />
        </div>
        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071] min-w-[170px]"
          />
        </div>


      </form>
    </div>
  )
}

export default CreateCampaign