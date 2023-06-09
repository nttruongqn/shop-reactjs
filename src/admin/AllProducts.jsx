import React from "react";
import { Col, Container, Row } from "reactstrap";
import UserGetData from "../custom-hooks/userGetData";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
const AllProducts = () => {
  const { data: productsData } = UserGetData("products");

  const deleteProduct = async(id) => {
    await deleteDoc(doc(db, "products", id))
    toast.success("Deleted!")
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {productsData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.imgUrl} alt="" />
                    </td>
                    <td>{item.productName}</td>
                    <td>{item.category}</td>
                    <td>{item.price} $</td>
                    <td>
                      <button className="btn btn-danger" onClick={()=> deleteProduct(item.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllProducts;
