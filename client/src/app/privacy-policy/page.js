import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Zelp",
  description: "Review the Zelp Privacy Policy to learn how we collect, use, share, and protect your personal information and health data when using our healthcare platform.",
};

export default function PrivacyPolicy() {
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
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#111827', letterSpacing: '-0.025em', margin: '0 0 0.5rem 0' }}>Privacy Policy</h1>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Last Updated: 07 March 2026</p>
        </div>

        <div style={{ color: '#374151', lineHeight: '1.7', fontSize: '1.1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>1. Introduction</h2>
            <p style={{ marginBottom: '0.75rem' }}>
              This Privacy Policy explains how Zelp (“we”, “us”, or “our”) collects, uses, shares, and protects information about users (“you”) when you use our website, mobile applications, and related services (collectively, the “Platform”).
            </p>
            <p style={{ marginBottom: '0.75rem' }}>
              By using the Platform, you consent to the collection and use of your information as described in this Privacy Policy.
              If you do not agree, please do not use the Platform.
            </p>
            <p style={{ margin: 0 }}>
              If required by law, we will obtain your explicit consent for processing sensitive personal data, including health‑related information.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '1rem', marginTop: 0 }}>2. Information We Collect</h2>
            <p style={{ marginBottom: '0.75rem' }}>We may collect the following categories of information:</p>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#1f2937', marginTop: '1rem', marginBottom: '0.5rem' }}>2.1 Information You Provide</h3>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Account details:</strong> Name, mobile number, email address, password, age, gender, and other profile information.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Booking details:</strong> Tests or services you book (e.g., MRI, CT, X‑ray, lab tests), preferred dates and time slots, Provider selected, location for home collection if applicable.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Health‑related information:</strong> Limited clinical details necessary for the test (such as doctor’s prescription, suspected condition, prior diagnostic history, allergies, pregnancy status if relevant, etc.), to the extent required by Providers or law.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Payment information:</strong> Payment method, transaction details, and billing information (actual card or UPI details may be handled by a secure payment gateway and not stored by us, depending on integration).</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Communications and support:</strong> Messages, emails, calls, or other communications with us or through the Platform (including chat with Providers if available), feedback, reviews, and survey responses.</li>
            </ul>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#1f2937', marginBottom: '0.5rem' }}>2.2 Information Collected Automatically</h3>
            <p style={{ marginBottom: '0.75rem' }}>When you use the Platform, we may automatically collect:</p>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Device and usage information:</strong> IP address, device identifiers, operating system, browser type, app version, pages viewed, actions taken, date and time of visits, crash logs, and performance data.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Location information:</strong> Approximate or precise location based on GPS, Wi‑Fi, or network, when you allow location access, to show nearby hospitals/diagnostic centers and improve search results.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Cookies and similar technologies:</strong> We may use cookies, pixels, and similar technologies to recognize you, remember preferences, and track Platform usage.</li>
            </ul>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#1f2937', marginBottom: '0.5rem' }}>2.3 Information from Third Parties</h3>
            <p style={{ marginBottom: '0.75rem' }}>We may receive information about you from:</p>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Providers:</strong> Information about tests you underwent, appointments, reports, or services, limited to what is required to provide the Platform services.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Payment processors:</strong> Payment confirmation, status, and identifiers.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Partners or affiliates:</strong> If you access Zelp via a partner integration or campaign.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>3. How We Use Your Information</h2>
            <p style={{ marginBottom: '0.75rem' }}>We use your information for the following purposes:</p>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', marginBottom: '0.75rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>To operate and provide the Platform:</strong> Enable account creation, login, test discovery, price comparison, slot viewing, and booking flow.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>To process bookings and payments:</strong> Confirm appointments, send booking details to Providers, process payments and refunds, and send confirmations or receipts.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>To communicate with you:</strong> Send notifications about bookings, reminders, test preparation instructions (if provided by Providers), reports availability, account updates, and security alerts.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>To provide ambulance and emergency‑related coordination (if available):</strong> Share essential information with ambulance Providers to enable faster response.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>To personalize and improve the Platform:</strong> Show relevant Providers, offers, or information based on your location, usage patterns, and preferences; perform analytics, A/B testing, and research to improve features and performance.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>To ensure safety, security, and legal compliance:</strong> Detect and prevent fraud, misuse, or security incidents; comply with legal obligations and regulatory requirements; enforce our Terms.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>For marketing and promotions (where permitted):</strong> Inform you about offers, discounts, new features, or health check packages, subject to your communication preferences and applicable law.</li>
            </ul>
            <p style={{ margin: 0 }}>We will not use your sensitive health data for purposes incompatible with the purposes described above without obtaining additional consent where required.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>4. Legal Bases for Processing (where applicable)</h2>
            <p style={{ marginBottom: '0.75rem' }}>Depending on your jurisdiction (for example, under GDPR in the EU/EEA), our legal bases for processing your personal data may include:</p>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Performance of a contract:</strong> To provide you with the services you request (e.g., booking diagnostics).</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Legitimate interests:</strong> To improve our services, prevent fraud, and ensure security, provided these interests are not overridden by your rights.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Consent:</strong> For certain uses of location data, cookies, marketing communications, and processing of sensitive health information, where required by law.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Legal obligations:</strong> To comply with applicable laws and regulatory requirements.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '1rem', marginTop: 0 }}>5. How We Share Your Information</h2>
            <p style={{ marginBottom: '0.75rem' }}>We may share your information with:</p>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#1f2937', marginTop: '1rem', marginBottom: '0.5rem' }}>5.1 Healthcare Providers</h3>
            <p style={{ marginBottom: '0.75rem' }}>We share relevant information with Providers to complete your booking and enable them to provide services, such as:</p>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', marginBottom: '0.75rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Your name, contact details, and booking details.</li>
              <li style={{ marginBottom: '0.5rem' }}>Relevant health information and prescriptions required for the test or service.</li>
              <li style={{ marginBottom: '0.5rem' }}>Any instructions or notes you provide for the appointment.</li>
            </ul>
            <p style={{ marginBottom: '1rem' }}>Providers are independent entities and may have their own privacy policies and legal obligations.</p>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#1f2937', marginBottom: '0.5rem' }}>5.2 Ambulance and Emergency Partners</h3>
            <p style={{ marginBottom: '1rem' }}>If you request ambulance or emergency coordination through Zelp (where offered), we may share essential details (name, contact number, pickup location, reason for request) with ambulance operators or emergency partners to facilitate response.</p>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#1f2937', marginBottom: '0.5rem' }}>5.3 Service Providers and Vendors</h3>
            <p style={{ marginBottom: '0.75rem' }}>We may engage third‑party companies to support our operations, including:</p>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', marginBottom: '0.75rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Cloud hosting and data storage.</li>
              <li style={{ marginBottom: '0.5rem' }}>Payment processing.</li>
              <li style={{ marginBottom: '0.5rem' }}>SMS, email, and push notification services.</li>
              <li style={{ marginBottom: '0.5rem' }}>Analytics, crash reporting, and security services.</li>
              <li style={{ marginBottom: '0.5rem' }}>Customer support and communication tools.</li>
            </ul>
            <p style={{ marginBottom: '1rem' }}>These service providers are allowed to process your data only to perform services on our behalf and are bound by contractual obligations to protect your data.</p>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#1f2937', marginBottom: '0.5rem' }}>5.4 Corporate Transactions</h3>
            <p style={{ marginBottom: '1rem' }}>In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred as part of that transaction, subject to applicable laws and continued protection of your privacy.</p>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#1f2937', marginBottom: '0.5rem' }}>5.5 Legal and Compliance</h3>
            <p style={{ marginBottom: '0.75rem' }}>We may disclose your information:</p>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', marginBottom: '0.75rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>If required by law, regulation, legal process, or governmental request.</li>
              <li style={{ marginBottom: '0.5rem' }}>To enforce our Terms of Service, protect our rights, privacy, safety, or property, and that of users, Providers, or the public.</li>
              <li style={{ marginBottom: '0.5rem' }}>To investigate and prevent fraud, abuse, or security incidents.</li>
            </ul>
            <p style={{ margin: 0 }}>We do not sell your personal data in the traditional sense. If in any jurisdiction “sale” includes certain sharing for advertising, we will comply with applicable opt‑out requirements.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>6. Data Retention</h2>
            <p style={{ marginBottom: '0.75rem' }}>We retain your information for as long as necessary to:</p>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', marginBottom: '0.75rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Provide the services you have requested.</li>
              <li style={{ marginBottom: '0.5rem' }}>Comply with legal, accounting, or reporting obligations (for example, medical record retention rules that may apply to Providers).</li>
              <li style={{ marginBottom: '0.5rem' }}>Resolve disputes and enforce our agreements.</li>
            </ul>
            <p style={{ marginBottom: '0.75rem' }}>We may retain de‑identified or aggregated data (which no longer identifies you) for analytics, research, and business purposes.</p>
            <p style={{ margin: 0 }}>When your personal data is no longer required, we will delete or securely anonymize it, subject to backups and applicable laws.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>7. Data Security</h2>
            <p style={{ marginBottom: '0.75rem' }}>We use appropriate technical and organizational measures to protect your data against unauthorized access, loss, misuse, or alteration, such as:</p>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', marginBottom: '0.75rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Encryption in transit (e.g., HTTPS/SSL).</li>
              <li style={{ marginBottom: '0.5rem' }}>Access controls and authentication.</li>
              <li style={{ marginBottom: '0.5rem' }}>Limited access to personal data on a need‑to‑know basis.</li>
              <li style={{ marginBottom: '0.5rem' }}>Monitoring and logging of critical systems.</li>
            </ul>
            <p style={{ margin: 0 }}>However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security. You are responsible for keeping your account credentials safe.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>8. Your Rights and Choices</h2>
            <p style={{ marginBottom: '0.75rem' }}>Depending on your jurisdiction, you may have some or all of the following rights, subject to legal limitations:</p>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', marginBottom: '0.75rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Right to access:</strong> Request a copy of the personal data we hold about you.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Right to rectification:</strong> Request correction of inaccurate or incomplete data.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Right to deletion:</strong> Request deletion of your personal data, subject to legal and legitimate business requirements.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Right to restriction:</strong> Restrict certain processing in specific circumstances.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Right to data portability:</strong> Receive your data in a structured, commonly used format and transmit it to another controller where technically feasible.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Right to withdraw consent:</strong> Withdraw consent for processing based on consent (such as certain marketing or health data uses).</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Right to object:</strong> Object to certain processing, including direct marketing.</li>
            </ul>
            <p style={{ marginBottom: '0.75rem' }}>You may exercise these rights by contacting us using the details in the “Contact Us” section. We may need to verify your identity before fulfilling your request.</p>
            
            <p style={{ marginBottom: '0.75rem' }}>You can also:</p>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>Manage notifications (email/SMS/push) via app settings or unsubscribe links.</li>
              <li style={{ marginBottom: '0.5rem' }}>Enable or disable location access via your device settings.</li>
              <li style={{ marginBottom: '0.5rem' }}>Manage cookies through your browser settings (where applicable).</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>9. Children’s Privacy</h2>
            <p style={{ marginBottom: '0.75rem' }}>Zelp is not intended for use by children under the age at which they can lawfully consent to data processing in their jurisdiction without parental consent.</p>
            <p style={{ marginBottom: '0.75rem' }}>If you are a parent/guardian and believe that your child has provided personal information to us without your consent, please contact us so we can take appropriate action, including deletion where required.</p>
            <p style={{ margin: 0 }}>Bookings for minors may be made by parents or legal guardians, and any data processed for such bookings will be handled in accordance with this Policy and applicable law.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>10. International Data Transfers</h2>
            <p style={{ marginBottom: '0.75rem' }}>If we transfer your data outside your country (for example, to cloud providers in another jurisdiction), we will ensure that appropriate safeguards are in place, such as:</p>
            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', marginBottom: '0.75rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Contractual protections (e.g., standard contractual clauses).</li>
              <li style={{ marginBottom: '0.5rem' }}>Transfers to jurisdictions deemed to provide adequate protection.</li>
            </ul>
            <p style={{ margin: 0 }}>Specific legal mechanisms will depend on your location and applicable regulations.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>11. Third‑Party Websites and Apps</h2>
            <p style={{ marginBottom: '0.75rem' }}>The Platform may link to websites, apps, or services that are not operated by Zelp.</p>
            <p style={{ margin: 0 }}>We are not responsible for the privacy practices or content of third‑party sites. We encourage you to review the privacy policies of any third‑party services you use.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>12. Changes to This Privacy Policy</h2>
            <p style={{ marginBottom: '0.75rem' }}>We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors.</p>
            <p style={{ margin: 0 }}>When we make changes, we will update the “Last Updated” date and, where required by law, notify you via the Platform, email, or other appropriate means. Your continued use of the Platform after the updated Policy becomes effective constitutes your acceptance of the changes.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: 0 }}>13. Contact Us</h2>
            <p style={{ marginBottom: '0.5rem' }}>If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, you can contact us at:</p>
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
