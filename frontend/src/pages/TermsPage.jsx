import { Card } from '../components/ui/Card';

export const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-5xl sm:text-6xl text-white uppercase mb-8" style={{ textShadow: '4px 4px 0px #000' }}>
        Terms <span className="text-primary">of Service</span>
      </h1>

      <Card className="bg-white border-4 mb-8">
        <p className="text-sm font-bold text-gray-500 mb-6">Last Updated: May 10, 2026</p>

        <h2 className="text-2xl uppercase mb-4 font-black">1. Acceptance of Terms</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          By accessing or using CampusVault, you agree to be bound by these Terms of Service. If you do not
          agree with any part of these terms, you must not use the platform. CampusVault reserves the right
          to update these terms at any time, with changes effective upon posting.
        </p>

        <h2 className="text-2xl uppercase mb-4 font-black">2. Eligibility</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          CampusVault is designed for <span className="bg-secondary px-1 border border-black text-black">university students and faculty</span>.
          By registering, you confirm that you are affiliated with a recognized educational institution and
          are at least 18 years of age.
        </p>

        <h2 className="text-2xl uppercase mb-4 font-black">3. User Accounts</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          You are responsible for:
        </p>
        <ul className="list-disc list-inside text-gray-700 font-bold mb-6 space-y-2 pl-4">
          <li>Maintaining the confidentiality of your account credentials</li>
          <li>All activities that occur under your account</li>
          <li>Providing accurate and truthful information during registration</li>
          <li>Notifying us immediately of any unauthorized account access</li>
        </ul>

        <h2 className="text-2xl uppercase mb-4 font-black">4. Listing & Rental Rules</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          When listing items on CampusVault, you agree to:
        </p>
        <ul className="list-disc list-inside text-gray-700 font-bold mb-6 space-y-2 pl-4">
          <li>Only list items you legally own or are authorized to rent</li>
          <li>Provide accurate descriptions, images, and pricing in PKR</li>
          <li>Maintain items in the stated condition</li>
          <li>Honor confirmed bookings unless cancelled within the allowed window</li>
          <li>Not list prohibited items (weapons, hazardous materials, counterfeit goods, etc.)</li>
        </ul>

        <h2 className="text-2xl uppercase mb-4 font-black">5. Booking & Payments</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          CampusVault facilitates peer-to-peer rental agreements. All bookings are subject to host approval.
          Payment terms and exchange methods are agreed upon between the renter and host. CampusVault does
          not process payments directly and is not liable for payment disputes between users.
        </p>

        <h2 className="text-2xl uppercase mb-4 font-black">6. Trust Score System</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Your Trust Score reflects your reliability on the platform. It is calculated based on completed
          transactions, reviews received, and cancellation history. Users with Trust Scores below the
          platform minimum may face restrictions. Manipulation of the Trust Score system is strictly prohibited
          and grounds for immediate suspension.
        </p>

        <h2 className="text-2xl uppercase mb-4 font-black">7. Prohibited Conduct</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Users must not:
        </p>
        <ul className="list-disc list-inside text-gray-700 font-bold mb-6 space-y-2 pl-4">
          <li>Use the platform for any illegal or unauthorized purpose</li>
          <li>Post false, misleading, or fraudulent listings</li>
          <li>Harass, threaten, or abuse other users</li>
          <li>Attempt to circumvent platform security or authentication</li>
          <li>Scrape, crawl, or extract data from CampusVault without permission</li>
          <li>Create multiple accounts to manipulate ratings or avoid bans</li>
        </ul>

        <h2 className="text-2xl uppercase mb-4 font-black">8. Content Moderation</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          CampusVault administrators reserve the right to flag, suspend, or remove any listing that violates
          these terms or community guidelines. Users whose listings are flagged will be notified and may
          appeal the decision. Repeated violations may result in permanent account suspension.
        </p>

        <h2 className="text-2xl uppercase mb-4 font-black">9. Limitation of Liability</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          CampusVault is provided "as is" without warranties of any kind. We are not responsible for the
          quality, safety, or legality of listed items, the accuracy of listings, or the ability of users
          to complete transactions. Users engage in rental agreements at their own risk.
        </p>

        <h2 className="text-2xl uppercase mb-4 font-black">10. Termination</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          We may suspend or terminate your account at any time for violations of these terms. You may also
          delete your account at any time by contacting support. Upon termination, your right to use
          CampusVault ceases immediately, though certain provisions (liability, disputes) survive.
        </p>

        <h2 className="text-2xl uppercase mb-4 font-black">11. Contact</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          For questions about these Terms of Service, reach out to{' '}
          <span className="text-primary font-black">legal@campusvault.com</span>.
        </p>
      </Card>
    </div>
  );
};
