import React from 'react';
import Head from 'next/head';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 mt-[68px] px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Privacy Policy - MintSurvey</title>
        <meta name="description" content="Privacy Policy and Cookies Notice for MintSurvey." />
      </Head>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy and Cookies Notice</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Introduction</h2>
          <p className="text-gray-600">
            Mukraj-Insights &amp; Consultancy LLP (&quot;MintSurvey,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), registered under the Limited Liability Partnership Act, 2008, with its registered office at E-401, Pramukh Paramount, Kudasan, Gandhinagar – 382421, Gujarat, India, is committed to protecting your privacy in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and other applicable Indian laws.
          </p>

          <p className="text-gray-600 mt-4">
            This Privacy Policy explains how we collect, use, store, and protect your personal data when you visit www.mintsurvey.com (&quot;Website&quot;) or engage with our services. For inquiries, contact our Data Protection Officer at <a href="mailto:IndiaResearch@mintsurvey.com" className="text-blue-600 hover:underline">IndiaResearch@mintsurvey.com</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Information We Collect</h2>
          <p className="text-gray-600">
            We collect the following personal data, as defined under the DPDP Act:
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Data provided through forms on our Website, such as name, email, and phone number.</li>
            <li>Correspondence records if you contact us.</li>
            <li>Business contact details collected at events (e.g., via business cards).</li>
            <li>Usage data, including IP address, browser type, device information, and website navigation patterns, as permitted under the Information Technology Act, 2000.</li>
          </ul>
          <p className="text-gray-600 mt-4">
            We do not collect sensitive personal data (e.g., racial or ethnic origins, religious beliefs) unless explicitly consented to and necessary for a specific purpose.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Cookies</h2>
          <p className="text-gray-600">
            We use cookies to enhance your experience, provide personalized content, and analyze traffic. Cookies are small text files stored on your device. We use:
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <li><strong>Necessary Cookies</strong>: Essential for website functionality (e.g., session management).</li>
            <li><strong>Preference Cookies</strong>: Store your language or region preferences.</li>
            <li><strong>Statistics Cookies</strong>: Collect anonymous data on website usage.</li>
            <li><strong>Marketing Cookies</strong>: Track browsing for relevant advertisements.</li>
          </ul>
          <p className="text-gray-600 mt-4">
            You can manage cookie preferences via our Cookie Declaration on the Website. For details, see our Cookie Disclosure below.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">How We Use Your Personal Data</h2>
          <p className="text-gray-600">
            We process your personal data under the following lawful bases as per the DPDP Act:
          </p>
          <table className="w-full text-gray-600 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Purpose</th>
                <th className="border border-gray-300 p-2">Data Categories</th>
                <th className="border border-gray-300 p-2">Legal Basis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Operating the Website</td>
                <td className="border border-gray-300 p-2">IP address, device information</td>
                <td className="border border-gray-300 p-2">Legitimate interest</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Analyzing Website Usage</td>
                <td className="border border-gray-300 p-2">IP address, usage data</td>
                <td className="border border-gray-300 p-2">Consent (via Cookie Declaration)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Responding to Inquiries</td>
                <td className="border border-gray-300 p-2">Name, email, phone</td>
                <td className="border border-gray-300 p-2">Consent or legitimate interest</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Marketing</td>
                <td className="border border-gray-300 p-2">Name, email, job title</td>
                <td className="border border-gray-300 p-2">Consent</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Data Storage and Security</h2>
          <p className="text-gray-600">
            Your data is stored on secure servers in India, compliant with the DPDP Act and IT Rules, 2011. We use AES-256 encryption, restricted access, and endpoint protection to safeguard your data. Data may be transferred outside India only with adequate safeguards, such as Standard Contractual Clauses, as required by law.
          </p>
          <p className="text-gray-600 mt-4">
            In case of a data breach, we will notify you and the Data Protection Authority of India within 72 hours, as mandated by the DPDP Act.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Data Sharing</h2>
          <p className="text-gray-600">
            We may share your data with:
          </p>
          <ul className="list-disc pl-6 text-grey-600">
            <li>Third-party service providers (e.g., CRM platforms) under strict confidentiality agreements.</li>
            <li>Prospective buyers or sellers in case of business transactions, with your consent where required.</li>
            <li>Authorities to comply with legal obligations or protect our rights.</li>
          </ul>
          <p className="text-gray-600 mt-4">
            We do not sell personal data. Data sharing for analytics or advertising is based on your consent via our Cookie Declaration.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Data Retention</h2>
          <p className="text-gray-600">
            We retain personal data only as long as necessary for the purposes outlined, typically not exceeding 3 years unless required by law (e.g., tax compliance). Data is securely deleted thereafter, in line with our ISO 27001-compliant Business Continuity Plan.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Rights</h2>
          <p className="text-gray-600">
            Under the DPDP Act, you have the following rights:
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Right to access and obtain a copy of your personal data.</li>
            <li>Right to correct inaccurate or incomplete data.</li>
            <li>Right to erase your data, subject to legal obligations.</li>
            <li>Right to restrict or object to data processing.</li>
            <li>Right to data portability in a structured format.</li>
            <li>Right to withdraw consent at any time.</li>
            <li>Right to nominate a representative to act on your behalf.</li>
          </ul>
          <p className="text-gray-600 mt-4">
            To exercise these rights, contact us at <a href="mailto:IndiaResearch@mintsurvey.com" className="text-blue-600 hover:underline">IndiaResearch@mintsurvey.com</a>. We may verify your identity before processing requests. You may also lodge complaints with the Data Protection Authority of India.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Cookie Disclosure</h2>
          <p className="text-gray-600">
            Our Website uses cookies as detailed below (last updated: June 5, 2025):
          </p>
          <table className="w-full text-gray-600 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Provider</th>
                <th className="border border-gray-300 p-2">Purpose</th>
                <th className="border border-gray-300 p-2">Duration</th>
                <th className="border border-gray-300 p-2">Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
               <td className="border border-gray-300 p-2">__cf_bm</td>
                <td className="border border-gray-300 p-2">Cloudflare</td>
                <td className="border border-gray-300 p-2">Distinguishes between humans and bots</td>
                <td className="border border-gray-300 p-2">1 day</td>
                <td className="border border-gray-300 p-2">HTTP Cookie</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">CookieConsent</td>
                <td className="border border-gray-300 p-2">Cookiebot</td>
                <td className="border border-gray-300 p-2">Stores cookie consent state</td>
                <td className="border border-gray-300 p-2">1 year</td>
                <td className="border border-gray-300 p-2">HTTP Cookie</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">_ga</td>
                <td className="border border-gray-300 p-2">Google</td>
                <td className="border border-gray-300 p-2">Tracks website usage for analytics</td>
                <td className="border border-gray-300 p-2">2 years</td>
                <td className="border border-gray-300 p-2">HTTP Cookie</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">_gcl_au</td>
                <td className="border border-gray-300 p-2">Google</td>
                <td className="border border-gray-300 p-2">Tracks ad performance</td>
                <td className="border border-gray-300 p-2">3 months</td>
                <td className="border border-gray-300 p-2">HTTP Cookie</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-600 mt-4">
            You can change or withdraw your consent via the Cookie Declaration on our Website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Changes to This Policy</h2>
          <p className="text-gray-600">
            This Privacy Policy was last updated on June 5, 2025. We may update it periodically, and changes will be posted on this page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact Us</h2>
          <p className="text-gray-600">
            For privacy-related inquiries, contact our Data Protection Officer:
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Email: <a href="mailto:IndiaResearch@mintsurvey.com" className="text-blue-600 hover:underline">IndiaResearch@mintsurvey.com</a></li>
            <li>Post: Mukraj-Insights & Consultancy LLP, E-401, Pramukh Paramount, Kudasan, Gandhinagar – 382421, Gujarat, India</li>
            {/* <li>Phone: +91-22-1234-5678</li> */}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;