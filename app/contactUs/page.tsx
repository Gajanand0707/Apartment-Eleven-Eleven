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
    <div className="min-h-screen bg-[#d0c0a5] text-[#0E4C45] mt-20">
      {/* Header */}
      <div className="bg-[#0E4C45] text-[#F5EDE0] py-4 text-center">
        <h1 className="text-2xl md:text-4xl font-goudy-old leading-snug tracking-wide font-bold text-white">
          We Are Looking For The Sun, Not Stars, <br /> Stars Fade Away When The Sun Is Out !
        </h1>
      </div>




      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="max-w-8xl mx-auto mt-14 bg-[#d0c0a5] space-y-10 px-10"
      >
        {/* Describe your Idea */}
      <div className="w-full flex flex-col items-center">
  <label className="text-2xl md:text-4xl font-bold font-goudy-old block text-black mb-4 border-b-2 border-[#0E4C45] w-fit self-start sm:self-center md:self-start">
    Describe your Idea*
  </label>

  <div className="w-full md:w-[90%] h-full md:h-[560px] rounded-4xl border-2 border-[#0E4C45] overflow-hidden flex flex-col">
    {/* Textarea */}
    <div className="relative flex-1 flex flex-col">
      <textarea
        name="idea"
        value={formData.idea}
        onChange={handleChange}
        placeholder="Write a Brief about your Idea..."
        className="w-full h-full min-h-[300px] p-5 text-lg text-gray-700 outline-none resize-none bg-white placeholder-[#494949] font-goudy block"
        style={{
          marginBottom: "-1px", // removes the visual gap
          display: "block",
        }}
      />
    </div>

    {/* Upload + Sector Section */}
    <div className="bg-[#0E4C45] h-full md:h-[151px] text-[#F5EDE0] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 px-6 py-5">
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
          className="text-white bg-[#0E4C45] px-5 py-2 text-xl md:text-2xl font-goudy font-semibold border border-white rounded hover:opacity-90 w-full sm:w-auto"
        >
          Drag & Drop a File
        </button>

        <p className="text-xl md:text-2xl mt-2 text-white font-goudy text-center sm:text-left leading-tight">
          (Upload Relevant Material)
          <br />
          (PDF, JPG, JPEG, PPTX, PNG only)
        </p>
      </div>

      {/* Right Side - Dropdown */}
      <div className="text-base w-full sm:w-auto">
        <label htmlFor="sector" className="block text-xl md:text-2xl font-goudy text-white mb-1">
          Sector of Interest
        </label>
        <select
          id="sector"
          name="sector"
          value={formData.sector}
          onChange={handleChange}
          className="bg-white text-gray-600 rounded-2xl px-4 py-2 text-xl md:text-2xl font-goudy outline-none w-full sm:w-auto"
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
        <div className="space-y-6 flex flex-col items-center w-full md:w-[90%] md:mx-auto">
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
              className="w-full border-2 font-goudy border-[#0E4C45] rounded-4xl p-5 text-xl md:text-2xl outline-none bg-white placeholder-[#494949]"
            />
          ))}
        </div>

        {/* Custom styled textareas */}
        <div className="w-full md:w-[90%] md:mx-auto space-y-6">
          {[
            { label: "What is your Point of Differentiation?", name: "differentiation" },
            { label: "What is Your Innovation?", name: "innovation" },
            { label: "Why should we Invest in You?", name: "investReason" },
          ].map((item) => (
            <div key={item.name} className="flex flex-col items-center">
              {/* Label Box */}
              <div className="w-full border-2 border-[#0E4C45] rounded-4xl px-5 py-5 bg-white text-[#494949]  font-goudy text-xl md:text-2xl">
                {item.label}
              </div>
              {/* Gray Answer Box */}
              <textarea
                name={item.name}
                value={formData[item.name as keyof typeof formData]}
                onChange={handleChange}
                placeholder="Your Answer"
                className="w-[90%] md:w-[90%] h-32 md:h-44 border-2 border-t-0 border-[#0E4C45] rounded-b-4xl font-goudy bg-[#D9D9D9] p-5 text-xl md:text-2xl outline-none resize-none placeholder-[#494949]"
              />
            </div>
          ))}
        </div>

        {/* Captcha */}
        <div className="flex justify-center w-full md:w-[90%] md:mx-auto">
          <input
            type="text"
            name="captcha"
            placeholder="2 + 2 = ?"
            value={formData.captcha}
            onChange={handleChange}
            className="w-full md:w-[90%] border-2 border-[#0E4C45] rounded-4xl p-5 text-lg outline-none bg-white placeholder-[#494949]"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="bg-[#0E4C45] text-white text-2xl md:text-4xl font-goudy-old px-10 py-4 mb-14 rounded-full font-semibold hover:bg-[#093B34] transition"
            onClick={() => window.location.href = "/afterSubmit"}
          >
            Apply for Residency
          </button>
        </div>
      </form>
    </div>
  );
}
