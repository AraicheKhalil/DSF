



import SectionTitle from "@/components/SectionTitle";
import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";

function OurOutcomes() {
  const row1 = [
    "./img1.jpeg",
    "./img2.jpeg",
    "./img3.jpeg",
    "./img4.jpeg",
    "./img5.jpeg",
  ];

  // const row2 = [
  //   "./img1.jpeg",
  //   "./img2.jpeg",
  //   "./img3.jpeg",
  //   "./img4.jpeg",
  // ];

  return (
    <div className="">
      <div className="container">
        <SectionTitle
          badge={"Our Outcomes"}
          titleSection={
            "AI-Driven Precision, Seamless Insights"
          }
          description={
            "Empowering smarter decisions through cutting-edge document intelligence."
          }
        />
        {/* <Link to={"dashboard"} className="cursor-pointer">
          <button className="mb-8 -mt-14 px-5 py-3 bg-[#28282B] text-[#FFFECA] ">
            Book a Demo
          </button>
        </Link> */}

        <div>
          <img src="./award.png" alt="" className=" -mt-12 mx-auto"/>
        </div>
      </div>
    </div>
  );
}

export default OurOutcomes;

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  color: #000000;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Text = styled.div`
  font-size: 35px;
  font-weight: 500;
  margin-bottom: 10px;
  color: #02203c;
`;

const Note = styled.div`
  font-size: 18px;
  font-weight: 200;
  margin-bottom: 40px;
  color: #7c8e9a;
`;

const Marquee = styled.div`
  display: flex;
  width: 1200px;
  overflow: hidden;
  user-select: none;

  mask-image: linear-gradient(
    to right,
    hsl(0 0% 0% / 0),
    hsl(0 0% 0% / 1) 10%,
    hsl(0 0% 0% / 1) 90%,
    hsl(0 0% 0% / 0)
  );
`;

const scrollX = keyframes`
  from {
    left: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const common = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  white-space: nowrap;
  width: 100%;
`;

const MarqueeGroup = styled.div`
  ${common}
`;
const MarqueeGroup2 = styled.div`
  ${common}
  animation-direction: reverse;
  animation-delay: -3s;
`;

const ImageGroup = styled.div`
  display: grid;
  place-items: center;
  width: clamp(10rem, 1rem + 40vmin, 30rem);
  padding: calc(clamp(10rem, 1rem + 30vmin, 30rem) / 10);
`;

const Image = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
  /* border: 1px solid black; */
  border-radius: 0.5rem;
  aspect-ratio: 16/9;
  padding: 5px 20px;
  // box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;



