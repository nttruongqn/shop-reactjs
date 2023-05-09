import React from "react";
import { Col, Container, Row } from "reactstrap";
import UserGetData from "../custom-hooks/userGetData";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
const AllUsers = () => {
  const { data: usersData } = UserGetData("users");

  const deleteUser = async(id) => {
    await deleteDoc(doc(db, "users", id))
    toast.success("Deleted!")
  }

  console.log(usersData);
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>UserName</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((item) => (
                  <tr key={item.uid}>
                    <td>
                      <img src={item.photoURL} alt="" />
                    </td>
                    <td>{item.displayName}</td>
                    <td>{item.email}</td>
                    <td>
                      <button className="btn btn-danger" onClick={()=> deleteUser(item.id)}>Delete</button>
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

export default AllUsers;
