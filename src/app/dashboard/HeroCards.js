import React from "react";
import { Card, Button } from "react-bootstrap";
import Draggable from "react-draggable";
import { FcGoogle } from "react-icons/fc";
import { FaBeer } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { AiFillAmazonCircle } from "react-icons/ai";

export default function HeroCards() {
  return (
    <div className="row ml-1">
      <DraggableCard text="Google" bgColor="#FF9300" image={<FcGoogle />} />
      <DraggableCard
        text="Facebook"
        bgColor="#00A2FF"
        image={<FaFacebookSquare />}
      />
      <DraggableCard
        text="Amazon"
        bgColor="#00A211"
        image={<AiFillAmazonCircle />}
      />
    </div>
  );
}

const DraggableCard = ({ text, bgColor, image }) => {
  return (
    <Draggable>
      <Card
        style={{
          width: "30%",
          backgroundColor: bgColor,
          color: bgColor,
          marginRight: "10px",
        }}
      >
        <Button variant="text" size={400}>
          {text}
          {image}
        </Button>
        <Card.Body>
          <Button variant="text" size={400}>
            {text} Hero Card draggable
          </Button>
        </Card.Body>
      </Card>
    </Draggable>
  );
};

const DraggableButtonInCard = ({ text, bgColor }) => {
  return (
    <Card style={{ width: "40%", backgroundColor: bgColor, color: "#ffffff" }}>
      <Draggable>
        <Button variant="text">BUY</Button>
      </Draggable>
    </Card>
  );
};
