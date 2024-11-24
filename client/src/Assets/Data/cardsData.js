import invoice from "../images/Invoice.png";
import reciept from "../images/Receipt long.png";
import bank from "../images/bankstatement.png";
import iddoc from "../images/Identification.png";
import passport from "../images/passport.png";
import custom from "../images/custom.png";

import { LuPackage } from "react-icons/lu";
import { FaRegFolder } from "react-icons/fa";

export const useCaseData = [
  {
    header: "Invoices OCR",
    description:
      "Automated invoice processing streamlines accounts payable and receivable, ensuring accuracy and efficiency.",
    icon: invoice,
  },
  {
    header: "Receipts OCR",
    description:
      "Automated invoice processing streamlines accounts payable and receivable, ensuring accuracy and efficiency.",
    icon: reciept,
  },
  {
    header: "Bank Statements OCR",
    description:
      "Automated invoice processing streamlines accounts payable and receivable, ensuring accuracy and efficiency.",
    icon: bank,
  },
  {
    header: "IDs OCR",
    description:
      "Automated invoice processing streamlines accounts payable and receivable, ensuring accuracy and efficiency.",
    icon: iddoc,
  },
  {
    header: "Passports OCR",
    description:
      "Automated invoice processing streamlines accounts payable and receivable, ensuring accuracy and efficiency.",
    icon: passport,
  },
  {
    header: "Custom OCR",
    description:
      "Automated invoice processing streamlines accounts payable and receivable, ensuring accuracy and efficiency.",
    icon: custom,
  },
];

export const whyUsCardsData = [
  // {
  //   header: "All in One",
  //   description: "Toolkit",
  //   icon: <LuPackage />,
  // },
  // {
  //   header: "Integrated",
  //   description: "File Sharing",
  //   icon: <FaRegFolder />,
  // },
  // {
  //   header: "Total",
  //   description: "Freedom",
  //   icon: <LuPackage />,
  // },
];

export const packagesData = [
  {
    name: "basic",
    description: "Perfect for Business",
    price: "$ 10",
    duration: "Per month",
    packageitems: [
      "100 total OCR Extractions",
      "2 Document Types",
      // "Max 10 Pages/Doc ",
      // "10 MB max per file",
      "PDF , JPEG , PNG , JPG ",
    ],
  },
  {
    name: "standard",
    description: "Perfect for Business",
    price: "$ 20",
    duration: "Per month",
    packageitems: [
      "250 total OCR Extractions",
      "4 Document Types",
      // "Max 50 Pages / Doc",
      // "30 MB max per file",
      "All in Basic + Scans ",
    ],
  },
  {
    name: "premium",
    description: "Perfect for Business",
    price: "$ 45",
    duration: "Per month",
    packageitems: [
      "500 total OCR Extractions",
      "8 Document Types ",
      // "Unlimited Pages / Doc",
      // "100 MB max per file",
      "Dedicated support ",
    ],
  },
];

export const enterpriseCardData = {
  name: "SMART DOC ENTERPRISE",
  packageitems: [
    "Unlimited Ocr Extractions and Documents Types",
    "Dedicated Account Manager",
    "Custom Enterprise Large Language Model",
  ],
};

export const testimonialData = [
  {
    name: "Mohammad Yaseen",
    email: "yaseenafridi10875@gmail.com",
    message:
      "Fast and accurate OCR. Saves me tons of time on data entry. Highly recommend! ",
    designation: "Software Engineer",
    starCount: 5,
    image:
      "https://media.licdn.com/dms/image/D5635AQHBCKWMmkj7bA/profile-framedphoto-shrink_400_400/0/1716625608741?e=1717952400&v=beta&t=LfR193MzKLbkRWhryTZ4fcM2xolqJfCaRa-TXo3oFOM",
  },
  {
    name: "Yassine Benharbit",
    email: "yaseenafridi10875@gmail.com",
    message:
      "Efficient and precise. Perfect for managing all our stable’s paperwork ",
    designation: "CEO Fal Stud",
    starCount: 5,
    image:
      "https://media.licdn.com/dms/image/D5635AQHBCKWMmkj7bA/profile-framedphoto-shrink_400_400/0/1716625608741?e=1717952400&v=beta&t=LfR193MzKLbkRWhryTZ4fcM2xolqJfCaRa-TXo3oFOM",
  },
  {
    name: "Imane Aoid",
    message:
      "A timesaver for my thesis research. Quick and reliable data extraction ",
    designation: "Medical Student",
    starCount: 5,
    image:
      "https://media.licdn.com/dms/image/D5635AQHBCKWMmkj7bA/profile-framedphoto-shrink_400_400/0/1716625608741?e=1717952400&v=beta&t=LfR193MzKLbkRWhryTZ4fcM2xolqJfCaRa-TXo3oFOM",
  },
];

export const mainSubscription = [
  {
    name: "Free",
    description: "",
    price: "$ 0",
    duration: "Per month",
    packageitems: [
      "5 total OCR Extractions",
      "General OCR",
      "JPEG , PNG , JPG ",
    ],
  },
];

export const doctools = [
  {
    text: "Image to PDF",
    url: "/image-to-pdf",
  },
  {
    text: "PDF to Excel",
    url: "/pdf-to-excel",
  },
  {
    text: "HTML to PDF",
    url: "/html-to-pdf",
  },
];

export const userAnalysis = [
  {
    label: "Total Payment",
    value: "$ 10000",
  },
  {
    label: "Total Extractions",
    value: "20",
  },
  {
    label: "Extracted Documents",
    value: "7",
  },
  {
    label: "Remaining Extractions",
    value: "13",
  },
];
