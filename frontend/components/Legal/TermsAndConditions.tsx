export default function TermsAndConditions() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>
            <div className="text-gray-700 space-y-4">
                <p>Welcome to <strong>KreativeCloud</strong>. This platform is a personal development project designed for hosting and managing web apps and databases. By accessing this service, you acknowledge its experimental nature and agree to the following terms.</p>

                <h2 className="text-2xl font-semibold mt-6">1. Acceptance of Terms</h2>
                <p>By using this platform, you agree to these terms in full. If you disagree with any part, you must cease use of the service immediately.</p>

                <h2 className="text-2xl font-semibold mt-6">2. Development & Showcase Status</h2>
                <p>
                    <strong>This is a development project and a technical showcase.</strong> It is not a commercial-grade hosting provider. The service is provided &quot;as-is&quot; and may be taken offline, modified, or reset at any time without prior notice for maintenance or development purposes.
                </p>

                <h2 className="text-2xl font-semibold mt-6">3. User Accounts & Security</h2>
                <p>Users are responsible for maintaining the confidentiality of their account credentials. You must notify the administrator immediately if you suspect any unauthorized access to your account.</p>

                <h2 className="text-2xl font-semibold mt-6">4. Hosting & Content Responsibility</h2>
                <p>
                    You are permitted to host web apps and databases. You retain ownership of your content, but you grant this platform the right to host it.
                    <strong>All hosted content must be legal.</strong> We reserve the right to remove any content that is deemed harmful, illegal, or places an excessive load on the server.
                </p>

                <h2 className="text-2xl font-semibold mt-6">5. Data Loss & Backups</h2>
                <p>
                    <strong>We provide no guarantee of data persistence.</strong> Because this is a development environment, databases or files may be wiped during updates. Users are 100% responsible for maintaining their own external backups of all code and data.
                </p>

                <h2 className="text-2xl font-semibold mt-6">6. Prohibited Activities</h2>
                <p>Users must not:</p>
                <ul className="list-disc list-inside ml-4">
                    <li>Engage in activities that disrupt the platform’s stability (e.g., DDoS, crypto mining).</li>
                    <li>Use the platform for phishing, malware distribution, or illegal activities.</li>
                    <li>Attempt to bypass security measures or access other users&apos; data.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6">7. Limitation of Liability</h2>
                <p>
                    To the maximum extent permitted by law, the developer of this platform is not liable for any direct, indirect, or incidental damages, including but not limited to <strong>loss of data, loss of profits, or service downtime</strong>, resulting from the use of this project.
                </p>

                <h2 className="text-2xl font-semibold mt-6">8. Termination</h2>
                <p>We reserve the right to suspend or terminate access to any user at our sole discretion, especially in cases of resource abuse or violation of these terms.</p>

                <h2 className="text-2xl font-semibold mt-6">9. Contact Information</h2>
                <p>For questions or to report issues, please contact the administrator at me@johny.codes.</p>

                <hr className="my-8 border-gray-300" />
                <p className="italic">By using this platform, you acknowledge that you understand this is a showcase project and not a high-availability production environment.</p>
            </div>
        </div>
    );
}
