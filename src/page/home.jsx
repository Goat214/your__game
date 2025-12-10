import { Link } from "react-router-dom";
import "../css/home.css";

function Home() {
  return (
   <div className="home-page">
     <div className="home-container">
      <h1 className="home-title">Savollar Tanlang</h1>
      <div className="button-container">
        <Link to="/easy"><button className="home-btn">1 — Oson</button></Link>
        <Link to="/medium"><button className="home-btn">2 — O‘rtacha</button></Link>
        <Link to="/hard"><button className="home-btn">3 — Qiyin</button></Link>
        <Link to="/expert"><button className="home-btn">4 — Eng qiyin</button></Link>
      </div>
    </div>
   </div>
  );
}

export default Home;
