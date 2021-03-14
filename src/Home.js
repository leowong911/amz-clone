import React from 'react'
import './css/Home.css'
import Product from './Product'




function Home() {
    return (
        <div className='home'>
            <div className='home__container'>
                <img className='home__image'
                src="https://images-fe.ssl-images-amazon.com/images/G/09/JP-hq/2020/img/Amazon_Pantry/XCM_Manual_1278771_JP_gw_hero_2_3474615_3000x1200_2X._CB417334680_.jpg"
                alt="" />

            <div className='home__row'>
                <Product 
                    id = {1}
                    title='カゴメ 朝のフルーツこれ一本 200ml×3本' 
                    price={14.5} 
                    image='https://images-na.ssl-images-amazon.com/images/I/91pcBsMh2KL._AC_SL1500_.jpg' 
                    rating={4}/>
                <Product 
                    id = {2}
                    title='シルコット 消毒ウェットティッシュ つめかえ用 40枚入×3個' 
                    price={35} 
                    image='https://images-na.ssl-images-amazon.com/images/I/617BhcIjgnL._AC_SL1000_.jpg' 
                    rating={3}/>
            </div>

            <div className='home__row'>
            <Product 
                    id = {3}
                    title='【5G対応格安SIM】「事務手数料3,300円が無料」iPhone12対応/家族割あり/SIMカードのみ/Ymobile SIMスターターキット' 
                    price={7.5} 
                    image='https://images-na.ssl-images-amazon.com/images/I/71vnTFnRG3L._AC_SL1500_.jpg' 
                    rating={5}/>
                    <Product 
                    id = {4}
                    title='アサヒ飲料 「カラダカルピス」430 430ml ×3本 [機能性表示食品]' 
                    price={28} 
                    image='https://images-na.ssl-images-amazon.com/images/I/81IRoqnIZkL._AC_SL1500_.jpg' 
                    rating={4}/>
                    <Product 
                    id = {5}
                    title='ワンランク上のつけごこち ネピア 鼻セレブ マスク めくる ふつうサイズ 4枚入' 
                    price={25} 
                    image='https://images-na.ssl-images-amazon.com/images/I/816B9W8A6EL._AC_SL1500_.jpg' 
                    rating={3}/>
            </div>

            <div className='home__row'>
            <Product 
                    id = {6}
                    title='Apple iPhone 11 Pro 64GB ミッドナイトグリーン SIMフリー (整備済み品)' 
                    price={5600} 
                    image='https://images-na.ssl-images-amazon.com/images/I/41j9jBfwwQL._AC_.jpg' 
                    rating={4}/>
            </div>

            </div>
        </div>
    )
}

export default Home
