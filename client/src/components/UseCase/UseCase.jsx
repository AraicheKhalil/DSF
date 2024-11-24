import React from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import { useCaseData } from "../../Assets/Data/cardsData";
import Card from "./Card";

const UseCase = () => {
  return (
    <div
      id="usecases"
      data-aos="fade-left"
      className="bg-[--black] w-full pt-4 pb-8 px-16"
    >
      <SectionHeader headertext="Use Cases" sectionId="usecase" />
      <div className="w-full mx-auto flex justify-start items-stretch gap-4 flex-wrap mt-10 pb-4">
        {useCaseData.map((item, index) => {
          return (
            <Card
              key={index}
              header={item.header}
              description={item.description}
              icon={item.icon}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UseCase;
