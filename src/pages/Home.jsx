import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import heroImg from '../assets/images/hero-img.png';
import '../styles/home.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import ProductList from '../components/UI/ProductList';
import counterImg from '../assets/images/counter-timer-img.png'
import Clock from '../components/UI/Clock';
import Service from '../Service/Service'
import UserGetData from '../custom-hooks/userGetData';


const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([])
  const [wirelessProducts, setWirelessProducts] = useState([])
  const [popularProducts, setPopularProducts] = useState([])

  const year = new Date().getFullYear();
  const {data: products} = UserGetData('products')

  useEffect(() => {
    const filteredTrendingProducts = products.filter((item) => item.category === 'chair');
    const filteredBestSalesProducts = products.filter((item) => item.category === 'sofa');
    const filteredMobileProducts = products.filter((item) => item.category === 'mobile');
    const filteredWirelessProducts = products.filter((item) => item.category === 'wireless');
    const filteredPopularProducts = products.filter((item) => item.category === 'watch');


    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setMobileProducts(filteredMobileProducts)
    setWirelessProducts(filteredWirelessProducts)
    setPopularProducts(filteredPopularProducts)

  }, [products])

  return <Helmet title={"Home"}>
    
    <section className="hero__section">
      <Container>
        <Row>
          <Col lg='6' md='6'>
            <div className="hero__content">
              <p className="hero__subtitle">
                Trending product in {year}
              </p>
              <h2>Demo project Ecommerce</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, nemo aperiam officia dignissimos totam autem! Reiciendis, asperiores magnam, quas velit laborum repellendus impedit totam dicta quod, placeat ut perspiciatis excepturi!
              </p>
              <motion.button whileTap={{scale : 1.2}} className="buy__btn"><Link to='shop'>SHOP NOW</Link></motion.button>
            </div>
          </Col>
          <Col lg='6' md='6'>
            <div className="hero__img">
              <img src={heroImg} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    
    <Service></Service>
    
    <section className="trending__products">
      <Container>
        <Row>
          <Col lg='12' className="text-center">
            <h2 className="section__title">Trending Products</h2>
          </Col>
          <ProductList data = {trendingProducts} />
        </Row>
      </Container>
    </section>

    <section className="best__sales">
      <Container>
        <Row>
          <Col lg='12' className="text-center">
            <h2 className="section__title">Best Sales</h2>
          </Col>
          <ProductList data = {bestSalesProducts} />
        </Row>
      </Container>
    </section>

    <section className="timer__count">
      <Container>
        <Row>
          <Col lg='6' md='12' className='count__down-col'>
            <div className="clock__top-content">
              <h4 className='text-white fs-6 mb-2'>Limited Offers</h4>
              <h3 className='text-white fs-5 mb-3'>Quality Armchair</h3>
            </div>
            <Clock />
            <motion.button whileTap={{scale: 1.2}} className="buy__btn store__btn"><Link to='/shop'>Visit Store</Link></motion.button>
          </Col>
          <Col lg='6' md='12' className='text-end counter__img'>
            <img src={counterImg} alt="" />
            </Col>
        </Row>
      </Container>
    </section>

    <section className="new__arrivals">
    <Container>
        <Row>
          <Col lg='12' className="text-center">
            <h2 className="section__title">New Arrivals</h2>
          </Col>
          <ProductList data = {mobileProducts} />
          <ProductList data = {wirelessProducts} />
        </Row>
      </Container>
    </section>

    <section className="populary__category">
    <Container>
        <Row>
          <Col lg='12' className="text-center">
            <h2 className="section__title">Populary In Category</h2>
          </Col>
          <ProductList data = {popularProducts} />
        </Row>
      </Container>
    </section>


  </Helmet>
}

export default Home