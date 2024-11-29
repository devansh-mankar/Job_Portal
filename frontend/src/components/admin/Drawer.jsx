import React, { useEffect, useState } from "react";
import {
  Drawer,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";

export function DrawerDefault() {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false); // Flag to track if drawer is already opened
  const [rating, setRating] = useState(0); // State to hold the rating

  const openDrawerOnScroll = () => {
    if (window.scrollY > 50 && !hasOpened) {
      setOpen(true); // Opens the drawer when scrolled down
      setHasOpened(true); // Set flag to true so it only opens once
    }
  };

  const closeDrawer = () => setOpen(false);

  const handleRatingChange = (value) => {
    setRating(value); // Update the rating when user clicks a star
  };

  const resetRating = () => {
    setRating(0); // Reset the rating when cancel is clicked
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", openDrawerOnScroll);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("scroll", openDrawerOnScroll);
  }, [hasOpened]);

  return (
    <React.Fragment>
      <Drawer
        open={open}
        onClose={closeDrawer}
        overlayProps={{
          className: "bg-white/30 backdrop-blur-sm",
        }}
        className="p-4"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            {open ? "Submit a Rating for the Job Portal" : "Material Tailwind"}
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <Typography color="gray" className="mb-8 pr-4 font-normal">
          {open
            ? "Please rate your experience with our job portal. Your feedback is valuable!"
            : "Material Tailwind features multiple React and HTML components, all written with Tailwind CSS classes and Material Design guidelines."}
        </Typography>

        {/* Rating Section */}
        {open && (
          <div className="flex gap-2 mb-6">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleRatingChange(value)}
                  className={`p-2 ${
                    value <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2">
          <Button size="sm" variant="outlined">
            {open ? "Submit Rating" : "Documentation"}
          </Button>
          <Button size="sm" onClick={resetRating}>
            {open ? "Cancel" : "Get Started"}
          </Button>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
