/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {

    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    });
    const [myCoins, SetMyCoins] = useState([]);

    useEffect(() => {
        const ls = localStorage.getItem("myCoins") ? JSON.parse(localStorage.getItem("myCoins")) : [];
        SetMyCoins(ls);
    },[]);

    const fetchAllCoin = async () => {

        try{
            const options = {
                method: 'GET',
                headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-KcFVP4LJpaDxFzP3Z1ffhYTf'}
            };

            const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options);

            const data = await res.json();

            // console.log("data",data);

            setAllCoin(data);
        }
        catch(err){
            console.log(err);
        }

    }

    const AddCoins = (coin) => {
        const index = myCoins.find((item) => item.id === coin.id);
        if( index === undefined){
            const newCoins = [ coin, ...myCoins];
            localStorage.setItem("myCoins", JSON.stringify(newCoins));
            SetMyCoins(newCoins);
            toast.success("Crypto added to your wallet successfully");
            return;
        }
        toast.error("Crypto already exists in your wallet");
    }

    const RemoveCoins = (coin) => {
        const newCoins = myCoins.filter((item) => item.id !== coin.id);
        SetMyCoins(newCoins);

        localStorage.setItem("myCoins", JSON.stringify(newCoins));

        toast.success("Crypto successfully removed from your wallet");
    }

    useEffect(()=>{

        fetchAllCoin();

    },[currency]);

    const contextValue = {
        allCoin,
        currency,
        setCurrency,
        myCoins,
        AddCoins,
        RemoveCoins
    }

    return (
        <CoinContext.Provider
        value={contextValue}
        >
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;