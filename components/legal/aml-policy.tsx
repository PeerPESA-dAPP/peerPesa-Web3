
import React from "react";
import { LegalDocumentDialog, LegalDocumentProps } from "./legal-document-dialog";

type AmlPolicyProps = Omit<LegalDocumentProps, "title" | "children" | "version" | "effectiveDate">;

export function AmlPolicyDialog(props: AmlPolicyProps) {
  return (
    <LegalDocumentDialog
      title="PeerPesa AML & CTF Policy"
      version="2.0"
      effectiveDate="October 1, 2024"
      {...props}
    >
      <div className="space-y-6">
        <section id="introduction" className="space-y-3">
          <h2 className="text-xl font-bold">1. Introduction</h2>
          <p>
            PeerPesa Technologies Limited ("PeerPesa," "we," or "our") is committed to preventing money laundering, terrorist financing, and compliance with all applicable laws and regulations. This Anti-Money Laundering (AML) and Counter-Terrorism Financing (CTF) Policy outlines our approach to detecting, preventing, and reporting suspicious activities.
          </p>
          <p>
            As a financial services provider operating across multiple jurisdictions, we adhere to the AML/CTF laws and regulations of each country where we operate, including but not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Kenya: Proceeds of Crime and Anti-Money Laundering Act</li>
            <li>Uganda: Anti-Money Laundering Act</li>
            <li>Nigeria: Money Laundering (Prevention and Prohibition) Act</li>
            <li>Tanzania: Anti-Money Laundering Act</li>
            <li>Ghana: Anti-Money Laundering Act</li>
            <li>International standards set by the Financial Action Task Force (FATF)</li>
          </ul>
        </section>

        <section id="risk-based" className="space-y-3">
          <h2 className="text-xl font-bold">2. Risk-Based Approach</h2>
          <p>
            PeerPesa implements a risk-based approach to AML/CTF compliance, which includes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Identifying and assessing money laundering and terrorist financing risks in our business</li>
            <li>Implementing controls proportionate to the identified risks</li>
            <li>Regularly reviewing and updating our risk assessment</li>
            <li>Allocating resources based on risk priorities</li>
          </ul>
        </section>
        
        <section id="kyc" className="space-y-3">
          <h2 className="text-xl font-bold">3. Know Your Customer (KYC) Procedures</h2>
          <p>
            PeerPesa's KYC procedures include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Customer identification and verification</li>
            <li>Collection of identification documents</li>
            <li>Address verification</li>
            <li>Enhanced due diligence for higher-risk customers</li>
            <li>Ongoing monitoring of customer relationships</li>
            <li>Regular review and updating of customer information</li>
          </ul>
          <p>
            We use both manual and automated systems to verify customer identities and may request additional information when necessary.
          </p>
        </section>

        <section id="monitoring" className="space-y-3">
          <h2 className="text-xl font-bold">4. Transaction Monitoring</h2>
          <p>
            PeerPesa continuously monitors transactions to detect suspicious activities, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Unusual transaction patterns</li>
            <li>Transactions with high-risk countries</li>
            <li>Transactions that deviate from the customer's profile</li>
            <li>Structured transactions designed to evade reporting thresholds</li>
            <li>Transactions with sanctioned individuals or entities</li>
          </ul>
          <p>
            Our monitoring systems use both rule-based and behavior-based analytics to identify potentially suspicious activities.
          </p>
        </section>

        <section id="reporting" className="space-y-3">
          <h2 className="text-xl font-bold">5. Reporting of Suspicious Activities</h2>
          <p>
            PeerPesa promptly reports suspicious activities to the appropriate authorities in accordance with applicable laws. Our reporting procedures include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Internal escalation of suspicious activities</li>
            <li>Investigation by our compliance team</li>
            <li>Filing of Suspicious Activity Reports (SARs) with relevant authorities</li>
            <li>Cooperation with law enforcement and regulatory inquiries</li>
          </ul>
        </section>

        {/* Further sections would continue here */}
      </div>
    </LegalDocumentDialog>
  );
}
