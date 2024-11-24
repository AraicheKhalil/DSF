import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

const PrivacyPolicy = () => {
  return (
    <>
        <Navbar />
        <div className="container mx-auto p-6 mt-20 lg:p-12 font- font-Exo-2 ">
        <div className="bg-zinc-100 p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-gray-500 mb-6">Effective Date: 24th August 2024</p>

            <p className='text-gray-700 mb-10 max-w-[800px]'> At SmartDoc, we are committed to protecting your privacy. This Privacy Policy outlines how we
handle your data when you use our intelligent document processing platform ("Service").</p>

            <div className="space-y-6">
            <section>
                <h2 className="text-2xl font-semibold mb-2">1. Data Collection</h2>
                <ul className="list-disc ml-6 text-gray-700">
                <li><strong>Minimal Data Collection:</strong> We only collect the minimum amount of data necessary to provide our Service.</li>
                <li><strong>No Personal Data Tracking:</strong> We do not use cookies or any tracking mechanisms to monitor your personal data.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">2. Data Processing</h2>
                <ul className="list-disc ml-6 text-gray-700">
                <li><strong>Temporary Data Handling:</strong> All data processed through the Service is temporarily cached and encrypted.</li>
                <li><strong>No Data Storage:</strong> We do not store, retain, or maintain records of the data you process.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">3. Data Security</h2>
                <ul className="list-disc ml-6 text-gray-700">
                <li><strong>Encryption:</strong> We employ industry-standard encryption methods to protect your data.</li>
                <li><strong>Access Control:</strong> Access to the Service is secured and limited to authorized personnel.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">4. Third-Party Access</h2>
                <ul className="list-disc ml-6 text-gray-700">
                <li><strong>No Sharing with Third Parties:</strong> We do not share, sell, or distribute your data to third
parties. Your data is used solely for the purpose of providing the Service.</li>
                <li><strong>Service Providers:</strong> If we engage third-party service providers for maintenance or
technical support, they are bound by strict confidentiality agreements.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">5. User Rights</h2>
                <ul className="list-disc ml-6 text-gray-700">
                <li><strong>Data Access: </strong>Since we do not store your data post-processing, we cannot provide
access to processed data after your session ends.</li>
                <li><strong>Data Deletion:</strong> Data is automatically deleted after processing. No further action is
required from the user to delete their data.</li>
                <li>
                <strong>Consent:</strong> By using the Service, you consent to our data handling practices as described
in this Privacy Policy.
                </li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">6. Changes to Privacy Policy</h2>
                <p className="text-gray-700"><strong>Modifications:</strong> We may update this Privacy Policy from time to time. Any significant
changes will be communicated via the Service. Continued use of the Service after
changes indicates your acceptance of the revised policy.</p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">7. Governing Law</h2>
                <p className="text-gray-700"><strong>Jurisdiction:</strong> This Privacy Policy is governed by the laws of the State of California, USA.
Any disputes arising from this policy will be resolved in San Diego, California.</p>
            </section>
            
            <section>
                <h2 className="text-2xl font-semibold mb-2">8. Contact Information</h2>
                <p className="text-gray-700"><strong>Inquiries:</strong> For any questions regarding this Privacy Policy, please contact us at contact@dsf-analytics.com.</p>
            </section>
            </div>
        </div>
        </div>
        <Footer />
    </>
  );
};

export default PrivacyPolicy;
