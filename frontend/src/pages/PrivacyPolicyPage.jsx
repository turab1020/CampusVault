import { Card } from '../components/ui/Card';

export const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-5xl sm:text-6xl text-white uppercase mb-8" style={{ textShadow: '4px 4px 0px #000' }}>
        Privacy <span className="text-primary">Policy</span>
      </h1>

      <Card className="bg-white border-4 mb-8">
        <p className="text-sm font-bold text-gray-500 mb-6">Last Updated: May 10, 2026</p>

        <h2 className="text-2xl uppercase mb-4 font-black">1. Information We Collect</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          When you create an account on CampusVault, we collect information you provide directly, including:
        </p>
        <ul className="list-disc list-inside text-gray-700 font-bold mb-6 space-y-2 pl-4">
          <li>Full name and campus email address</li>
          <li>Account credentials (password is stored as an encrypted hash)</li>
          <li>Profile information and avatar images</li>
          <li>Listing details, images, and descriptions you post</li>
          <li>Booking and transaction history</li>
        </ul>

        <h2 className="text-2xl uppercase mb-4 font-black">2. How We Use Your Information</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          We use collected information to:
        </p>
        <ul className="list-disc list-inside text-gray-700 font-bold mb-6 space-y-2 pl-4">
          <li>Operate and maintain the CampusVault marketplace</li>
          <li>Process rental transactions between users</li>
          <li>Calculate and display Trust Scores</li>
          <li>Send important account and transaction notifications</li>
          <li>Enforce our Terms of Service and community guidelines</li>
          <li>Improve and personalize your experience</li>
        </ul>

        <h2 className="text-2xl uppercase mb-4 font-black">3. Data Sharing</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          CampusVault does <span className="bg-secondary px-1 border border-black text-black">not sell your personal data</span> to
          third parties. We share limited information only when necessary to facilitate peer-to-peer transactions
          (e.g., a renter seeing a listing host's name) or when required by law.
        </p>

        <h2 className="text-2xl uppercase mb-4 font-black">4. Data Security</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          We implement industry-standard security measures including password hashing with BCrypt, JWT-based
          authentication tokens, and HTTPS encryption for all data in transit. However, no method of transmission
          over the internet is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl uppercase mb-4 font-black">5. Cookies & Local Storage</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          CampusVault uses browser local storage to maintain your authentication session. We do not use
          third-party tracking cookies. Your session token is stored locally and sent with each API request
          to verify your identity.
        </p>

        <h2 className="text-2xl uppercase mb-4 font-black">6. Your Rights</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          You have the right to:
        </p>
        <ul className="list-disc list-inside text-gray-700 font-bold mb-6 space-y-2 pl-4">
          <li>Access and view all personal data we hold about you</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your account and associated data</li>
          <li>Withdraw consent for data processing at any time</li>
        </ul>

        <h2 className="text-2xl uppercase mb-4 font-black">7. Data Retention</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          We retain your account data for as long as your account is active. Booking and transaction records
          may be retained for up to 2 years after account closure for audit and dispute resolution purposes.
        </p>

        <h2 className="text-2xl uppercase mb-4 font-black">8. Contact Us</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          For any privacy-related inquiries or requests, contact us at{' '}
          <span className="text-primary font-black">privacy@campusvault.com</span>.
        </p>
      </Card>
    </div>
  );
};
