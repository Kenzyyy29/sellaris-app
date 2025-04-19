"use client";
import {useState} from "react";

const companyTypes = [
 {value: "FNB", label: "Food & Beverage"},
 {value: "Retail", label: "Retail"},
 {value: "Barbershop", label: "Barbershop"},
 {value: "Restoran", label: "Restoran"},
];

const revenueRanges = [
 {value: "0-1000000", label: "0 - 1,000,000"},
 {value: "1000000-10000000", label: "1,000,000 - 10,000,000"},
 {value: "10000000-50000000", label: "10,000,000 - 50,000,000"},
 {value: "50000000+", label: "50,000,000+"},
];

export default function SignUpStep2({
 step1Data,
 onBack,
 onSubmit,
}: {
 step1Data: any;
 onBack: () => void;
 onSubmit: (data: any) => void;
}) {
 const [formData, setFormData] = useState({
  companyAddress: "",
  companyType: "",
  monthlyRevenue: "",
  agreeToTerms: false,
 });
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState("");

 const handleChange = (
  e: React.ChangeEvent<
   HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
 ) => {
  const {name, value, type} = e.target as HTMLInputElement;
  const checked =
   type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

  setFormData((prev) => ({
   ...prev,
   [name]: type === "checkbox" ? checked : value,
  }));
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.agreeToTerms) {
   setError("You must agree to the terms");
   return;
  }

  setIsLoading(true);
  setError("");

  try {
   // Gabungkan data dari kedua tahap
   const completeData = {...step1Data, ...formData};
   onSubmit(completeData);
  } catch (err) {
   setError("Registration failed. Please try again.");
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <div className="bg-white/50 backdrop-blur-lg max-w-sm w-full p-5 flex flex-col gap-4 justify-center items-center rounded-[8px] shadow-2xl">
   <h1 className="text-2xl font-semibold text-black">Register - Step 2</h1>
   <form
    onSubmit={handleSubmit}
    className="w-full flex flex-col items-center justify-center gap-4">
    <textarea
     placeholder="Company Address"
     required
     name="companyAddress"
     value={formData.companyAddress}
     onChange={handleChange}
     className="w-full border border-gray-400 text-gray-400 focus:ring focus:ring-blue-400 focus:text-black focus:outline-none p-2 rounded-[8px] h-24"
    />

    <select
     required
     name="companyType"
     value={formData.companyType}
     onChange={handleChange}
     className="w-full border border-gray-400 text-gray-400 focus:ring focus:ring-blue-400 focus:text-black focus:outline-none p-2 rounded-[8px]">
     <option value="">Select Company Type</option>
     {companyTypes.map((type) => (
      <option
       key={type.value}
       value={type.value}>
       {type.label}
      </option>
     ))}
    </select>

    <select
     required
     name="monthlyRevenue"
     value={formData.monthlyRevenue}
     onChange={handleChange}
     className="w-full border border-gray-400 text-gray-400 focus:ring focus:ring-blue-400 focus:text-black focus:outline-none p-2 rounded-[8px]">
     <option value="">Select Monthly Revenue</option>
     {revenueRanges.map((range) => (
      <option
       key={range.value}
       value={range.value}>
       {range.label}
      </option>
     ))}
    </select>

    <div className="flex items-center gap-2 w-full">
     <input
      type="checkbox"
      id="agreeToTerms"
      name="agreeToTerms"
      checked={formData.agreeToTerms}
      onChange={handleChange}
      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
     />
     <label
      htmlFor="agreeToTerms"
      className="text-sm text-gray-700">
      I agree to submit my data
     </label>
    </div>

    <div className="flex gap-2 w-full">
     <button
      type="button"
      onClick={onBack}
      className="w-full bg-gray-300 p-2 rounded text-black cursor-pointer hover:bg-gray-400">
      Back
     </button>
     <button
      type="submit"
      disabled={isLoading}
      className="w-full bg-[#337367] p-2 rounded text-white cursor-pointer hover:bg-[#395c55] disabled:opacity-50">
      {isLoading ? "Processing..." : "Register"}
     </button>
    </div>
   </form>
   {error && <p className="text-red-500">{error}</p>}
  </div>
 );
}
