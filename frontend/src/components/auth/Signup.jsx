import { BorderBeam } from "../ui/border-beam";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import PropTypes from "prop-types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import TypingAnimation from "../ui/typing-animation";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant.js";
import { toast as toast1 } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

export default function Signup() {
  return (
    <div>
      <LetterPullupWord />
      <BorderBeamWord />
    </div>
  );
}

export function LetterPullupWord() {
  return (
    <TypingAnimation
      duration={125}
      className="mt-10 p-5 text-4xl font-bold text-black dark:text-white"
      text="Ready to take the next step in your career? Let’s make your dream job a reality—sign up now!"
    />
  );
}

export function BorderBeamWord() {
  const [input, setInput] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "",
    file: "",
  });

  const loading = useSelector((store) => store.auth.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, phoneNumber, email, password, role, file } = input;

    // Check for empty fields
    if (!fullName) {
      toast.error("Please enter your full name.");
      return;
    }
    if (!phoneNumber) {
      toast.error("Please enter your phone number.");
      return;
    }
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    if (!password) {
      toast.error("Please enter your password.");
      return;
    }
    if (!role) {
      toast.error("Please select a role.");
      return;
    }
    if (!file) {
      toast.error("Please upload a profile picture.");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);

    // If `file` is optional, you can check if it exists before appending
    if (file) {
      formData.append("file", file);
    }

    // Proceed with form submission if all fields are filled
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast1.success(res.data.message);
      }
    } catch (error) {
      toast1.error(error.response.data.message);
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center m-20">
      <form onSubmit={handleSubmit}>
        <div className="relative flex flex-col items-center h-[690px] w-[460px] overflow-hidden rounded-lg border bg-background p-6 md:shadow-2xl">
          <span className="absolute top-4 left-1/2 transform -translate-x-1/2 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-4xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
            Sign Up
          </span>
          <div className="mt-20 w-3/4 space-y-4">
            <InputWithLabel
              label="Full Name"
              id="fullName"
              type="text"
              value={input.fullName}
              onChange={changeEventHandler}
              placeholder="Enter your full name"
            />
            <InputWithLabel
              label="Phone"
              id="phoneNumber"
              type="tel"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
            />
            <InputWithLabel
              label="Email"
              id="email"
              type="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
            />
            <InputWithLabel
              label="Password"
              id="password"
              type="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
            />
            <InputFile onChange={changeFileHandler} />
            <div className="mt-4 flex flex-row">
              <RadioGroupTwo
                selectedRole={input.role}
                onChange={changeEventHandler}
              />
            </div>

            <div className="flex flex-col">
              <span className="">
                Already Have an Account?
                <Link to="/login">
                  <Button className="p-0" variant="link">
                    Login
                  </Button>
                </Link>
              </span>
              {loading ? (
                <Button>
                  <Loader2 className="animate-spin" />
                  Almost there...
                </Button>
              ) : (
                <Button type="submit" className="w-full ">
                  Sign up
                </Button>
              )}
            </div>
          </div>
          <BorderBeam size={250} duration={12} delay={9} />
        </div>
      </form>
    </div>
  );
}

export function InputWithLabel({
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="grid w-full">
      <Label
        htmlFor={id}
        className="text-lg text-slate-700 dark:text-slate-300"
      >
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 p-2 text-slate-800 dark:text-white dark:bg-slate-800 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
    </div>
  );
}

export function RadioGroupTwo({ selectedRole, onChange }) {
  const handleRadioChange = (value) => {
    // Prevent form submission by stopping event propagation
    onChange({ target: { name: "role", value } });
  };

  return (
    <RadioGroup
      value={selectedRole}
      onValueChange={(value) => {
        handleRadioChange(value);
      }}
    >
      <div className="flex space-x-6 mt-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            type="button"
            name="role"
            value="candidate"
            id="r2"
            checked={selectedRole === "candidate"}
            onChange={(e) => handleRadioChange(e.target.value)}
            // Prevent form submission
          />
          <Label htmlFor="r2">Candidate</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            type="button"
            name="role"
            value="recruiter"
            id="r3"
            checked={selectedRole === "recruiter"}
            onChange={(e) => handleRadioChange(e.target.value)}
            // Prevent form submission
          />
          <Label htmlFor="r3">Recruiter</Label>
        </div>
      </div>
    </RadioGroup>
  );
}

export function InputFile({ onChange }) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Profile</Label>
      <Input id="picture" type="file" accept="image/*" onChange={onChange} />
    </div>
  );
}

InputWithLabel.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

RadioGroupTwo.propTypes = {
  selectedRole: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

InputFile.propTypes = {
  onChange: PropTypes.func.isRequired,
};
