import React from "react";
import Announcement from "../components/Announcement";
import Category from "../components/Category";
import Hero from "../components/Hero";
import NavBar from "../components/NavBar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Footer from "../components/Footer";



const Home = () => {
  return (
    <div >
      <Announcement/>
      <NavBar />
      <Hero/>
      <Category/>
      <section id='products'>
      <Products/>

      </section>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;
