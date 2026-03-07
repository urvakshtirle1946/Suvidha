import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | Zelp',
  description: 'Zelp Terms of Service and user agreements.',
};

export default function TermsOfService() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      color: '#111827',
      padding: '3rem 1rem',
      fontFamily: 'var(--font-baskerville)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '800px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        padding: '3rem 2.5rem'
      }}>
        <div style={{ marginBottom: '2rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <Link href="/" style={{ display: 'inline-block' }}>
              <img 
                src="/logo.png" 
                alt="Zelp Logo" 
                style={{ 
                  height: '70px', 
                  objectFit: 'contain', 
                  filter: 'invert(1)', 
                  opacity: 0.9,
                  transition: 'opacity 0.2s'
                }} 
              />
            </Link>
            <Link href="/" style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6b7280', textDecoration: 'none' }}>
              Back to Home
            </Link>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#111827', letterSpacing: '-0.025em', margin: '0 0 0.5rem 0' }}>Terms of Service</h1>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Last Updated: 07 March 2026</p>
        </div>

        <div style={{ color: '#374151', lineHeight: '1.7', fontSize: '1.1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>1. Introduction</h2>
            <p style={{ marginBottom: '0.75rem' }}>
              These Terms of Service (“Terms”) govern your access to and use of the Zelp platform, including our website, mobile applications, and related services (collectively, the “Platform”). By accessing or using Zelp, you agree to be bound by these Terms and our Privacy Policy.
            </p>
            <p style={{ margin: 0 }}>
              If you do not agree with these Terms or the Privacy Policy, you must not access or use the Platform.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>2. About Zelp</h2>
            <p style={{ marginBottom: '0.75rem' }}>
              Zelp is a healthcare access platform that helps users discover, compare, and book diagnostic and related healthcare services (such as MRI, CT scans, X‑rays, and lab tests) from hospitals, diagnostic centers, and other healthcare providers (“Providers”). Zelp is not a hospital, clinic, diagnostic center, or healthcare provider and does not itself provide medical care, diagnostics, or emergency services.
            </p>
            <p style={{ margin: 0 }}>
              All diagnostic, medical, or ambulance services are provided solely by independent Providers with whom you may book appointments through the Platform.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>3. Eligibility</h2>
            <p style={{ marginBottom: '0.75rem' }}>To use Zelp, you must:</p>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', marginBottom: '0.75rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Be at least 18 years old, or the age of majority in your jurisdiction.</li>
              <li style={{ marginBottom: '0.5rem' }}>Have the legal capacity to enter into a binding agreement.</li>
              <li style={{ marginBottom: '0.5rem' }}>Use the Platform in compliance with applicable laws and these Terms.</li>
            </ul>
            <p style={{ margin: 0 }}>
              If you use Zelp on behalf of another person (for example, a family member), you represent that you have authority to act on their behalf and to share their personal and health information as needed.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>4. Nature of Services and Medical Disclaimer</h2>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>Zelp is an information, comparison, and booking platform for healthcare diagnostics and related services.</li>
              <li style={{ marginBottom: '0.5rem' }}>Information shown on Zelp (prices, discounts, test details, availability, ratings, distance, turnaround time, etc.) is for general informational and convenience purposes only and may not be complete, accurate, or up to date at all times.</li>
              <li style={{ marginBottom: '0.5rem' }}>Zelp does not provide medical advice, diagnosis, or treatment. All medical decisions should be taken in consultation with qualified healthcare professionals.</li>
              <li style={{ marginBottom: '0.5rem' }}>Use of the Platform does not create a doctor‑patient relationship between you and Zelp. Any doctor‑patient or provider‑patient relationship is solely between you and the Provider.</li>
              <li style={{ marginBottom: '0.5rem' }}>In case of a medical emergency, you must contact your local emergency services or nearest hospital directly. Do not rely solely on Zelp for emergency care.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>5. Account Registration and Security</h2>
            <p style={{ marginBottom: '0.75rem' }}>You may need to create an account to access certain features of the Platform, such as booking tests or viewing previous bookings. When creating an account, you agree to:</p>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', marginBottom: '0.75rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Provide accurate, current, and complete information.</li>
              <li style={{ marginBottom: '0.5rem' }}>Maintain and promptly update your information as needed.</li>
              <li style={{ marginBottom: '0.5rem' }}>Keep your login credentials confidential and not share them with others.</li>
              <li style={{ marginBottom: '0.5rem' }}>Notify Zelp immediately of any unauthorized use of your account or security breach.</li>
            </ul>
            <p style={{ margin: 0 }}>You are responsible for all activities that occur under your account.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '1rem', marginTop: 0 }}>6. Booking and Payments</h2>
            
            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#1f2937', marginTop: '1rem', marginBottom: '0.5rem' }}>6.1 Role of Zelp</h3>
            <p style={{ marginBottom: '1rem' }}>Zelp facilitates discovery of Providers, display of available slots and prices, and the booking of tests or services. The actual fulfillment of the test or service is the sole responsibility of the Provider.</p>
            
            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#1f2937', marginBottom: '0.5rem' }}>6.2 Prices, Discounts, and Availability</h3>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Prices, discounts, packages, and availability displayed on the Platform are based on information provided by Providers and may change at any time without notice.</li>
              <li style={{ marginBottom: '0.5rem' }}>Zelp does not guarantee that any price, discount, or availability shown on the Platform will be available at the time of your appointment.</li>
            </ul>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#1f2937', marginBottom: '0.5rem' }}>6.3 Booking Confirmation</h3>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>A booking is considered confirmed only when you receive a confirmation (on‑screen, email, SMS, app notification, or any combination) from Zelp.</li>
              <li style={{ marginBottom: '0.5rem' }}>Zelp reserves the right to reject or cancel any booking in case of technical issues, mispricing, Provider unavailability, suspected fraud, or any other reasonable grounds. If payment has already been made for a canceled booking, refunds (if any) will be processed as per the applicable refund policy.</li>
            </ul>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#1f2937', marginBottom: '0.5rem' }}>6.4 Payments and Refunds</h3>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Depending on your location and integration, you may pay online through the Platform or directly to the Provider at the time of service.</li>
              <li style={{ marginBottom: '0.5rem' }}>Zelp may use third‑party payment processors. Your use of such payment services may be subject to their terms and policies.</li>
              <li style={{ marginBottom: '0.5rem' }}>Zelp is not responsible for errors or unauthorized transactions caused by payment processors or banks.</li>
              <li style={{ marginBottom: '0.5rem' }}>Refund eligibility, amount, and timelines may depend on the Provider’s policy and applicable law. Zelp may facilitate communication and processing but does not guarantee the outcome.</li>
            </ul>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#1f2937', marginBottom: '0.5rem' }}>6.5 No Guarantee of Results</h3>
            <p style={{ margin: 0 }}>Zelp does not guarantee any medical outcome, test accuracy, diagnosis, or treatment results. These are the responsibility of the Provider.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>7. Ambulance and Emergency‑Related Features</h2>
            <p style={{ marginBottom: '0.75rem' }}>If Zelp integrates ambulance booking or support:</p>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>Such services are provided by independent ambulance operators or Providers, not by Zelp.</li>
              <li style={{ marginBottom: '0.5rem' }}>Response times, availability, and quality of ambulance services are outside Zelp’s control.</li>
              <li style={{ marginBottom: '0.5rem' }}>Zelp is not liable for delays, unavailability, service quality, or any harm arising from use of or inability to use ambulance services via the Platform.</li>
              <li style={{ marginBottom: '0.5rem' }}>You must still use your local emergency numbers or systems in urgent situations.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>8. User Responsibilities and Conduct</h2>
            <p style={{ marginBottom: '0.75rem' }}>You agree not to:</p>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', marginBottom: '0.75rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Use the Platform for any unlawful, fraudulent, or abusive purpose.</li>
              <li style={{ marginBottom: '0.5rem' }}>Misrepresent your identity, medical condition, or any information required for booking.</li>
              <li style={{ marginBottom: '0.5rem' }}>Interfere with or disrupt the Platform or networks connected to it.</li>
              <li style={{ marginBottom: '0.5rem' }}>Attempt to gain unauthorized access to the Platform or other users’ accounts.</li>
              <li style={{ marginBottom: '0.5rem' }}>Copy, modify, distribute, or reverse engineer any part of the Platform, except as permitted by law.</li>
              <li style={{ marginBottom: '0.5rem' }}>Post or transmit content that is defamatory, obscene, hateful, infringing, or otherwise objectionable.</li>
            </ul>
            <p style={{ margin: 0 }}>Zelp may suspend or terminate your access if you violate these Terms or if your use poses a risk to the Platform, Providers, or other users.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>9. Provider Information, Ratings, and Reviews</h2>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>Provider profiles, ratings, reviews, and other information may be based on data from Providers, users, or third parties.</li>
              <li style={{ marginBottom: '0.5rem' }}>Zelp does not endorse any specific Provider or guarantee the accuracy, completeness, or reliability of such information.</li>
              <li style={{ marginBottom: '0.5rem' }}>Any ratings or reviews are personal opinions and should not be taken as medical advice or a guarantee of quality.</li>
              <li style={{ marginBottom: '0.5rem' }}>If you submit a review or feedback, you grant Zelp a non‑exclusive, worldwide, royalty‑free license to use, display, and distribute such content in connection with the Platform.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>10. Intellectual Property</h2>
            <p style={{ marginBottom: '0.75rem' }}>All content and materials on the Platform, including but not limited to text, logos, graphics, icons, interfaces, images, software, and underlying technology, are owned by or licensed to Zelp and are protected by applicable intellectual property laws.</p>
            <p style={{ marginBottom: '0.75rem' }}>You are granted a limited, non‑exclusive, non‑transferable, revocable license to access and use the Platform for personal, non‑commercial purposes, subject to these Terms.</p>
            <p style={{ margin: 0 }}>You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any part of the Platform without prior written consent from Zelp.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>11. Data Protection and Privacy</h2>
            <p style={{ marginBottom: '0.75rem' }}>Zelp’s collection, use, and sharing of personal data, including sensitive health‑related information, are governed by our Privacy Policy.</p>
            <p style={{ margin: 0 }}>By using Zelp, you consent to the collection and use of your information as described in the Privacy Policy.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>12. Third‑Party Services and Links</h2>
            <p style={{ marginBottom: '0.75rem' }}>The Platform may contain links to third‑party websites, apps, or services, or may allow integration with third‑party tools (such as maps, payment gateways, communication tools, or ambulance providers). Zelp does not control and is not responsible for:</p>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', marginBottom: '0.75rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Content, privacy practices, or security of third‑party services.</li>
              <li style={{ marginBottom: '0.5rem' }}>Any acts, omissions, or policies of third‑party service providers.</li>
            </ul>
            <p style={{ margin: 0 }}>Your use of third‑party services is at your own risk and subject to their separate terms.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>13. Disclaimers</h2>
            <p style={{ marginBottom: '0.75rem' }}>To the maximum extent permitted by law:</p>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>The Platform is provided on an “as is” and “as available” basis without warranties of any kind, whether express, implied, or statutory.</li>
              <li style={{ marginBottom: '0.5rem' }}>Zelp disclaims all implied warranties of merchantability, fitness for a particular purpose, non‑infringement, and accuracy.</li>
              <li style={{ marginBottom: '0.5rem' }}>Zelp does not warrant that the Platform will be uninterrupted, secure, error‑free, or free from viruses or other harmful components.</li>
              <li style={{ marginBottom: '0.5rem' }}>Zelp does not warrant or guarantee the quality, safety, accuracy, reliability, or timeliness of services provided by Providers.</li>
              <li style={{ marginBottom: '0.5rem' }}>You use the Platform and any services booked through it at your own risk.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>14. Limitation of Liability</h2>
            <p style={{ marginBottom: '0.75rem' }}>To the maximum extent permitted by law:</p>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>Zelp shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, goodwill, or other intangible losses arising from or related to your use of the Platform or services booked through it.</li>
              <li style={{ marginBottom: '0.5rem' }}>Zelp’s total aggregate liability arising out of or in connection with these Terms or the use of the Platform shall not exceed the amount you paid to Zelp (if any) for the service giving rise to the claim in the three (3) months preceding the event.</li>
              <li style={{ marginBottom: '0.5rem' }}>Nothing in these Terms limits or excludes liability that cannot be limited or excluded under applicable law (for example, for gross negligence or intentional misconduct).</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>15. Indemnification</h2>
            <p style={{ marginBottom: '0.75rem' }}>You agree to indemnify, defend, and hold harmless Zelp, its affiliates, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorney fees) arising out of or related to:</p>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>Your use of the Platform or services booked through it.</li>
              <li style={{ marginBottom: '0.5rem' }}>Your violation of these Terms or any applicable law.</li>
              <li style={{ marginBottom: '0.5rem' }}>Your infringement of any rights of any third party, including Providers or other users.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>16. Changes to the Platform and Terms</h2>
            <p style={{ marginBottom: '0.75rem' }}>Zelp may modify, suspend, or discontinue any part of the Platform at any time, with or without notice.</p>
            <p style={{ margin: 0 }}>Zelp may update these Terms from time to time. Updated Terms will be effective when posted on the Platform or otherwise communicated to you. Your continued use of the Platform after changes become effective constitutes your acceptance of the updated Terms.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>17. Termination</h2>
            <p style={{ marginBottom: '0.75rem' }}>Zelp may suspend or terminate your access to the Platform, with or without notice, if:</p>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', marginBottom: '0.75rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>You violate these Terms or applicable law.</li>
              <li style={{ marginBottom: '0.5rem' }}>We suspect fraudulent or abusive activity.</li>
              <li style={{ marginBottom: '0.5rem' }}>It is required for security, legal, or operational reasons.</li>
            </ul>
            <p style={{ marginBottom: '0.75rem' }}>You may stop using the Platform and request account deletion at any time, subject to our need to retain certain data for legal or legitimate business purposes (as described in the Privacy Policy).</p>
            <p style={{ margin: 0 }}>Sections that by their nature should survive termination (including but not limited to Intellectual Property, Disclaimers, Limitation of Liability, Indemnification, and Governing Law) will survive termination.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>18. Governing Law and Dispute Resolution</h2>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.</li>
              <li style={{ marginBottom: '0.5rem' }}>Any disputes arising out of or in connection with these Terms or the Platform shall be subject to the exclusive jurisdiction of the courts located in Indore, Madhya Pradesh, India.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>19. Contact Information</h2>
            <p style={{ marginBottom: '0.5rem' }}>If you have any questions about these Terms, you can contact us at:</p>
            <ul style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb', listStyleType: 'none', margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}><span style={{ fontWeight: 600, color: '#1f2937' }}>Email:</span> <a href="mailto:urvaksh@tryzelp.app" style={{ color: '#2563eb', textDecoration: 'none' }}>urvaksh@tryzelp.app</a></li>
              <li style={{ margin: 0 }}><span style={{ fontWeight: 600, color: '#1f2937' }}>Address:</span> Indore, Madhya Pradesh</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
