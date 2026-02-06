// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {

    // Campaign structure to hold campaign details
    //like an object that defines the properties of a crowdfunding campaign
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    //Mapping to store campaigns with unique IDs
    //like a dictionary that links each campaign ID to its corresponding Campaign details
    //so each IDs points to a Campaign structure
    mapping(uint256 => Campaign) public campaigns;

    //Counter to keep track of the number of campaigns created
    uint256 public numberOfCampaigns = 0;


    // Function to create a new crowdfunding campaign
    function createCampaign(// anyone that wants to start a campaign can call this function and provide the necessary details
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];// Create a new campaign at the current numberOfCampaigns index

        // Ensure the deadline is in the future
        require(
            _deadline > block.timestamp,
            "The deadline should be a date in the future."
        );

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;// Increment the campaign counter

        return numberOfCampaigns - 1; // Return the ID of the newly created campaign
    }


 
    // Function to donate to a specific campaign
function donateToCampaign(uint256 _id) public payable {
    uint256 amount = msg.value;

    require(amount > 0, "Donation amount must be greater than 0");
    require(_id < numberOfCampaigns, "Invalid campaign ID");
    require(block.timestamp < campaigns[_id].deadline, "Campaign has ended");

    Campaign storage campaign = campaigns[_id];
    
    // Add the donor's address to the donators array
    campaign.donators.push(msg.sender);
    // Add the donation amount to the donations array
    campaign.donations.push(amount);
    
    // Increment amountCollected FIRST
    campaign.amountCollected += amount;

    // Then transfer the funds to the campaign owner
    (bool sent, ) = payable(campaign.owner).call{value: amount}("");

    // If transfer fails, revert the transaction
    require(sent, "Failed to send donation to campaign owner");
}

    // Function to get the list of donators and their donations for a specific campaign
    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);// Return the donators and donations arrays for the specified campaign

    }

    // Function to get all campaigns
    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);// Create a temporary array to hold all campaigns

        for (uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];// Retrieve each campaign from the mapping
            allCampaigns[i] = item;// Add the campaign to the temporary array
        }

        return allCampaigns; // Return the array of all campaigns
    }
    
}