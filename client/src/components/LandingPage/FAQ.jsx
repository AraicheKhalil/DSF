import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

const FAQ = () => {
  
  return (
    <>
        <Navbar />
        <div className="container mx-auto p-6 mt-20 lg:p-12 font-Exo-2">
    <div className="bg-zinc-100 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-12">SmartDoc FAQ</h1>

        <div className="space-y-6 text-gray-700 max-w-[800px]">
            <section>
                <h2 className="text-2xl font-semibold mb-2">1. What is SmartDoc?</h2>
                <p>
                    SmartDoc is an AI-powered document processing platform that automates the extraction, classification, and structuring of data from various document types. Designed to enhance efficiency and reduce manual entry, SmartDoc is ideal for organizations that handle large volumes of documents and need to ensure data privacy and compliance.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">2. How does SmartDoc work?</h2>
                <p>
                    SmartDoc leverages advanced AI technologies, including Optical Character Recognition (OCR), Natural Language Processing (NLP), and Machine Learning (ML), to extract, analyze, and structure data from documents. The platform processes documents within an average of 5 seconds per file and maintains at least a 99% accuracy rate in data extraction.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">3. Can I try SmartDoc for free?</h2>
                <p>
                    Yes, SmartDoc offers a free playground where users can perform single document extractions and see the results in a few seconds. This feature allows users to experience the platform's speed and accuracy before committing to the full enterprise solution.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">4. What features are included in the enterprise version of SmartDoc?</h2>
                <p>
                    The enterprise version of SmartDoc provides a more comprehensive solution with capabilities such as:
                </p>
                <ul className="list-disc ml-6">
                    <li>Multiple file uploads for batch processing.</li>
                    <li>Advanced integrations with existing enterprise systems.</li>
                    <li>Customizable workflows and automation rules.</li>
                    <li>Enhanced security and compliance features.</li>
                    <li>Dedicated customer support and training.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">5. Is SmartDoc secure?</h2>
                <p>
                    Absolutely. SmartDoc prioritizes data security and compliance. The platform operates under a zero data policy, meaning no user data is stored. All data processing is done using secure encryption protocols, and the platform complies with industry standards like GDPR.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">6. What types of documents can SmartDoc process?</h2>
                <p>
                    SmartDoc can handle various document formats, including PDFs, JPEGs, PNGs, and scanned documents. Whether you’re working with structured forms or unstructured data, SmartDoc is designed to adapt to different business needs and is not limited by templates.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">7. How accurate is SmartDoc?</h2>
                <p>
                    SmartDoc boasts a 99% accuracy rate in data extraction, reducing the need for manual review and correction. This high level of accuracy is achieved through continuous AI model training and improvements.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">8. How to increase accuracy of the response?</h2>
                <p>
                    For optimal results, follow these tips:
                </p>
                <ul className="list-disc ml-6">
                    <li>Use high-resolution images.</li>
                    <li>Ensure good lighting to avoid shadows and glare.</li>
                    <li>Crop the image to remove unnecessary background.</li>
                    <li>Rotate image if needed.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">9. What is the pricing model for SmartDoc?</h2>
                <p>
                    SmartDoc offers a competitive pricing structure. The cloud-based solution is generally more cost-effective compared to on-premise deployments. Pricing varies depending on the volume of documents processed and the specific needs of the organization. The free playground offers an excellent starting point for users to experience the platform.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">10. Can SmartDoc be used on-premise?</h2>
                <p>
                    Yes, while SmartDoc is primarily a cloud-based solution, it can also be deployed on-premise. This option is ideal for organizations that require complete control over their data infrastructure due to compliance or other reasons.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">11. What industries benefit most from SmartDoc?</h2>
                <p>
                    SmartDoc is especially beneficial for industries that process large volumes of documents and have strict compliance requirements, such as finance, healthcare, legal, and insurance sectors.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">12. Does SmartDoc support integration with other systems?</h2>
                <p>
                    Yes, the enterprise version of SmartDoc supports seamless integration with various cloud storage services and enterprise systems. This allows for automated workflows and more efficient operations.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">13. What kind of customer support does SmartDoc offer?</h2>
                <p>
                    SmartDoc provides comprehensive customer support, including onboarding, training, and ongoing technical assistance. Our team is dedicated to helping you maximize the platform’s potential to meet your business objectives.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">14. How does SmartDoc ensure compliance with data privacy regulations?</h2>
                <p>
                    SmartDoc is designed with compliance in mind, adhering to data privacy regulations such as GDPR. The platform’s zero data policy ensures that no user data is stored, and all processing is done securely.
                    We encrypt all data at rest (AES-256) and in transit (TLS 1.2+) and use strict access controls to limit who can access data. Additionally, SmartDoc offers audit trails and reporting features to help organizations maintain compliance.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">15. What makes SmartDoc different from other document processing solutions?</h2>
                <p>
                    SmartDoc differentiates itself through its combination of high accuracy, speed, security, and flexibility.
                    Additionally, the free playground allows users to experience the platform firsthand. The enterprise version offers even greater capabilities, including multiple file uploads and extensive integrations, all at a competitive price.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">16. How can I get started with SmartDoc?</h2>
                <p>
                    To get started, you can try out our free playground for single document extractions on our website. For a more comprehensive solution, you can request a demo of the enterprise version, where our team will guide you through the platform’s features and help tailor it to your organization's needs.
                </p>
            </section>
        </div>
    </div>
</div>
<Footer />
    </>
  );
};

export default FAQ;
