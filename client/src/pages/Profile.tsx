import React, { useEffect, useState } from 'react'
import { useCampaignStore } from '../context'
import type { Campaign } from '../context';
import { DisplayCampaigns } from '../components';

const Profile = () => {

  const getUserCampaigns = useCampaignStore((state) => state.getUserCampaigns);
  const account = useCampaignStore((state) => state.account);
  const [campaignList, setCampaignList] = useState<Campaign[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);




  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        if (!account) {
          setError('Please connect your wallet to view campaigns');
          return;
        }
        setIsLoading(true);
        const data = await getUserCampaigns();
        setCampaignList(data);
        console.log("Campaigns:", data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching campaigns:", err);  
        setError('Failed to fetch campaigns');
        setIsLoading(false);
      }
    }
    fetchCampaigns();
  }, [account, getUserCampaigns]);



    return (
    <DisplayCampaigns 
      title="My Campaigns"
      isLoading={isLoading}
      campaigns={campaignList}
    />
  )
}
  

export default Profile