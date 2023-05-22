
import profile from "../../assets/profile.png";
import Linechart from "../../data/lineChart";
import Spot from "../../assets/spot.svg";
import Convert from "../../assets/convert.svg";
import Earn from "../../assets/earn.svg";
import Futures from "../../assets/futures.svg";

function DashBoard () {

    return (<div className="container-fluit">
        <div className="userProfile">
            <div id="UserProfile ">
                <img src={profile} />
            </div>
            <div className="personalInfo">
                <div className="upperInfo">  
                    <p id="userName">Samuel Chost</p>
                    <i className="fa-solid fa-pen-to-square"></i>
                    <span id="accountType">Personal</span>
                </div>
                <div className="lowerInfo">
                    <div>
                        <span>User ID</span>
                        <span>123123</span>
                    </div>
                    <div>
                        <span>User Type</span>
                        <span>123123s</span>
                    </div>
                    <div>
                        <span>Account activity</span>
                        <span>2023-05-12 18:22:05(103.217.159.181)</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="dash-Main-Container">
            <div className="dashPortfolio">
                <div className="estimatedAssest">
                    <div className="Balance">
                        <span>Estimated Balance</span> 
                        <i className="fa-solid fa-eye"></i>
                    </div>
                    <div className="dash-buttons">
                        <button className="deposit btn">Deposit</button>
                        <button className="withdraw btn">Withdraw</button>
                        <button className="buyCrypto btn">Buy crypto</button>
                    </div>
                </div>
                <div id="Balance">
                    <span>12.2134242424</span>
                    <i className="fa-solid fa-chevron-down Options"></i>
                    <i className="fa-solid fa-equals"></i>
                    <span>124124.235 <span>USD</span></span>
                </div>
                <div>
                    <div className="dashPortfolioChart">
                        <div>
                            <h4>Weekly portfolio activity</h4>
                            <p>Your weekly assest change will be updated before 8:00 server time</p>
                        </div>
                        <div className="marketOverview">
                            <i class="fa-solid fa-chart-simple"></i>
                            <a href="/market">Market overview</a>
                        </div>
                    </div>
                    <Linechart/>
                </div>

            </div>
            <div className="RightDashBoard">
                <div className="ExploreBox">
                    <h2>Explore</h2>
                    <div class="group">
                        <svg class="icon" aria-hidden="true" viewBox="0 0 24 24">
                            <g>
                               <path 
                                d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                            </g>
                        </svg>
                        <input placeholder="Coin, Function & Anouncement" type="search" className="input"/>
                    </div>

                </div>
                <div className="RecommendedBox">
                    <h2>Recommended For You</h2>
                    <div id="carouselIndicators" className="carousel slide">
                        <div className="carousel-inner">
                                <div className="carousel-item active" id="Spot_recommended">
                                    <img src={Spot} alt="Spot"/>
                                    <div>
                                        <h4>Spot trading</h4>
                                        <p>Trade crypto with advance tools</p>
                                    </div>
                                </div>
                                <div class="carousel-item" id="SimpleEarn_recommended">
                                    <img src={Earn}alt="Earn"/>
                                    <div>
                                        <h4>Simple Earn</h4>
                                        <span>BTC APR up to <span>6.5%</span></span>
                                        <p>One-step investment solution, enjoy high returns</p>
                                    </div>
                                </div>
                                <div class="carousel-item" id="Futures_recommended">
                                    <img src={Futures} alt="Futures"/>
                                    <div>
                                        <h4>Futures</h4>
                                        <p>Full range of crypto-derivative instruments
</p>
                                    </div>
                                </div>
                                <div class="carousel-item" id="Convert_recommended">
                                    <img src={Convert} alt="Convert"/>
                                    <div>
                                        <h4>Convert</h4>
                                        <p>The easiest way to trade crypto at 0 fees</p>
                                    </div>
                                </div>
                        </div> 
                        <button className="carousel-control-prev" 
                            type="button" data-bs-target="#" 
                            data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" 
                            type="button" data-bs-            
                            target="#" 
                            data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                        <div className="carousel-indicators">
                                <button type="button" 
                                    data-bs-target="#Spot_recommended" 
                                    data-bs-slide-to="0" 
                                    className="active" 
                                    aria-current="true" 
                                    aria-label="Slide 1"></button>
                                <button type="button" 
                                    data-bs-target="#SimpleEarn_recommended" 
                                    data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" 
                                    data-bs-target="#Futures_recommended" 
                                    data-bs-slide-to="2" aria-label="Slide 3"></button>
                                <button type="button" 
                                    data-bs-target="#Convert_recommended" 
                                    data-bs-slide-to="3" aria-label="Slide 4"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
export default DashBoard