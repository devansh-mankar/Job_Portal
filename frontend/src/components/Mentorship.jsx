import HorizontalCard from "./horizontalCard";

export default function Mentorship() {
  return (
    <div>
      <div className="mt-20">
        <h1 className="text-2xl font-bold mt-10 mb-2">
          Personalised <span className="text-cyan-500">Mentor Support</span>
        </h1>
        <span className="text-center">
          Select a mentor from a pool of 2000+ industry experts & get 1-on-1
          mentorship!
        </span>
      </div>
      <div className="relative min-w-full h-[350px] flex items-center justify-center p-10 mb-10">
        <ul className="font-semibold text-lg list-inside list-disc text-center space-y-4">
          <li>
            Connect with dedicated mentors who understand your career goals and
            provide personalized guidance every step of the way
          </li>
          <li>
            Book one-on-one meetings with industry experts to gain insights,
            refine your skills, and fast-track your job search
          </li>
          <li>
            Get matched with experienced mentors who offer tailored advice and
            actionable feedback, helping you stand out in today&apos;s
            competitive job market
          </li>
        </ul>
      </div>
      <div className="flex mx-5 flex-row gap-10">
        <HorizontalCard />
        <HorizontalCard />
      </div>
    </div>
  );
}
