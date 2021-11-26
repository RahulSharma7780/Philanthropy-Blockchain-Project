import React, { useEffect, useState } from 'react'
import DonateCard from '../components/DonateCard';
import Map from '../components/Map'
import './Home.css'
import './Charityzone.css'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
//import react from 'react';

const CharityZone = (props) => {

    props.useScrollToTop();
    const [Istate, setIstate] = useState('Delhi');
    const [allCardsInfo, setAllCardsInfo] = useState([]);
    //eslint-disable-next-line

    useEffect(() => {
        console.log("charityzone useEffect triggred");
        getAllCharities();
    }, [])


   const  getAllCharities = async() => {
        try {
            const url = "http://localhost:5000/api/charity/fetchallcharities"
            const response = await fetch(url, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                    'accept':'application/json',
                }
            });
            const data = await response.json();
            setAllCardsInfo(data)
            //console.log(allCardsInfo)
        } catch(error) {
            console.log(error)
        }
    }

        

    const [coords, setcoords] = useState({
        xcoords:170,
        ycoords:153
    })

    
    const handleOnClick = (e) => {
        if(e.target.getAttribute("title")) {
            setIstate(e.target.getAttribute("title"))
            let x = e.pageX - 17.3 -50  ;
            let y = e.pageY - 74 - 53.8 - 15;
            setcoords({xcoords:x,ycoords:y})

            
        }
    }

  

    return (
        <>   
            <Navbar/>

            <div className="mapContainer">
                <Map coords={coords} handleOnClick={handleOnClick}  /> 
                <div className="mapStateContainer text-center">
                <h3 className="mapState">{Istate}</h3>
                    <div className="mt-4 text-center " id="filterCharityWrapper">
                    {
                        allCardsInfo.map((state,idx,arr) => (
                
                             <p key={idx} className="text-start">{state.state === Istate ?  " >    " + state.charityName:""}</p>
                        )) 
                    }{' '}
                      
                    </div>
                </div>  
            </div>
                <div className="filler_map"></div>
            {/* SVG background */}
            <div className="svg_background_2">
                <div className="tilt_svg_2">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                    </svg>
                </div>
            </div>

            {/* section 2 */}
            <section className="card-conatiner-warpper">
                <div className="cards-container-title top-0">
                    Philanthropy zone
                </div>
                <Link to={{pathname:"/charityform", state:{button_name:"Add New", info:{title:"", description:"", previousWork:"", goal:0, fundsRaised:0, cause:"", city:"", state:""}}}} className="cards-container-title top-0 add-new-btn">
                    Add New Charity
                </Link>
                <div className=" row row-cols-1 row-cols-md-3 g-4 mx-0 justify-content-evenly card-container gx-5">
                    {
                        allCardsInfo.map(card => (
                            <DonateCard
                                key={card._id + "5"}
                                id={card._id}
                                title={card.charityName}
                                description={card.description}
                                previousWork={card.previousWork}
                                goal={card.goal}
                                fundsRaised={card.fundsRaised}
                                cause={card.cause}
                                city={card.city}
                                state={card.state}
                            />
                        ))
                    }{' '}
                </div>
            </section>

            {/* <EditCharityForm button_name="Update"/> */}

            <Footer/>
        </>
    )
}

export default CharityZone
