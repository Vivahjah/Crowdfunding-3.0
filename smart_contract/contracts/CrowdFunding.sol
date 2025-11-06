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
    function donateToCampaign() {}

    // Function to get the list of donators and their donations for a specific campaign
    function getDonators() {}

    // Function to get all campaigns
    function getCampaigns() {}
}
+