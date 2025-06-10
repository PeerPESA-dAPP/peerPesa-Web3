
import React from "react";
import { LegalDocumentDialog, LegalDocumentProps } from "./legal-document-dialog";

type PrivacyPolicyProps = Omit<LegalDocumentProps, "title" | "children" | "version" | "effectiveDate">;

export function PrivacyPolicyDialog(props: PrivacyPolicyProps) {
  return (
    <LegalDocumentDialog
      title="PeerPesa Data Privacy Policy"
      version="2.0"
      effectiveDate="October 1, 2024"
      {...props}
    >
      <div className="space-y-6">
        <section id="introduction" className="space-y-3">
          <h2 className="text-xl font-bold">1. Introduction</h2>
          <p>
            PeerPesa Technologies Limited ("PeerPesa," "we," or "our") is committed to safeguarding your privacy and handling your personal data
            responsibly. As a data controller, PeerPesa complies with all applicable privacy laws, including the General Data Protection Regulation
            (GDPR) for our European users, and the respective data protection laws of Kenya, Uganda, Nigeria, Tanzania, and Ghana.
          </p>
          <p>Our commitment to data protection extends to all jurisdictions in which we operate, ensuring compliance with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Kenya:</strong> Data Protection Act, 2019
            </li>
            <li>
              <strong>Uganda:</strong> Data Protection and Privacy Act, 2019
            </li>
            <li>
              <strong>Nigeria:</strong> Nigeria Data Protection Regulation (NDPR), 2019, and Nigeria Data Protection Act, 2023
            </li>
            <li>
              <strong>Tanzania:</strong> Electronic and Postal Communications (Online Content) Regulations, 2020
            </li>
            <li>
              <strong>Ghana:</strong> Data Protection Act, 2012 (Act 843)
            </li>
          </ul>
          <p>
            If you have any inquiries regarding how your personal information is used or need to exercise your privacy rights, please contact our
            Data Protection Officer (DPO) at:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:privacy@peerpesa.co" className="text-blue-600 hover:underline">
                privacy@peerpesa.co
              </a>
            </li>
            <li>
              <strong>Address:</strong>{" "}
              <a href="https://peerpesa.co" className="text-blue-600 hover:underline">
                https://peerpesa.co
              </a>
            </li>
          </ul>
        </section>

        <section id="scope" className="space-y-3">
          <h2 className="text-xl font-bold">2. Scope and Applicability</h2>
          <p>
            This Privacy Policy applies to all personal data processed by PeerPesa through our platform, website, mobile applications, and any related services. It covers information 
            about individuals who use our services, visit our website, interact with us through other channels, or whose information we receive from third parties.
          </p>
          <p>
            The policy applies regardless of how you access our services, whether through our website, mobile applications, or other means of communication.
          </p>
        </section>

        <section id="definitions" className="space-y-3">
          <h2 className="text-xl font-bold">3. Key Definitions</h2>
          <ul className="space-y-2">
            <li><strong>Personal Data:</strong> Any information relating to an identified or identifiable natural person.</li>
            <li><strong>Data Controller:</strong> PeerPesa, which determines the purposes and means of processing your personal data.</li>
            <li><strong>Processing:</strong> Any operation performed on personal data, including collection, recording, storage, use, and transmission.</li>
            <li><strong>Data Subject:</strong> The individual to whom the personal data relates (you, our user, or visitor).</li>
          </ul>
        </section>

        <section id="principles" className="space-y-3">
          <h2 className="text-xl font-bold">4. Privacy Principles</h2>
          <p>PeerPesa adheres to the following principles when processing your data:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Lawfulness, Fairness, and Transparency:</strong> We process data lawfully and transparently.</li>
            <li><strong>Purpose Limitation:</strong> We collect data for specific, explicit, and legitimate purposes.</li>
            <li><strong>Data Minimization:</strong> We limit collection to what's necessary.</li>
            <li><strong>Accuracy:</strong> We maintain accurate and up-to-date data.</li>
            <li><strong>Storage Limitation:</strong> We don't keep data longer than necessary.</li>
            <li><strong>Integrity and Confidentiality:</strong> We ensure appropriate security measures.</li>
            <li><strong>Accountability:</strong> We take responsibility for compliance.</li>
          </ul>
        </section>

        <section id="information" className="space-y-3">
          <h2 className="text-xl font-bold">5. Types of Personal Information Collected</h2>
          <p>We may collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Identity information (name, date of birth, identification documents)</li>
            <li>Contact information (email address, phone number, physical address)</li>
            <li>Financial information (transaction history, payment details)</li>
            <li>Technical information (IP address, device information, browser type)</li>
            <li>Usage information (how you use our services)</li>
            <li>Marketing preferences</li>
          </ul>
        </section>

        {/* Further sections would continue here */}
      </div>
    </LegalDocumentDialog>
  );
}
