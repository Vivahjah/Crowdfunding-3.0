import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

// import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { useCampaignStore } from '../context';
// import { checkIfImage } from '../utils';
import {useActiveAccount} from "thirdweb/react";





type FormData = {
  name: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
}

type FormFieldChangeHandler = (fieldName: keyof FormData, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void ;

const CreateCampaign = () => {

const activeAccount = useActiveAccount();

  const createCampaign = useCampaignStore((state) => state.createCampaign);
  const setAccount = useCampaignStore((state) => state.setAccount);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [form, setForm] = useState<FormData>({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
    
  });

  const handleFormFieldChange: FormFieldChangeHandler = (fieldName, e): void => {
    setForm({ ...form, [fieldName]: e.target.value })


  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!form.title || !form.description || !form.target || !form.deadline || !form.image ) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      await createCampaign(form);
      console.log("Campaign created successfully");
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
    console.log(form);
    // Submit logic here


    // checkIfImage(form.image, async (exists) => {
    //   if(exists) {
    //     setIsLoading(true)
    //     await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)})
    //     setIsLoading(false);
    //     navigate('/');
    //   } else {
    //     alert('Provide valid image URL')
    //     setForm({ ...form, image: '' });
    //   }
    // })
  }

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#8c6dfd] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img src={money} alt="money" className="w-[40px] h-[40px] object-contain" />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will get 100% of the raised amount</h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="number"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <FormField
          labelName="Campaign image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  )
}


export default CreateCampaign