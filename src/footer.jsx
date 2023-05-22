import "./App.css";
function Footer () {
    return <footer>
    <div className="box-container">
            <div className="box">
                <h3>Branches</h3>
                <a href="#"> <i className="fa-solid fa-location-dot"></i> india </a>
                <a href="#"> <i className="fa-solid fa-location-dot"></i> USA </a>
                <a href="#"> <i className="fa-solid fa-location-dot"></i> france </a>
                <a href="#"> <i className="fa-solid fa-location-dot"></i>japan </a>
                <a href="#"> <i className="fa-solid fa-location-dot"></i>russia </a>
            </div>   
             <div className="box">
                <h3>Quick Links</h3>
                <a href="/home"> <i className="fa-solid fa-arrow-right fa-beat"></i>Home</a>
                <a href="/market"><i className="fa-solid fa-arrow-right fa-beat"></i>Market</a>
                
                <a href="/trade"><i className="fa-solid fa-arrow-right fa-beat"></i>Trade</a>
                <a href="/derivatives"><i className="fa-solid fa-arrow-right fa-beat"></i>Derivatives</a>
                <a href="/defi"><i className="fa-solid fa-arrow-right fa-beat"></i>DeFi</a>
                <a href="/portfolio"><i className="fa-solid fa-arrow-right fa-beat"></i>portfolio</a>
             </div>
            
             <div className="box">
                <h3>Services</h3>
                <a href="#"> <i className="fa-solid fa-check fa-beat"></i>web design </a>
                <a href="#"> <i className="fa-solid fa-check fa-beat"></i> digital marketing </a>
                <a href="#"> <i className="fa-solid fa-check fa-beat"></i>email marketing </a>
                <a href="#"><i className="fa-solid fa-check fa-beat"></i>content marketing </a>
                <a href="#"> <i className="fa-solid fa-check fa-beat"></i>seo marketing </a>
            </div>
    
            <div className="box">
                <h3>Follow us</h3>
                <a href="#"><i className="fa-brands fa-facebook fa-bounce"></i> facebook </a>
                <a href="#"> <i className="fa-brands fa-twitter fa-bounce"></i>twitter </a>
                <a href="#"><i className="fa-brands fa-instagram fa-bounce"></i> instagram </a>
                <a href="#"> <i className="fa-brands fa-linkedin fa-bounce"></i> linkedin </a>
                <a href="#"> <i className="fa-brands fa-tiktok fa-bounce"></i>Tiktok </a>
            </div>

        </div>
        <br/>
        <div className="credit">created by Samuel Chost | all rights reserved &#169; 2023</div>
    </footer>
}
export default Footer;