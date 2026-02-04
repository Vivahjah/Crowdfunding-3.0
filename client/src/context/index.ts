import { create } from "zustand"
import {
    getContract,
    readContract,
    prepareContractCall,
    sendTransaction,
} from "thirdweb";
import { ethers } from "ethers";

import {
    Account,
    createWallet,
    inAppWallet,
    // metaMaskWallet,
    walletConnect,
    // rainbowWallet,
} from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";
import { sepolia } from "thirdweb/chains";


export interface CampaignForm {
    title: string;
    description: string;
    target: string;
    deadline: string;
    image: string;
}

export interface Campaign {
    owner: string;
    title: string;
    description: string;
    target: string;
    deadline: number;
    amountCollected: string;
    image: string;
    pId: number;
}

interface Donation {
    donator: string;
    donation: string;
}


interface CampaignStore {
    account?: Account;
    isConnecting?: boolean;
    address?: string;

    setAccount: (account?: Account) => void;
    setIsConnecting?: (isConnecting: boolean) => void;
    // setAddress?: (address?: string) => void;

    createCampaign: (form: CampaignForm) => Promise<void>;
    getCampaigns: () => Promise<Campaign[]>;
    getUserCampaigns: () => Promise<Campaign[]>;
    donate: (pId: number, amount: string) => Promise<void>;
    getDonations: (pId: number) => Promise<Donation[]>;
    connect: () => Promise<void>;
    disconnect: () => void;
}


// Configure wallets
const wallets = [
    // metaMaskWallet(),
    walletConnect(),
    inAppWallet({
        auth: {
            options: ["email", "google", "apple", "facebook"],
        },
    }),
    // rainbowWallet(),
];



const client = createThirdwebClient({
    clientId: import.meta.env.VITE_CLIENT_ID!,
})


const contract = getContract({
    chain: sepolia,
    address: "0x84e2dba0c5151ee92e5ff0be0bd7b170b62c4bd4",
    client: client,
})

/* --------------------------- Zustand Store ------------------------------- */

export const useCampaignStore = create<CampaignStore>((set, get) => ({
    account: undefined,
    address: undefined,
    isConnecting: false,

    setAccount: (account) => set({
        account,
        address: account?.address,
        isConnecting: false
    }),



    /* -------------------- Connect Wallet -------------------- */
    connect: async () => {
        try {
            set({ isConnecting: true });

            // Connect using MetaMask (you can make this configurable)
            const wallet = createWallet("io.metamask");

            const account = await wallet.connect({
                client,
                chain: sepolia,
            });

            set({
                account,
                address: account.address,
                isConnecting: false
            });

            console.log("Connected successfully:", account.address);
        } catch (error) {
            console.error("Failed to connect wallet:", error);
            set({ isConnecting: false });
            throw error;
        }
    },

    /* -------------------- Disconnect Wallet -------------------- */
    disconnect: () => {
        set({
            account: undefined,
            address: undefined,
            isConnecting: false
        });
        console.log("Disconnected");
    },


    /* -------------------- Create Campaign -------------------- */
    createCampaign: async (form) => {
        const { account } = get();
        if (!account) throw new Error("Wallet not connected");

        const tx = prepareContractCall({
            contract,
            method:
                "function createCampaign(address owner,string title,string description,uint256 target,uint256 deadline,string image)",
            params: [
                account.address,
                form.title,
                form.description,
                ethers.parseEther(form.target),
                BigInt(new Date(form.deadline).getTime()),
                form.image,
            ],
        });

        await sendTransaction({
            transaction: tx,
            account,
        });
    },

    /* -------------------- Get All Campaigns -------------------- */
    getCampaigns: async () => {
        const { account } = get();
        if (!account) throw new Error("Wallet not connected");

        try {
            const data = await readContract({
                contract,
                method: "function getCampaigns() view returns ((address,string,string,uint256,uint256,uint256,string,address[],uint256[])[])",
                params: [],
            } as any);


            

            const campaigns = data as any[];

            return campaigns.map((campaign: any, i: number) => ({
                owner: campaign[0],
                title: campaign[1],
                description: campaign[2],
                target: ethers.formatEther(campaign[3] || "0"),
                deadline: Number(campaign[4] || 0),
                amountCollected: ethers.formatEther(campaign[5] || "0"),
                image: campaign[6],
                pId: i,
            }));
        } catch (error) {
            console.error("Error fetching campaigns:", error);
            throw error;
        }
    },

    /* -------------------- Get User Campaigns -------------------- */
    getUserCampaigns: async () => {
        const { account, getCampaigns } = get();
        if (!account) return [];

        const campaigns = await getCampaigns();
        return campaigns.filter(
            (campaign) => campaign.owner === account.address
        );
    },

    /* -------------------- Donate -------------------- */
    donate: async (pId, amount) => {
        const { account } = get();
        if (!account) throw new Error("Wallet not connected");

        const tx = prepareContractCall({
            contract,
            method: "function donateToCampaign(uint256 pId) payable",
            params: [BigInt(pId)],
            value: ethers.parseEther(amount),
        });

        await sendTransaction({
            transaction: tx,
            account,
        });
    },

    /* -------------------- Get Donations -------------------- */
    getDonations: async (pId) => {
        const donations = await readContract({
            contract,
            method:
                "function getDonators(uint256 pId) view returns (address[], uint256[])",
            params: [BigInt(pId)],
        });

        const [donators, amounts] = donations as [string[], bigint[]];

        return donators.map((donator, i) => ({
            donator,
            donation: ethers.formatEther(amounts[i]),
        }));
    },
}));