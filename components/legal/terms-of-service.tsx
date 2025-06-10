
import React from "react";
import { LegalDocumentDialog, LegalDocumentProps } from "./legal-document-dialog";

type TermsOfServiceProps = Omit<LegalDocumentProps, "title" | "children" | "version" | "effectiveDate">;

export function TermsOfServiceDialog(props: TermsOfServiceProps) {
  return (
    <LegalDocumentDialog
      title="PeerPesa Terms of Service"
      version="2.0"
      effectiveDate="October 1, 2024"
      {...props}
    >
      <div className="space-y-6">
        <section id="introduction" className="space-y-3">
          <h2 className="text-xl font-bold">1. Introduction</h2>
          <p>
            Welcome to PeerPesa. These Terms of Service ("Terms") govern your use of PeerPesa's platform, website, mobile applications, products and services ("Services"). Please read these Terms carefully before accessing or using our Services.
          </p>
          <p>
            By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use our Services.
          </p>
          <p>
            PeerPesa Technologies Limited ("PeerPesa", "we", "us" or "our") is a company registered in Kenya with its headquarters in Nairobi and operations across Africa.
          </p>
        </section>

        <section id="eligibility" className="space-y-3">
          <h2 className="text-xl font-bold">2. Eligibility</h2>
          <p>
            To use our Services, you must:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Be at least 18 years old</li>
            <li>Have the legal capacity to enter into a binding agreement</li>
            <li>Not be prohibited from using our Services under applicable laws</li>
            <li>Complete the registration process successfully, including our identity verification procedures</li>
          </ul>
        </section>
        
        <section id="account" className="space-y-3">
          <h2 className="text-xl font-bold">3. Account Registration and Security</h2>
          <p>
            When you register for a PeerPesa account, you agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and promptly update your account information</li>
            <li>Keep your account credentials confidential</li>
            <li>Be responsible for all activities that occur under your account</li>
            <li>Notify us immediately of any unauthorized use or security breach</li>
          </ul>
          <p>
            We reserve the right to suspend or terminate your account if we detect any suspicious activity or violation of these Terms.
          </p>
        </section>

        <section id="services" className="space-y-3">
          <h2 className="text-xl font-bold">4. Our Services</h2>
          <p>
            PeerPesa provides cross-border money transfer and related financial services, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Money transfers to mobile wallets and bank accounts</li>
            <li>Currency exchange services</li>
            <li>Cryptocurrency purchase and exchange</li>
            <li>Other financial services as may be added from time to time</li>
          </ul>
          <p>
            We strive to make our Services available 24/7, but we do not guarantee uninterrupted access. Services may be unavailable during maintenance or due to technical issues.
          </p>
        </section>

        <section id="fees" className="space-y-3">
          <h2 className="text-xl font-bold">5. Fees and Charges</h2>
          <p>
            We charge fees for our Services as disclosed before you complete a transaction. Fees may vary based on:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Transaction amount</li>
            <li>Destination country</li>
            <li>Payment method</li>
            <li>Receipt method</li>
            <li>Currency exchange rates</li>
          </ul>
          <p>
            We may update our fees from time to time. Any changes will be communicated to you and will apply to future transactions.
          </p>
        </section>

        {/* Further sections would continue here */}
      </div>
    </LegalDocumentDialog>
  );
}
