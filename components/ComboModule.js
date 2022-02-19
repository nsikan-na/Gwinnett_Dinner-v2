import React, { useState, useContext, useRef } from "react";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import { LocationContext } from "../context/LocationContext";

export default function ComboModule() {
  const { activeItem, setComboModule, setCart } = useContext(LocationContext);
  const [show, setShow] = useState(true);
  const { title, desc, img, price, location, type, sides } = activeItem;
  const [quantity, setQuantity] = useState(1);
  const form = useRef();
  const [error, setError] = useState(false);
  return (
    <Container>
      <Modal
        onExit={() => {
          setComboModule(false);
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
              style={{ backgroundColor: "red", border: "0px" }}
              onClick={() => {
                if (quantity === 1) return;
                setQuantity(--quantity);
              }}
            >
              -
            </Button>
            <h5>{quantity}</h5>
            <Button
              variant="primary"
              style={{ backgroundColor: "blue", border: "0px" }}
              onClick={() => {
                setQuantity(++quantity);
              }}
            >
              +
            </Button>
          </Container>
          {sides != 0 ? (
            <Form
              ref={form}
              onChange={(e) => {
                const checkboxes = [];
                form.current.side.forEach((item) => {
                  if (item.checked) checkboxes.push(item.checked);
                });
                if (checkboxes.length > sides) e.target.checked = false;
              }}
              onSubmit={(e) => {
                e.preventDefault();
                const checkboxes = [];
                form.current.side.forEach((item) => {
                  if (item.checked) checkboxes.push(item.checked);
                });
                if (checkboxes.length != sides) return setError(true);
                let sideItems = [];
                e.target.side.forEach((item) => {
                  if (item.checked) {
                    sideItems.push(item.id);
                  }
                });
                setCart((prevCart) => [
                  ...prevCart,
                  {
                    title,
                    desc,
                    img,
                    price,
                    location,
                    type,
                    sideItems,
                    quantity,
                  },
                ]);
                setComboModule(false);
              }}
            >
              <br />
              <h5>
                Pick {`${sides} ${sides > 1 ? "side items" : "side item"}`}
              </h5>
              <Form.Check inline name="side" type="checkbox" id="Fries" />
              <Form.Label htmlFor="Fries">Fries</Form.Label>
              <br />
              <Form.Check inline name="side" type="checkbox" id="Broccoli" />
              <Form.Label htmlFor="Broccoli">Broccoli</Form.Label>
              <br />
              <Form.Check
                inline
                name="side"
                type="checkbox"
                id="Garlic Pasta & Bread"
              />
              <Form.Label htmlFor="Garlic Pasta & Bread">
                Garlic Pasta & Bread
              </Form.Label>
              <br />
              <h6 className={`text-red-500 ${error ? "visible" : "invisible"}`}>
                You must enter {sides} sides!
              </h6>
              <Button
                className=""
                type="submit"
                style={{ backgroundColor: "green" }}
              >
                Add to Cart
              </Button>
            </Form>
          ) : (
            <Button
              className=" mt-4"
              style={{ backgroundColor: "purple" }}
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
                setComboModule(false);
              }}
            >
              Add to Cart
            </Button>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}
