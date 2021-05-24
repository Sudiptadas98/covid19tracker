import virussvg from "./assests/virussvg2.svg";
const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="footleft">
                    <img src={virussvg}/>
                    <h1>Covid-19-Tracker</h1>
                </div>
                <div className="footright">
                    <p>Created By-</p>
                    <h2>Sudipta Das</h2>
                    <div>
                        <a target="_blank" href={`https://www.linkedin.com/in/thesudiptadas/`}><i className="fab fa-linkedin"></i></a>
                        <a target="_blank" href={`https://github.com/Sudiptadas98`}><i className="fab fa-github"></i></a>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Footer;