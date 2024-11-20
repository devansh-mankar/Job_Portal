import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

const accordionData = [
  {
    id: 1,
    title: "What is Material Tailwind?",
    content:
      "We're not always in the position that we want to be at. We're constantly growing. We're constantly making mistakes. We're constantly trying to express ourselves and actualize our dreams.",
  },
  {
    id: 2,
    title: "How to use Material Tailwind?",
    content:
      "We're not always in the position that we want to be at. We're constantly growing. We're constantly making mistakes. We're constantly trying to express ourselves and actualize our dreams.",
  },
  {
    id: 3,
    title: "What can I do with Material Tailwind?",
    content:
      "We're not always in the position that we want to be at. We're constantly growing. We're constantly making mistakes. We're constantly trying to express ourselves and actualize our dreams.",
  },
  {
    id: 4,
    title: "Is Material Tailwind customizable?",
    content:
      "We're not always in the position that we want to be at. We're constantly growing. We're constantly making mistakes. We're constantly trying to express ourselves and actualize our dreams.",
  },
  {
    id: 5,
    title: "Why use Material Tailwind?",
    content:
      "We're not always in the position that we want to be at. We're constantly growing. We're constantly making mistakes. We're constantly trying to express ourselves and actualize our dreams.",
  },
];

// Icon component with rotation based on the open state
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180 m-2 p-2" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export function AccordionCustomAnimation() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="flex justify-center items-center">
      <div className="m-10 p-10 flex flex-col space-y-5 max-w-lg w-full">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-cyan-500">FAQ&apos;s</h3>
        </div>
        {accordionData.map((item) => (
          <Accordion
            key={item.id}
            open={open === item.id}
            animate={CUSTOM_ANIMATION}
            icon={<Icon id={item.id} open={open} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(item.id)}
              className={open === item.id ? "text-cyan-500" : ""}
            >
              {item.title}
            </AccordionHeader>
            <AccordionBody>{item.content}</AccordionBody>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

// Adding PropTypes validation for the Icon component
Icon.propTypes = {
  id: PropTypes.number.isRequired,
  open: PropTypes.number.isRequired,
};
