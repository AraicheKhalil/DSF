

import SectionTitle from "@/components/SectionTitle";
import React from "react";
import styled, { keyframes, css } from "styled-components";

const testimonials1 = [
  {
    name: "Mohammad Yaseen",
    handle: "Software Engineer",
    text: "Fast and accurate OCR. Saves me tons of time on data entry. Highly recommend! .",
    avatar: "https://i.pravatar.cc/150?img=15", // Replace with actual avatar URL
  },
  {
    name: "Yassine Benharbit",
    handle: "CEO Fal Stud",
    text: "Efficient and precise. Perfect for managing all our stable’s paperwork ",
    avatar: "https://i.pravatar.cc/150?img=2", // Replace with actual avatar URL
  },
  {
    name: "Imane Aoid",
    handle: "Medical Student",
    text: "A timesaver for my thesis research. Quick and reliable data extraction .",
    avatar: "https://i.pravatar.cc/150?img=4", // Replace with actual avatar URL
  },

];


// const testimonials2 = [
//   {
//     name: "Mohammad Yaseen",
//     handle: "Software Engineer",
//     text: "Fast and accurate OCR. Saves me tons of time on data entry. Highly recommend! .",
//     avatar: "https://i.pravatar.cc/150?img=15", // Replace with actual avatar URL
//   },
//   {
//     name: "James Carter",
//     handle: "@jamescarter",
//     text: "The learning curve was practically non-existent. Our team was up and running in no time, thanks to the platform’s intuitive design.",
//     avatar: "https://i.pravatar.cc/150?img=16", // Replace with actual avatar URL
//   },
//   {
//     name: "Olivia Turner",
//     handle: "@oliviaturner",
//     text: "I appreciate how this platform keeps everything organized. It’s so easy to find what I need and stay on top of my tasks.",
//     avatar: "https://via.placeholder.com/150/11", // Replace with actual avatar URL
//   },
//   // {
//   //   name: "Daniel Harris",
//   //   handle: "@danielharris",
//   //   text: "The customer service is top-notch. Anytime we’ve needed help, the support team has been responsive and extremely helpful.",
//   //   avatar: "https://i.pravatar.cc/150?img=14", // Replace with actual avatar URL
//   // },
//   // {
//   //   name: "Sophia Lewis",
//   //   handle: "@sophialewis",
//   //   text: "The platform’s automation features have saved us countless hours. We can focus on more strategic work instead of repetitive tasks.",
//   //   avatar: "https://i.pravatar.cc/150?img=13", // Replace with actual avatar URL
//   // },
//   // {
//   //   name: "Jack Clark",
//   //   handle: "@jackclark",
//   //   text: "I’ve used many tools over the years, but this one stands out for its reliability and ease of use. Highly recommended!",
//   //   avatar: "https://i.pravatar.cc/150?img=12", // Replace with actual avatar URL
//   // },
//   // {
//   //   name: "Mia King",
//   //   handle: "@miaking",
//   //   text: "The design is beautiful and functional. It’s rare to find a platform that is both aesthetically pleasing and practical.",
//   //   avatar: "https://via.placeholder.com/150/15", // Replace with actual avatar URL
//   // },
//   // {
//   //   name: "Liam Walker",
//   //   handle: "@liamwalker",
//   //   text: "We’ve seen a noticeable increase in productivity since we started using this platform. It’s a must-have for any team.",
//   //   avatar: "https://via.placeholder.com/150/16", // Replace with actual avatar URL
//   // },
// ];


function App() {
  return (
    <>

    <div className="mb-20">
      <SectionTitle badge={"Testimonials"} titleSection={"Trusted by all"} description={"Join thousands of satisfied users who rely on our platform for their personal and professional productivity needs."} />
    </div>
    
    <AppContainer>
      <MarqueeWrapper>
        <Marquee>
          <MarqueeGroup>
            {testimonials1.map((testimonial, index) => (
              <TestimonialCard key={index}>
                <div className="flex gap-3">
                  <TextWrapper>
                    <Name>{testimonial.name}</Name>
                    <Handle>{testimonial.handle}</Handle>
                  </TextWrapper>

                </div>
                <Text className="line-clamp-3">{testimonial.text}</Text>
              </TestimonialCard>
            ))}
          </MarqueeGroup>
        </Marquee>
        {/* <Marquee reverse className="mt-5">
          <MarqueeGroup>
          {testimonials2.map((testimonial, index) => (
              <TestimonialCard key={index}>
                <div className="flex gap-3">
                  <Avatar src={testimonial.avatar} />
                  <TextWrapper>
                    <Name>{testimonial.name}</Name>
                    <Handle>{testimonial.handle}</Handle>
                  </TextWrapper>

                </div>
                <Text className="line-clamp-3">{testimonial.text}</Text>
              </TestimonialCard>
            ))}
          </MarqueeGroup>
          <MarqueeGroup>
          {testimonials2.map((testimonial, index) => (
              <TestimonialCard key={index}>
                <div className="flex gap-3">
                  <Avatar src={testimonial.avatar} />
                  <TextWrapper>
                    <Name>{testimonial.name}</Name>
                    <Handle>{testimonial.handle}</Handle>
                  </TextWrapper>

                </div>
                <Text className="line-clamp-3">{testimonial.text}</Text>
              </TestimonialCard>
            ))}
          </MarqueeGroup>
        </Marquee> */}
      </MarqueeWrapper>
    </AppContainer>
    
    </>

  );
}

export default App;


const AppContainer = styled.div`
  margin-top : -45px;
  width: 100vw;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;

  position : relative;
`;

const MarqueeWrapper = styled.div`
  width: 80%;
  overflow: hidden;
  overflow: hidden;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  // height: fit-content;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // flex-direction: column;
`;

// const scrollX = keyframes`
//   from {
//     transform: translateX(0%);
//   }
//   to {
//     transform: translateX(-100%);
//   }
// `;

const Marquee = styled.div`
  display: flex;
  width: 100%;
  // animation: ${(props) => (props.reverse ? css`${scrollX} 50s linear infinite reverse` : css`${scrollX} 50s linear infinite`)};

  
`;

const MarqueeGroup = styled.div`
  display: flex;
  width: 200%;
  justify-content: space-around;
  flex-wrap: nowrap; /* Ensure items don’t wrap */
  
`;

const TestimonialCard = styled.div`
  // background: ;
  background: white;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  // min-width : 300px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  flex-shrink : 0 ;
  box-shadow: 0px 4px 10px #334155;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const TextWrapper = styled.div`

`;

const Name = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const Handle = styled.p`
  margin: 0;
  font-size: 14px;
`;

const Text = styled.p`
  margin-top: 10px;
  font-size: 14px;
`;










