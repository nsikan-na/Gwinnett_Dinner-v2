import React, { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { Context } from "../../context";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function SideModule() {
  const { activeItem, setSideModule, setCart } = useContext(Context);
  const [show, setShow] = useState(true);
  const { title, desc, img, price, location, type } = activeItem;
  const [quantity, setQuantity] = useState(1);
  return (
    <Container>
      <Modal
        onExit={() => {
          setSideModule(false);
        }}
        show={show}
        onHide={() => setShow(false)}
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        centered
      >
        <Modal.Header className="" closeButton>
          <Modal.Title>
            <h3 className="">{title}</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Image src={`images/${img}`} className="mx-auto w-8/12" />
          <br />
          <h4>${price}</h4>
          <h5>Select quantity</h5>
          <Container className="flex justify-center items-center space-x-5">
            <Button
              variant="primary"
              style={{ border: "0px" }}
              className='bg-transparent'
              onClick={() => {
                if (quantity === 1) return;
                setQuantity(--quantity);
              }}
            >
              <RemoveIcon className="text-black"/>
            </Button>
            <h5>{quantity}</h5>
            <Button
              variant="primary"
              className='bg-transparent'
              style={{ border: "0px" }}
              onClick={() => {
                setQuantity(++quantity);
              }}
            >
              <AddIcon className="text-black"/>
            </Button>
          </Container>
          <br />
          <Button
            className=" "
            onClick={() => {
              setCart((prevCart) => [
                ...prevCart,
                {
                  title,
                  desc,
                  img,
                  price,
                  location,
                  type,
                  quantity,
                },
              ]);
              setSideModule(false);
            }}
          >
            Add to Cart
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
