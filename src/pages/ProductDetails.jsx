import React, { useRef, useState } from "react";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Row } from "reactstrap";
import { useParams } from "react-router-dom";
import products from "../assets/data/products";
import "../styles/product-detail.css";
import { motion } from "framer-motion";
import ProductList from "../components/UI/ProductList";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const {
    imgUrl,
    productName,
    price,
    avgRating,
    reviews,
    description,
    shortDesc,
    category
  } = product;
  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState(null)
  const relatedProduct = products.filter((item) => item.category === category)
  const reviewUser = useRef(null)
  const reviewMsg = useRef(null)
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()

    const reviewUserName = reviewUser.current.value
    const reviewUserMsg = reviewMsg.current.value
    const reviewObject = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating
    }
    console.log(reviewObject)
    toast.success("Review submitted")

  }

  const addToCart = () => {
    dispatch(cartActions.addItem({
      id,
      image: imgUrl,
      productName,
      price
    }
    ))
    toast.success('Product added success')
  }


  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt="" />
            </Col>
            <Col lg="6">
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-half-s-line"></i>
                    </span>
                  </div>
                  <p>
                    (<span>{avgRating}</span> ratings)
                  </p>
                </div>

                <span>{price}</span>
                <p>{shortDesc}</p>

                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn" onClick={addToCart
                }>
                  Add to cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === "desc" ? "activate__tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "activate__tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Reviews ({reviews.length})
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab__content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product-review mt-5">
                  <div className="review__wrapper">
                    <ul>
                      {reviews.map((item, index) => (
                        <li key={index} className="mb-4">
                          <h6>Truong Nguyen</h6>
                          <span>{item.rating} (rating)</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul>

                    <div className="review__form">
                      <h4>Leave your experience</h4>
                      <form action="" onSubmit={submitHandler}>
                        <div className="form__group">
                          <input type="text" placeholder="Enter Name" ref={reviewUser} />
                        </div>

                        <div className="form__group d-flex align-items-center gap-5 rating__group">
                          <motion.span whileTap={{scale: 1.2}} onClick={() => setRating(1)}>1 <i className="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{scale: 1.2}} onClick={() => setRating(2)}>2 <i className="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{scale: 1.2}} onClick={() => setRating(3)}>3 <i className="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{scale: 1.2}} onClick={() => setRating(4)}>4 <i className="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{scale: 1.2}} onClick={() => setRating(5)}>5 <i className="ri-star-s-fill"></i></motion.span>
                        </div>

                        <div className="form__group">
                          <textarea type="text" placeholder="Review Message..." ref={reviewMsg} />
                        </div>

                        <motion.button whileTap={{scale:1.2}} type="submit" className="buy__btn">Submit</motion.button>
                      </form>

                    </div>
                  </div>
                </div>
              )}
            </Col>

            <Col lg='12' className="mt-5">
              <h2 className="related__title">
                You might also like
              </h2>
              <Row>
                <ProductList data={relatedProduct}>
                </ProductList>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
