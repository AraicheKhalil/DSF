import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

const TermsOfService = () => {
  return (
    <>
        <Navbar />
        <div className="container mx-auto p-6 mt-20 lg:p-12 font-Exo-2">
        <div className="bg-zinc-100 p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
            <p className="text-gray-500 mb-6">Effective Date: 24th August 2024</p>

            <p className='text-gray-700 mb-10 max-w-[800px]'>
                Welcome to SmartDoc. These Terms of Service ("Terms") govern your use of our intelligent document processing platform ("Service"). By accessing or using the Service, you agree to these Terms. If you do not agree, please do not use the Service.
            </p>

            <div className="space-y-6">
            <section>
                <h2 className="text-2xl font-semibold mb-2">1. Use of Service</h2>
                <ul className="list-disc ml-6 text-gray-700">
                <li><strong>Eligibility:</strong> You must be at least 18 years old and legally capable of entering into contracts to use the Service.</li>
                <li><strong>Permitted Use:</strong> The Service is designed to process documents for structured data extraction. Use it solely for lawful purposes and in compliance with these Terms.</li>
                <li><strong>User Responsibility:</strong> You are responsible for ensuring you have the rights to the data you process through the Service.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">2. Data Handling & Privacy</h2>
                <ul className="list-disc ml-6 text-gray-700">
                <li><strong>Data Processing:</strong> All data processed is temporarily cached and encrypted. We do not store, retain, or keep records of your data post-processing.</li>
                <li><strong>No Data Retention:</strong> Upon completion of the processing session, all data is permanently deleted.</li>
                <li><strong>No Cookies:</strong> We do not use cookies or track personal data.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">3. Intellectual Property</h2>
                <ul className="list-disc ml-6 text-gray-700">
                <li><strong>Ownership:</strong> All intellectual property related to the Service belongs to DSF Analytics. Use of the Service does not grant you any rights to this property.</li>
                <li><strong>License:</strong> You are granted a limited license to use the Service for its intended purpose.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">4. Prohibited Activities</h2>
                <ul className="list-disc ml-6 text-gray-700">
                <li><strong>Restrictions:</strong> Do not misuse the Service by engaging in activities that are illegal, harmful, or abusive.</li>
                <li><strong>Automation:</strong> Unauthorized automated access or interaction with the Service is prohibited.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">5. Disclaimers & Limitation of Liability</h2>
                <ul className="list-disc ml-6 text-gray-700">
                <li><strong>No Warranties:</strong> The Service is provided "as is." We make no warranties regarding its performance, accuracy, or suitability.</li>
                <li><strong>Liability:</strong> Our liability is limited to the amount you paid for the Service, if any. We are not responsible for indirect, incidental, or consequential damages.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">6. Termination</h2>
                <ul className="list-disc ml-6 text-gray-700">
                <li><strong>Right to Terminate:</strong> We may suspend or terminate your access to the Service at any time without notice if you violate these Terms.</li>
                <li><strong>Post-Termination:</strong> After termination, you will lose access to the Service and any data processed will be deleted.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">7. Changes to Terms</h2>
                <p className="text-gray-700"><strong>Modifications:</strong> We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the revised Terms.</p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">8. Governing Law</h2>
                <p className="text-gray-700"><strong>Jurisdiction:</strong> These Terms are governed by the laws of the State of California, USA. Any disputes will be resolved through arbitration in San Diego, California.</p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">9. Contact</h2>
                <p className="text-gray-700"><strong>Inquiries:</strong> For any questions regarding these Terms, please contact us at contact@dsf-smartdoc.com.</p>
            </section>
            </div>
        </div>
        </div>
        <Footer />
    </>
  );
};

export default TermsOfService;
