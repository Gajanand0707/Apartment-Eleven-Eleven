"use client";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    idea: "",
    name: "",
    email: "",
    linkedin: "",
    links: "",
    differentiation: "",
    innovation: "",
    investReason: "",
    captcha: "",
    sector: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-[#d0c0a5] text-[#0E4C45] font-['Playfair_Display']">
      {/* Header */}
      <div className="bg-[#0E4C45] text-[#F5EDE0] py-8 text-center">
        <h1 className="text-3xl md:text-4xl leading-snug text-white">
          We Are Looking For The Sun, Not Stars, <br /> Stars Fade Away When The Sun Is Out !
        </h1>
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto mt-14 bg-[#d0c0a5] space-y-10 px-10"
      >
        {/* Describe your Idea */}
      <div className="w-full flex flex-col items-center">
  <label className="text-2xl font-semibold block mb-4 border-b-2 border-[#0E4C45] w-fit self-start sm:self-center md:self-start">
    Describe your Idea*
  </label>

  <div className="w-full sm:w-[90%] md:w-[95%] lg:w-[96%] rounded-2xl border-2 border-[#0E4C45] overflow-hidden">
    {/* Textarea */}
    <div className="relative">
      <textarea
        name="idea"
        value={formData.idea}
        onChange={handleChange}
        placeholder="Write a Brief about your Idea..."
        className="w-full h-56 p-5 text-lg text-gray-700 outline-none resize-none bg-white placeholder-[#494949] block"
        style={{
          marginBottom: "-1px", // removes the visual gap
          display: "block",
        }}
      />
    </div>

    {/* Upload + Sector Section */}
    <div className="bg-[#0E4C45] text-[#F5EDE0] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 px-6 py-5">
      {/* Left Side - Upload Section */}
      <div className="flex flex-col items-start">
        {/* Hidden File Input */}
        <input
          type="file"
          id="fileInput"
          accept=".pdf,.jpg,.jpeg,.png,.pptx"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              console.log("Selected file:", file.name);
            }
          }}
        />

        {/* Visible Button */}
        <button
          type="button"
          onClick={() => document.getElementById("fileInput")?.click()}
          className="text-white bg-[#0E4C45] px-5 py-2 text-sm font-semibold border border-white rounded hover:opacity-90 w-full sm:w-auto"
        >
          Drag & Drop a File
        </button>

        <p className="text-[12px] mt-2 text-white text-center sm:text-left leading-tight">
          (Upload Relevant Material)
          <br />
          (PDF, JPG, JPEG, PPTX, PNG only)
        </p>
      </div>

      {/* Right Side - Dropdown */}
      <div className="text-base w-full sm:w-auto">
        <label htmlFor="sector" className="block text-[13px] text-white mb-1">
          Sector of Interest
        </label>
        <select
          id="sector"
          name="sector"
          value={formData.sector}
          onChange={handleChange}
          className="bg-white text-[#0E4C45] rounded px-4 py-2 text-sm outline-none w-full sm:w-auto"
        >
          <option value="">Select your Sector</option>
          <option value="technology">Technology</option>
          <option value="design">Design</option>
          <option value="education">Education</option>
          <option value="finance">Finance</option>
        </select>
      </div>
    </div>
  </div>
</div>





        {/* Basic Info Inputs */}
        <div className="space-y-6">
          {[
            { name: "name", placeholder: "Your Full Name" },
            { name: "email", placeholder: "Your Email Address" },
            { name: "linkedin", placeholder: "Your LinkedIn Profile URL" },
            { name: "links", placeholder: "Additional Links to Your Ideas" },
          ].map((input) => (
            <input
              key={input.name}
              type={input.name === "email" ? "email" : "text"}
              name={input.name}
              placeholder={input.placeholder}
              value={formData[input.name as keyof typeof formData]}
              onChange={handleChange}
              className="w-full border-2 border-[#0E4C45] rounded-2xl p-5 text-lg outline-none bg-white placeholder-[#494949]"
            />
          ))}
        </div>

        {/* Custom styled textareas */}
        {[
          { label: "What is your Point of Differentiation?", name: "differentiation" },
          { label: "What is Your Innovation?", name: "innovation" },
          { label: "Why should we Invest in You?", name: "investReason" },
        ].map((item) => (
          <div key={item.name} className="flex flex-col">
            {/* Label Box */}
            <div className="border-2 border-[#0E4C45] rounded-2xl px-5 py-3 bg-white text-[#494949] font-semibold text-lg">
              {item.label}
            </div>
            {/* Gray Answer Box */}
            <textarea
              name={item.name}
              value={formData[item.name as keyof typeof formData]}
              onChange={handleChange}
              placeholder="Your Answer"
              className=" w-[90%]  mx-auto md:h-44 h-22 border-2 border-t-0 border-[#0E4C45] rounded-b-2xl bg-[#D9D9D9] p-5 text-lg outline-none resize-none placeholder-[#494949]"
            />
          </div>
        ))}

        {/* Captcha */}
        <input
          type="text"
          name="captcha"
          placeholder="2 + 2 = ?"
          value={formData.captcha}
          onChange={handleChange}
          className="w-full border-2 border-[#0E4C45] rounded-2xl p-5 text-lg outline-none bg-white placeholder-[#494949]"
        />

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="bg-[#0E4C45] text-[#F5EDE0] px-10 py-4 mb-14 rounded-full text-lg font-semibold hover:bg-[#093B34] transition"
          >
            Apply for Residency
          </button>
        </div>
      </form>
    </div>
  );
}
