import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"
const Home = () => {
    return (
        <>
            <div className="homeContainer">

                <img src="images/d3bg.png" alt="" />
                <form className="form" action="">
                    <div>
                        <label htmlFor="email">Your email Address</label>
                        <input type="email" name="" id="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Your Password</label>
                        <input type="password" name="" id="password" />
                    </div>
                    <div>
                        <label htmlFor="comfirm">Comfirm Password</label>
                        <input type="password" name="" id="comfirm" />
                    </div>
                    <div>
                        <label htmlFor="name">Your Full name</label>
                        <input type="text" name="" id="name" />
                    </div>
                    <div>
                        <label htmlFor="phone">Your Phone Number</label>
                        <input type="tel" name="" id="phone" />
                    </div>
                    <div>
                        <div>
                        <input type="checkbox" id="terms" name="terms" value="terms" />
                        <label for="terms"> I read and agree the terms and conditions</label><br></br>
                        </div>
                    </div>
                        <Link to="/chart">Create Account</Link>
                </form>
            </div>
        </>
    );
};

export default Home;