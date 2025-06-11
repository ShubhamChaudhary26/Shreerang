"use client";

import { motion } from "framer-motion";
import ScrollFadeIn from "../../hooks/ScrollFadeIn";

export default function EsomarSection() {
  return (
    <>
      <ScrollFadeIn delay={0.2}>
        <section className=" px-6 py-16" >
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            {/* Image Section with Animation */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative w-full lg:w-1/2"
            >
              <div className="flex items-center justify-center h-full">
                <img
                  src="/about/escomar.svg"
                  alt="MintSurvey branding"
                  className="custom-image"
                  
                />
              </div>
            </motion.div>

            

            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:w-1/2 space-y-6"
              
            >
              <h2 className="h2">
                {" "}
                MintSurvey’s GDPR Compliance Commitment
              </h2>
              <p className="p2 ">
                MintSurvey’s GDPR Compliance Commitment At MintSurvey, we
                strictly adhere to the General Data Protection Regulation (GDPR)
                — the EU’s framework ensuring data privacy and protection
                <br />
                <br />
                What is GDPR?
                <br />
                GDPR governs how personal data is collected, stored, and used,
                giving individuals control over their information and requiring
                organizations to handle data responsibly and securely.
                <br />
                <br />
                How We Comply:
                <br />
                Informed Consent: Data is collected only with clear, explicit
                participant consent.
                <br />
                Anonymity & Confidentiality: Personal identifiers are removed to
                protect respondent privacy.
                <br />
                <br />
                Data Minimization: We collect only essential data relevant to
                the research.
                <br />
                Secure Storage: Data is protected with encryption and strict
                access controls.
                <br />
                <br />
                Participant Rights: Individuals can access, correct, or request
                deletion of their data anytime.
                <br />
                <br />
                MintSurvey is committed to transparency, ethics, and respecting
                privacy in every project.
              </p>
            </motion.div>
          </div>
        </section>
      </ScrollFadeIn>
    </>
  );
}
