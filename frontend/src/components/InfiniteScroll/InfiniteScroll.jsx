import { useEffect, useRef } from "react";
import facebook from "./facebook.svg";
import samsung from "./samsung.svg";
import apple from "./apple.svg";
import disney from "./disney.svg";
import sass from "./sass.svg";
import spark from "./spark.svg";
import airbnb from "./airbnb.svg";
import quora from "./quora.svg";

export default function InfiniteLogoScroll() {
  const logosRef = useRef(null);

  useEffect(() => {
    const cloneLogos = () => {
      if (logosRef.current) {
        const ul = logosRef.current;
        ul.insertAdjacentHTML("afterend", ul.outerHTML);
        if (ul.nextSibling) {
          ul.nextSibling.setAttribute("aria-hidden", "true");
        }
      }
    };
    cloneLogos();
  }, []);

  return (
    <div className="mt-10 w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,_black_128px,_black_calc(100%-128px))]">
      <ul
        ref={logosRef}
        className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
      >
        <li>
          <img src={facebook} alt="Facebook" className="dark-filter" />
        </li>
        <li>
          <img src={disney} alt="Disney" className="dark-filter" />
        </li>
        <li>
          <img src={airbnb} alt="Airbnb" className="dark-filter" />
        </li>
        <li>
          <img src={apple} alt="Apple" className="dark-filter" />
        </li>
        <li>
          <img src={spark} alt="Spark" className="dark-filter" />
        </li>
        <li>
          <img src={samsung} alt="Samsung" className="dark-filter" />
        </li>
        <li>
          <img src={quora} alt="Quora" className="dark-filter" />
        </li>
        <li>
          <img src={sass} alt="Sass" className="dark-filter" />
        </li>
      </ul>
    </div>
  );
}
