import { GenericVestBtn } from '../shared/button/ButtonElements';
import ApprovalSymbol from '../svgs/ApprovalSymbol';
import Confetti from 'react-confetti';

export const TradeConfirmRender = ({
    ConfirmTrade,
    confirm,
    setConfirm,
    onClickConfirm,
    numOfCoins,
    finalStep,
    price,
    totalCost,
    img,
    name,
    history,
}) => {
    return (
        <>
            {finalStep ? (
                <>
                    <ConfirmTrade confirm={confirm}>
                        <div className="img-name-wrapper">
                            <img className="coin-img" src={img} />
                            <h2>{name}</h2>
                        </div>
                        <ApprovalSymbol className="approval-icon" />
                        <h2>Your order was to concluded!</h2>
                        <span>
                            You have bought {numOfCoins} {name}
                        </span>
                        <div className="brokage-wrapper"></div>

                        <GenericVestBtn
                            bg="var(--clr-primary)"
                            hovbg="var(--clr-primary__dimmer)"
                            co="var(--body)"
                            br="2rem"
                            border="0.125rem solid var(--clr-primary)"
                            pad="0.6rem 3rem"
                            onClick={() => history.push('/profile')}
                        >
                            Continue
                        </GenericVestBtn>
                        <Confetti
                            width={window.innerWidth}
                            height={window.innerHeight}
                        />
                    </ConfirmTrade>
                </>
            ) : (
                <ConfirmTrade confirm={confirm}>
                    <div className="img-name-wrapper">
                        <img className="coin-img" src={img} />
                        <h2>{name}</h2>
                    </div>
                    <div className="brokage-wrapper">
                        <span>Amount</span>
                        <span>{numOfCoins}</span>
                    </div>
                    <div className="brokage-wrapper">
                        <span>Price</span>
                        <span>{price.toFixed(2)}$</span>
                    </div>
                    <div className="brokage-wrapper">
                        <span>Trading Fee</span>
                        <span>{(numOfCoins / 20).toFixed(2)}$</span>
                    </div>
                    <div className="amountWrapper">
                        <span>Total Amount</span>
                        <span>{totalCost.toFixed(2)} $</span>
                    </div>
                    <GenericVestBtn
                        bg="var(--clr-primary)"
                        hovbg="var(--clr-primary__dimmer)"
                        co="var(--body)"
                        br="2rem"
                        border="0.125rem solid var(--clr-primary)"
                        pad="0.6rem 3rem"
                        onClick={() => onClickConfirm(numOfCoins)}
                    >
                        Confirm trade
                    </GenericVestBtn>
                    <button
                        className="cancel-btn"
                        onClick={() => setConfirm(false)}
                    >
                        Cancel
                    </button>
                </ConfirmTrade>
            )}
        </>
    );
};

// export const TradeCryptoRender = ({}) => {

//     return (
//         <section>
//         <div className="stock-overview-wrapper">
//             <img
//                 className="coin-img"
//                 src={cryptoData.image.large}
//             />
//             <span
//                 style={
//                     cryptoData.market_data
//                         .price_change_percentage_24h < 0
//                         ? {
//                               color:
//                                   'var(--lighter-red)',
//                           }
//                         : {
//                               color:
//                                   'var(--lighter-green)',
//                           }
//                 }
//             >
//                 {cryptoData.market_data
//                     .price_change_percentage_24h > 0 ? (
//                     <i className="fas fa-long-arrow-alt-up"></i>
//                 ) : (
//                     <i className="fas fa-long-arrow-alt-down"></i>
//                 )}
//                 {cryptoData.market_data.price_change_percentage_24h.toFixed(
//                     2
//                 )}
//                 %
//             </span>
//             <h2>{cryptoData.id}</h2>
//             <span>
//                 {cryptoData.market_data.current_price.usd.toFixed(
//                     2
//                 )}{' '}
//                 $
//             </span>
//             <span>
//                 Your holding: {holding.toFixed(2)}
//             </span>
//         </div>

//         <label>
//             Wallet
//             <div className="wallet-wrapper">
//                 {!userData.currency
//                     ? 'Loading...'
//                     : userData.currency.currency.toLocaleString()}{' '}
//                 $
//             </div>
//         </label>

//         <label>
//             Total amount in dollar
//             <ReusabelInputField
//                 id="amount-dollar"
//                 min="0"
//                 placeholder="Total amount"
//                 type="number"
//                 onChange={setValuesDom}
//                 value={amountInDollar}
//             />
//         </label>

//         <label>
//             Amount of coins
//             <ReusabelInputField
//                 step=".01"
//                 min="0"
//                 max="999"
//                 placeholder="Amount"
//                 type="number"
//                 onChange={setValuesDom}
//                 value={numOfCoins}
//             />
//         </label>

//         <div className="brokage-wrapper">
//             <span>Trading Fee</span>
//             <span>{(numOfCoins / 2).toFixed(2)}$</span>
//         </div>
//         <div className="amountWrapper">
//             <span>Total Amount</span>
//             <span>{totalCost.toFixed(2)} $</span>
//         </div>
//         <div className="buttonWrapper">
//             <GenericVestBtn
//                 bg="var(--primary)"
//                 hovbg="var(--lighter-green)"
//                 co="var(--body)"
//                 br="2rem"
//                 border="0.125rem solid var(--primary)"
//                 pad="0.6rem 3rem"
//                 onClick={onButtonClick}
//             >
//                 BUY
//             </GenericVestBtn>
//             <GenericVestBtn
//                 bg="white"
//                 hovbg="var(--lighter-red)"
//                 co="var(--primary)"
//                 br="2rem"
//                 border="0.125rem solid var(--primary)"
//                 pad="0.6rem 3rem"
//                 onClick={onButtonClick}
//             >
//                 SELL
//             </GenericVestBtn>
//         </div>
//     </section>
//     )
// }
