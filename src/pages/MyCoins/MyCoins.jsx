// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom';
import "./MyCoin.css";

const MyCoins = () => {

  const {currency, myCoins, RemoveCoins} = useContext(CoinContext);

  return (
    <div className='home'>

      <div className="hero">

        <h1>
          My CryptoPlace
        </h1>

      </div>

      <div className="crypto-table">

            <div className="table-layout">

                <p>#</p>

                <p>
                    Coins
                </p>

                <p>
                    Price
                </p>

                <p style={{textAlign:"center"}}>
                    24H Change
                </p>

                <p className='market-cap'>
                    Market Cap
                </p>

            </div>

            

            {
                  myCoins.map((item, index)=> (
                    <div className="rel" key={index}>

                    <button className='del'
                    onClick={() => {
                      RemoveCoins(item);
                    }}
                    >
                      X
                    </button>

                    <Link className="table-layout"
                    to={`/coin/${item.id}`}
                    >

    
                        <p>{item.market_cap_rank}</p>
                          

                        <div>
                            <img src={item?.image?.large} alt="" />
                            <p>
                              {item?.name} - {item?.symbol}
                            </p>
                        </div>


                        <p>
                          {currency.symbol} {item.market_data.current_price[currency.name].toLocaleString()}
                        </p>

                        <p style={{textAlign:"center"}} 
                        className={item.market_data.market_cap_change_percentage_24h > 0 ? "green":"red"}
                        >
                            {Math.floor(item.market_data.market_cap_change_percentage_24h*100)/100}
                        </p>

                        <p className='market-cap'>
                        {currency.symbol} {item.market_data.market_cap[currency.name].toLocaleString()}
                        </p>

                    </Link>
                    </div>
                ))
            }

        </div>

    </div>
  )
}

export default MyCoins