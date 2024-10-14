import React, { useContext, useEffect, useState } from 'react';
import "./Coin.css";
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {

    const { coinId } = useParams();

    const {currency, AddCoins} = useContext(CoinContext);

    const [coinData, setCoinData] = useState();
    const [histData, setHistData] = useState();

    const fetchCoinData = async () => {

        try{
            const options = {
                method: 'GET',
                headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-KcFVP4LJpaDxFzP3Z1ffhYTf'}
            };
              
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);

            const data = await res.json();

            setCoinData(data);
        }
        catch(err){
            console.log(err);
        }
    }

    const fetchHistData = async () => {

        try{
            const options = {
                method: 'GET',
                headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-KcFVP4LJpaDxFzP3Z1ffhYTf'}
            };
              
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options);

            const data = await res.json();

            setHistData(data);
        }
        catch(err){
            console.log(err);
        }

    }

    useEffect(() => {

        fetchCoinData();
        fetchHistData();

    },[coinId, currency]);

    if(coinData && histData){
        return (
            <div className='coin'>
        
                <div className="coin-name">
        
                    <img src={coinData?.image?.large} alt="" />
        
                    <p>
                        <b>
                            {coinData?.name} ({coinData?.symbol.toUpperCase()})
                        </b>
                    </p>
        
                    <button
                    onClick={() => {
                        AddCoins(coinData);
                    }}
                    >
                        Add To My List
                    </button>

                </div>

                <div className="coin-chart">

                    <LineChart
                    histData={histData}
                    ></LineChart>

                </div>

                <div className="coin-info">

                    <ul>
                        <li>
                            Crypto Market Rank
                        </li>
                        <li>
                            {coinData.market_cap_rank}
                        </li>
                    </ul>

                    <ul>
                        <li>
                            Crypto Price
                        </li>
                        <li>
                            {currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}
                        </li>
                    </ul>

                    <ul>
                        <li>
                            Crypto Cap
                        </li>
                        <li>
                            {currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}
                        </li>
                    </ul>

                    <ul>
                        <li>
                            24 Hour High
                        </li>
                        <li>
                            {currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}
                        </li>
                    </ul>

                    <ul>
                        <li>
                            24 Hour Low
                        </li>
                        <li>
                            {currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}
                        </li>
                    </ul>

                </div>
        
            </div>
        )
    }
    else{
        return (
            <div className="spinner">
                <div className="spin"></div>
            </div>
        )
    }

  
}

export default Coin