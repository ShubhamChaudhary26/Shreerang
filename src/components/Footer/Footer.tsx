'use client';

import Link from "next/link";
import { useState, FormEvent } from "react";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { FaXTwitter } from "react-icons/fa6";
import { message, Select, Checkbox, Spin } from "antd";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'; // Added for reCAPTCHA
import { motion } from 'framer-motion';

const { Option } = Select;

export default function Footer() {
  const [email, setEmail] = useState<string>("");
  const [industry, setIndustry] = useState<string | undefined>(undefined);
  const [newsletterOptIn, setNewsletterOptIn] = useState<boolean>(false);
  const [termsAgreed, setTermsAgreed] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { executeRecaptcha } = useGoogleReCaptcha(); // Added for reCAPTCHA

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError("Please provide a valid email address.");
      setLoading(false);
      return;
    }

    if (!industry) {
      setError("Please select an industry.");
      setLoading(false);
      return;
    }

    if (!newsletterOptIn) {
      setError("Please opt-in to receive the weekly newsletter.");
      setLoading(false);
      return;
    }

    if (!termsAgreed) {
      setError("You must agree to the terms and confirm you’ve read the privacy notice.");
      setLoading(false);
      return;
    }

    // if (!executeRecaptcha) {
    //   setError("reCAPTCHA not loaded.");
    //   setLoading(false);
    //   return;
    // }

    try {
      // const recaptchaToken = await executeRecaptcha('footer_form');
      console.log("Submitting:", { email, industry, newsletterOptIn, termsAgreed});
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, industry, newsletterOptIn, termsAgreed }),
      });

      console.log("Response status:", response.status);
      const data: { message: string } = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        message.success(data.message, 3);
        setEmail("");
        setIndustry(undefined);
        setNewsletterOptIn(false);
        setTermsAgreed(false);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  
  // Comprehensive list of LinkedIn industries
  const linkedinIndustries = [
    "Accounting",
    "Automotive",
    "Airlines/Aviation",
    "Alternative Dispute Resolution",
    "Alternative Medicine",
    "Animation",
    "Apparel & Fashion",
    "Architecture & Planning",
    "Arts and Crafts",
    "Automotive",
    "Aviation & Aerospace",
    "Banking",
    "Biotechnology",
    "Broadcast Media",
    "Building Materials",
    "Business Supplies and Equipment",
    "Capital Markets",
    "Chemicals",
    "Civic & Social Organization",
    "Civil Engineering",
    "Commercial Real Estate",
    "Computer & Network Security",
    "Computer Games",
    "Computer Hardware",
    "Computer Networking",
    "Computer Software",
    "Construction",
    "Consumer Electronics",
    "Consumer Goods",
    "Consumer Services",
    "Cosmetics",
    "Dairy",
    "Defense & Space",
    "Design",
    "Education Management",
    "E-Learning",
    "Electrical/Electronic Manufacturing",
    "Entertainment",
    "Environmental Services",
    "Events Services",
    "Executive Office",
    "Facilities Services",
    "Farming",
    "Financial Services",
    "Fine Art",
    "Fishery",
    "Food & Beverages",
    "Food Production",
    "Fund-Raising",
    "Furniture",
    "Gambling & Casinos",
    "Glass, Ceramics & Concrete",
    "Government Administration",
    "Government Relations",
    "Graphic Design",
    "Health, Wellness and Fitness",
    "Higher Education",
    "Hospital & Health Care",
    "Hospitality",
    "Human Resources",
    "Import and Export",
    "Individual & Family Services",
    "Industrial Automation",
    "Information Services",
    "Information Technology and Services",
    "Insurance",
    "International Affairs",
    "International Trade and Development",
    "Internet",
    "Investment Banking",
    "Investment Management",
    "Judiciary",
    "Law Enforcement",
    "Law Practice",
    "Legal Services",
    "Legislative Office",
    "Leisure, Travel & Tourism",
    "Libraries",
    "Logistics and Supply Chain",
    "Luxury Goods & Jewelry",
    "Machinery",
    "Management Consulting",
    "Maritime",
    "Market Research",
    "Marketing and Advertising",
    "Mechanical or Industrial Engineering",
    "Media Production",
    "Medical Devices",
    "Medical Practice",
    "Mental Health Care",
    "Military",
    "Mining & Metals",
    "Motion Pictures and Film",
    "Museums and Institutions",
    "Music",
    "Nanotechnology",
    "Newspapers",
    "Non-Profit Organization Management",
    "Oil & Energy",
    "Online Media",
    "Outsourcing/Offshoring",
    "Package/Freight Delivery",
    "Packaging and Containers",
    "Paper & Forest Products",
    "Performing Arts",
    "Pharmaceuticals",
    "Philanthropy",
    "Photography",
    "Plastics",
    "Political Organization",
    "Primary/Secondary Education",
    "Printing",
    "Professional Training & Coaching",
    "Program Development",
    "Public Policy",
    "Public Relations and Communications",
    "Public Safety",
    "Publishing",
    "Railroad Manufacture",
    "Ranching",
    "Real Estate",
    "Recreational Facilities and Services",
    "Religious Institutions",
    "Renewables & Environment",
    "Research",
    "Restaurants",
    "Retail",
    "Security and Investigations",
    "Semiconductors",
    "Shipbuilding",
    "Sporting Goods",
    "Sports",
    "Staffing and Recruiting",
    "Supermarkets",
    "Telecommunications",
    "Textiles",
    "Think Tanks",
    "Tobacco",
    "Translation and Localization",
    "Transportation/Trucking/Railroad",
    "Utilities",
    "Venture Capital & Private Equity",
    "Veterinary",
    "Warehousing",
    "Wholesale",
    "Wine and Spirits",
    "Wireless",
    "Writing and Editing",
    "Other"
  ];

  return (
  <footer className="bg-light pt-5" id="footer">
  <div className="max-w-[1300px] text-center mx-auto px-10 sm:pl-8 md:pl-0 mt-5 ">
  <h1 className="h3 mb-5 md:mb-10 ">
    Get the best of MintSurvey each week—insights, trends, and more. 
    Subscribe now.
  </h1>
</div>

<div className="max-w-[1000px] mx-auto px-4 sm:px-4 mb-5 mt-5 md:mb-10">
  <form
    onSubmit={handleSubscribe}
    className="flex flex-col gap-4 w-full"
  >
    <div className="flex flex-col md:flex-row items-start gap-4 md:gap-7">
      <input
  type="email"
  required
  placeholder="Enter your email address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="px-4 py-[9px] rounded-md w-full md:w-[240px] h-[38px] outline-none border border-gray-300"
  disabled={loading}
/>

<div className="flex flex-col md:flex-row gap-4 md:gap-5">
  <Select
    showSearch
    placeholder="Select Industry"
    value={industry || undefined}
    onChange={(value) => setIndustry(value)}
    className="w-full md:w-[300px] h-[38px]"
    disabled={loading}
    style={{ height: 38 }}
    filterOption={(input, option) =>
      (option?.children as unknown as string)
        ?.toLowerCase()
        .includes(input.toLowerCase())
    }
  >
    {linkedinIndustries.map((ind) => (
      <Option
        key={ind}
        value={ind.toLowerCase().replace(/ & /g, "-").replace(/\//g, "-")}
      >
        {ind}
      </Option>
    ))}
  </Select>


        <div className="flex flex-col gap-4 md:gap-3 md:flex-row md:items-start w-full">
          <div className="flex flex-col gap-3">
            <Checkbox
              checked={newsletterOptIn}
              onChange={(e) => setNewsletterOptIn(e.target.checked)}
              disabled={loading}
              className="text-sm"
            >
              I’d like to receive MintSurvey’s weekly newsletter
            </Checkbox>

            <Checkbox
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
              disabled={loading}
              className="text-sm"
            >
              I agree to{" "}
              <Link href="/terms" className="text-blue hover:underline">
                Terms
              </Link>{" "}
              & confirm I’ve read the{" "}
              <Link href="/privacy" className="text-blue hover:underline">
                Privacy Notice
              </Link>.
            </Checkbox>
          </div>

          <button
            type="submit"
            className="b1 items-center px-2 mb-2 md:w-auto md:flex md:justify-end w-full sm:w-auto"
            disabled={loading}
          >
            {loading && <Spin className="mr-2" />}
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
      </div>
    </div>

    {error && <p className="text-red-600 mt-2">{error}</p>}
  </form>
</div>

  <div className="bg-black text-white">
  <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-4 py-8 sm:py-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
      {/* Consultation Section */}
      <div className="flex flex-col justify-between mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-5xl font-bold ml-1 mb-6 text-center md:text-left md:mb-12 mt-8 sm:mt-10">
          Ready to make <br /> data-driven decisions?
        </h2>
        <Link href="/requestquote#form">
          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "#087dba",
              boxShadow: "0 0 15px rgba(8, 125, 186, 0.6)",
            }}
            whileTap={{
              scale: 0.95,
              backgroundColor: "#0e4d89",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="text-white text-lg sm:text-2xl font-semibold py-4 sm:py-5 px-4 sm:px-5 rounded-md mb-4 shadow-md relative overflow-hidden w-full sm:w-auto"
            style={{ backgroundColor: "#0e4d89" }}
          >
            <span className="relative z-10 ml-0 mt-12 sm:mt-10 " >Book a Free Consultation</span>
            <motion.span
              className="absolute inset-0 -z-10"
              initial={{ width: 0 }}
              whileHover={{
                width: "100%",
                transition: { duration: 0.4, ease: "easeInOut" },
              }}
              style={{
                background: "linear-gradient(90deg, #087dba, #087dba)",
                opacity: 0.3,
              }}
            />
            <motion.span
              className="absolute inset-0 -z-10"
              whileTap={{
                scale: 1.5,
                opacity: 0,
                transition: { duration: 0.3 },
              }}
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.3) 10%, transparent 70%)",
                opacity: 0.5,
              }}
            />
          </motion.button>
        </Link>
        <p className="text-sm sm:text-sm font-medium leading-relaxed mt-2 px-4 sm:px-0 text-center md:text-left">
          Book a Free Consultation, and we’ll recommend the perfect data strategy aligned with your business goals.
        </p>
      </div>

      {/* Solutions Section */}
      <div className="sm:ml-0 md:ml-[150px] md:text-left text-center">
  <h3 className="text-lg sm:text-xl font-semibold mb-4">Solutions</h3>
  <ul className="space-y-3 text-xs sm:text-sm leading-relaxed">
    {[
      { main: "MiCorrelate", sub: "Quantitative Research", href: "/micorrelate" },
      { main: "MiConnect", sub: "Qualitative Research", href: "/miconnect" },
      { main: "MiCompliance", sub: "Mystery Shopping", href: "/micompliance" },
      { main: "MiClick", sub: "Get Trusted Info", href: "/miclick" },
      { main: "MiCollection", sub: "Data Collection Services", href: "/micollection" },
      { main: "MiCompilation", sub: "Desk Research Services", href: "/micompilation" },
      { main: "MiConcept", sub: "Product Concept Testing", href: "/miconcept" },
      { main: "MiClinic", sub: "Automotive Clinics", href: "/miclinic" },
    ].map((item) => (
      <li key={item.main} className="group/item flex flex-col">
        <span className="font-medium">{item.main}</span>
        <Link
          href={item.href.toLowerCase()}
          className="text-gray-400 text-xs sm:text-sm opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
        >
          <span className="underline-animate inline-block">{item.sub}</span>
        </Link>
      </li>
    ))}
  </ul>
</div>
      {/* About Section */}
      <div className="md:ml-8 md:text-left text-center">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">About</h3>
        <ul className="space-y-3 text-xs sm:text-sm leading-relaxed">
          <li><Link href="/about" className="underline-animate">About Us</Link></li>
          {/* <li><Link href="/contact" className="underline-animate">Contact</Link></li> */}
          
          <li><Link href="/contact#presence" className="underline-animate">Presence</Link></li>
          <li><Link href="/about#research" className="underline-animate">Research Team</Link></li>
          {/* <li><Link href="#" className="underline-animate">Company News</Link></li> */}
          <li><Link href="/about#gdpr-compliance" className="underline-animate">GDPR Compliance</Link></li>
        </ul>
      </div>

      {/* Offices Section */}
      <div>
      <h3 className="text-lg sm:text-xl text-center md:text-left font-semibold underline underline-offset-4 md:no-underline mb-4">
  Our Offices
</h3>


        <h4 className="text-base sm:text-lg font-semibold mb-2 text-center md:text-left">India Office</h4>
        <address className="text-xs sm:text-sm space-y-2 mb-6 not- personally text-center md:text-left">
          <p>E-19, Eden, #630, Innovations Park, Arkere, BG Road, Bengaluru – 560076, Karnataka</p>
          <p>E-401, Pramukh Paramount, Kudasan, Gandhinagar – 382421, Gujarat</p>
          <p>
            <a href="mailto:IndiaResearch@mintsurvey.com" className="underline-animate text-center md:text-left">IndiaResearch@mintsurvey.com</a>
          </p>
        </address>
        <h4 className="text-base sm:text-lg font-semibold mb-2 text-center md:text-left">UAE Office</h4>
        <address className="text-xs sm:text-sm space-y-2 mb-6 not-italic text-center md:text-left">
          <p>Office 10, Sharjah Media City, Al Messaned, Sharjah, United Arab Emirates</p>
          <p>
            <a href="mailto:MENAResearch@mintsurvey.com" className="underline-animate text-center md:text-left">MENAResearch@mintsurvey.com</a>
          </p>
        </address>
        <div className="flex md:justify-normal justify-center gap-4 text-xl sm:text-2xl ">
          <a href="https://www.linkedin.com/company/mintsurvey/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="hover:text-blue">
            <LinkedinOutlined />
          </a>
          <a href="https://www.facebook.com/MukrajInsightsLLC/" target="_blank" rel="noopener noreferrer" className="hover:text-blue">
            <FacebookOutlined />
          </a>
          <a href="https://www.youtube.com/@marketsurvey1692" target="_blank" rel="noopener noreferrer" className="hover:text-blue">
            <YoutubeOutlined />
          </a>
        </div>
      </div>
    </div>

    {/* Footer Bottom */}
    <div className="border-t   border-gray-700 pt-6 sm:pt-8 mt-8 sm:mt-12 flex flex-col md:flex-row items-end justify-end text-xs sm:text-xs gap-4">
      <div className="flex flex-wrap items-end justify-end gap-3">
        <a className="underline-animate text-center md:text-left">© MintSurvey Group and Affiliates 2025</a>
        <span>|</span>
        <Link href="/termsandconditions" className="underline-animate">Terms and conditions</Link>
        <span>|</span>
        <Link href="/privacypolicy" className="underline-animate">Cookies and privacy policy</Link>
      </div>
    </div>
  </div>
</div>
</footer>

  );
}