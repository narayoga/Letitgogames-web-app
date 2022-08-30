import { Fragment, useState, useEffect } from "react";
import {Form, Button, Modal} from 'react-bootstrap'
import { Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { authenticatedAction } from "../redux/actions/authenticated";
import Upload from "./uploadImage";
import axios from 'axios'

function MyVerticallyCenteredModal(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [birth, setBirth] = useState("");
  const [country, setCountry] = useState("Indonesia");
  const [bio, setBio] = useState("");
  const { token, data } = useSelector((state) => state.authenticatedReducer);
  const id = data.id;

  const updateSubmit = (e) => {
    e.preventDefault();
    const bodyUpdate = { username, email, birth, country, bio, id, src: localStorage.getItem('src') };
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const url = `https://letigogames-v1.herokuapp.com/profile/${id}`;
    axios
      .put(url, bodyUpdate, config)
      .then((res) => {
        localStorage.removeItem("data");
        localStorage.setItem("data", JSON.stringify(bodyUpdate));
        navigate(-1);
      })
      .catch((err) => {
        console.log("gagal", err.message);
      });
  }

  useEffect(() => {
    dispatch(authenticatedAction());
    setUsername(data.username);
    setEmail(data.email);
    setBirth(data.birth);
    setCountry(data.country);
    setBio(data.bio);
  }, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{width:"100%"}}
    >
      <Modal.Body style={{backgroundColor:"#3a3c3f"}} >
      <Form className="container profile-form text-white" onSubmit={updateSubmit}>
          <div className='profile-picture'>
            <Upload />
          </div>
          <h1 className="py-4">Edit Profile</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              data-testid={'profile-username'}
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
             data-testid={'profile-email'}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Birth Date</Form.Label>
            <Form.Control
              type="date"
              value={birth}
              onChange={(e) => {
                setBirth(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Country</Form.Label>
            <Form.Select aria-label="Default select example" 
              onChange={(e) => {setCountry(e.target.value);
            }}>
              <option>{country}</option>
              <option value="Indonesia">Indonesia</option>
              <option value="singapore">singapore</option>
              <option value="philipina">philipina</option>
              <option value="malaysia">malaysia</option>
              <option value="other">other</option>
          </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Short Bio</Form.Label>
            <Form.Control
              as="textarea" 
              rows={3}
              type="text"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </Form.Group>
          <div className="d-flex justify-content-start">
            <Button  variant="primary" type="submit">
              Edit data
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

function Edit(props) {
  const [modalShow, setModalShow] = useState(false);
  const {data} = props
  return (
    <>
      <p className='no-space' onClick={() => setModalShow(true)}> Edit </p>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        animation={false}
        id = {data}
      />
    </>
  );
}

export default Edit;