import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import { db, storage } from "../firebase.config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("chair");
  const [price, setPrice] = useState("");
  const [productImg, setProductImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const docRef = await collection(db, "products");
      const storageRef = ref(
        storage,
        `productImages/${Date.now() + productImg.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, productImg);


      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          toast.error(error.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          await addDoc(docRef, {
            productName: title,
            shortDesc,
            description,
            category,
            price,
            imgUrl: downloadURL,
          });

          setLoading(false);
          toast.success("Product successfully added");
          navigate("/dashboard/all-products");
        }
      );
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4>Add Product</h4>
            <Form onSubmit={addProduct}>
              <FormGroup className="form__group">
                <span>Product title</span>
                <input
                  type="text"
                  placeholder="Double sofa"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className="form__group">
                <span>Short Description</span>
                <input
                  type="text"
                  placeholder=""
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className="form__group">
                <span>Description</span>
                <input
                  type="text"
                  placeholder="Description.."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </FormGroup>
              <div className="d-flex align-items-center justify-content-between">
                <FormGroup className="form__group">
                  <span>Price</span>
                  <input
                    type="number"
                    placeholder="199$"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <span>Category</span>
                  <select
                    className="p-2"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="chair">Chair</option>
                    <option value="sofa">Sofa</option>
                    <option value="mobile">Mobile</option>
                    <option value="watch">Watch</option>
                    <option value="wireless">Wireless</option>
                  </select>
                </FormGroup>
              </div>
              <FormGroup className="form__group">
                <span>Product Image</span>
                <input
                  type="file"
                  onChange={(e) => setProductImg(e.target.files[0])}
                  required
                />
              </FormGroup>

              <button type="submit" className="buy__btn">
                Add Product
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
