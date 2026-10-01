import React from 'react';
import Header from './Header';
import Footer from './Footer';

const PolicyPageEN = ({ onOpenModal }) => {
  return (
    <div className="app-container">
      <Header onOpenModal={onOpenModal} />
      <main style={{ paddingTop: '120px', paddingBottom: '40px', minHeight: 'calc(100vh - 200px)', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left', color: 'var(--text-main)', padding: '0 1.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '2rem' }}>
            Privacy Policy and Personal Data Processing
          </h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', lineHeight: '1.6', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            <p>
              This privacy policy and personal data processing policy governs the procedure for collecting and using personal and other data of the site "BusinessFirst" LLP (hereinafter - Operator). The current version of this Privacy Policy is constantly available for review, and is located on the Internet at: <a href="https://res2027expo.kz/" style={{color: 'var(--bg-dark-green)', textDecoration: 'underline'}}>https://res2027expo.kz/</a>
            </p>
            <p>
              By transmitting personal and other data to the Operator through the Site, the User confirms their consent to the use of such data on the terms set out in this Privacy Policy.
            </p>
            <p>
              If the User does not agree with the terms of this Privacy Policy, they must immediately stop using the Site.
            </p>
            <p>
              The beginning of the use of the Site by the User constitutes unconditional acceptance of this Privacy Policy.
            </p>

            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1rem', color: 'var(--text-main)' }}>1. TERMS</h3>
            <p>1.1. Site - the website located on the Internet at <a href="https://res2027expo.kz/" style={{color: 'var(--bg-dark-green)', textDecoration: 'underline'}}>https://res2027expo.kz/</a><br/>
              All exclusive rights to the Site and its individual elements (including software, design) belong to the Operator in full. The transfer of exclusive rights to the User is not a subject of this Privacy Policy.<br/>
              1.2. User — a person using the Site.<br/>
              1.3. Legislation — the current legislation of the Republic of Kazakhstan.<br/>
              1.4. Personal data — the personal data of the User, which the User independently provides during registration or during the use of the Site's functions.<br/>
              1.5. Data — other data about the User (not included in the definition of Personal data).<br/>
              1.6. Registration — filling in by the User of the Registration Form located on the Site by specifying the necessary information and submitting scanned documents.<br/>
              1.7. Registration Form — the form located on the Site, which the User must fill out to be able to use the Site in full.<br/>
              1.8. Service(s) — services provided by the Operator on the basis of an agreement.
            </p>

            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1rem', color: 'var(--text-main)' }}>2. COLLECTION AND PROCESSING OF PERSONAL DATA</h3>
            <p>2.1. The Operator collects and stores only the Personal data that is necessary for the provision of Services by the Operator and interaction with the User.<br/>
              2.2. Personal data may be used for the following purposes:<br/>
              2.2.1 provision of Services to the User;<br/>
              2.2.2 identification of the User;<br/>
              2.2.3 interaction with the User;<br/>
              2.2.4 sending promotional materials, information, and requests to the User;<br/>
              2.2.5 conducting statistical and other research;<br/>
              2.3. The Operator processes the following data, among others:<br/>
              2.3.1 surname, first name, and patronymic;<br/>
              2.3.2 email address;<br/>
              2.3.3 phone number (including mobile).<br/>
              2.4. The User is prohibited from entering the personal data of third parties on the Site (except when representing the interests of these parties and having documentary evidence of their consent to perform such actions).
            </p>

            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1rem', color: 'var(--text-main)' }}>3. PROCEDURE FOR PROCESSING PERSONAL AND OTHER DATA</h3>
            <p>3.1. The Operator undertakes to use Personal data in accordance with the Law "On Personal Data" of the Republic of Kazakhstan and internal documents of the Operator.<br/>
              3.2. Confidentiality is maintained with regard to Personal data and other Data of the User, except in cases where such data is publicly available.<br/>
              3.3. The Operator has the right to keep an archive copy of Personal data. The Operator has the right to store Personal data and Data on servers outside the Republic of Kazakhstan.<br/>
              3.4. The Operator has the right to transfer Personal data and Data of the User without the User's consent to the following parties:<br/>
              3.4.1 to state authorities, including bodies of inquiry and investigation, and local self-government bodies upon their reasoned request;<br/>
              3.4.2 in other cases directly stipulated by the current legislation of the Republic of Kazakhstan.<br/>
              3.5. The Operator has the right to transfer Personal data and Data to third parties not specified in clause 3.4. of this Privacy Policy, in the following cases:<br/>
              3.5.1 The User has expressed their consent to such actions;<br/>
              3.5.2 The transfer is necessary as part of the User's use of the Site or the provision of Services to the User;<br/>
              3.6. The Operator carries out automated processing of Personal data and Data.
            </p>

            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1rem', color: 'var(--text-main)' }}>4. PROTECTION OF PERSONAL DATA</h3>
            <p>4.1. The Operator ensures appropriate protection of Personal and other data in accordance with the Legislation and takes necessary and sufficient organizational and technical measures to protect Personal data.<br/>
              4.2. The security measures implemented help protect Personal data from unauthorized or accidental access, destruction, alteration, blocking, copying, distribution, as well as from other unlawful actions with them by third parties.
            </p>

            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1rem', color: 'var(--text-main)' }}>5. OTHER PROVISIONS</h3>
            <p>5.1. The law of the Republic of Kazakhstan shall apply to this Privacy Policy and the relations between the User and the Operator arising in connection with its application.<br/>
              5.2. All potential disputes arising out of this Agreement shall be resolved in accordance with current legislation at the place of registration of the Operator. Before going to court, the User must observe the mandatory pre-trial procedure and send the Operator a corresponding claim in writing. The response time to a claim is 30 (thirty) business days.<br/>
              5.3. If for one reason or another, one or more provisions of the Privacy Policy are recognized as invalid or unenforceable, this does not affect the validity or applicability of the remaining provisions of the Privacy Policy.<br/>
              5.4. The Operator has the right to unilaterally change the Privacy Policy (in whole or in part) at any time without prior agreement with the User. All changes become effective from the moment of their posting on the Site.<br/>
              5.5. The User is obliged to independently monitor changes to the Privacy Policy by reviewing the current version.<br/>
              5.6. All suggestions or questions regarding this Privacy Policy should be reported by e-mail <a href="mailto:office@res2026expo.kz" style={{color: 'var(--bg-dark-green)', textDecoration: 'underline'}}>office@res2026expo.kz</a> or by phone: +7 775 026 66 88.
            </p>
          </div>
        </div>
      </main>
      <Footer onOpenModal={onOpenModal} />
    </div>
  );
};

export default PolicyPageEN;
