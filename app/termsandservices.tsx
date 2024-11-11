import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function TermsOfServiceScreen() {
  const router = useRouter();

  const handleAccept = () => {
    // In a real app, you would typically store the user's acceptance
    // of the terms of service in your backend or local storage
    console.log("Terms of Service accepted");
    router.replace("/create-profile"); // Navigate to the create profile screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Terms of Service</Text>

        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.paragraph}>
          1.1 Platform Overview: This online marketplace allows registered users
          (referred to as "Users") and specific third parties who rent parking
          spaces (referred to as "Hosts") to post these spaces on the Platform
          ("Listings") and to interact and do business directly with Users who
          are looking to rent spaces (referred to as "Guests"). Rentals of
          different kinds of parking spaces for brief or long periods of time
          may be included in listings.
        </Text>
        <Text style={styles.paragraph}>
          1.2 The Platform's Function: As the Platform provider, we do not
          function as a broker or insurer, nor do we own, develop, sell, resell,
          furnish, control, manage, offer, deliver, or supply any Listings. For
          their listings and services, hosts bear full responsibility. Users are
          directly entering into a contract with one another when they create or
          accept a reservation.
        </Text>
        <Text style={styles.paragraph}>
          1.3 Responsibility and Liability: The Platform has no control over and
          makes no guarantees regarding (i) the existence, quality, safety,
          suitability, or legality of any Listings; (ii) the accuracy of any
          Listing descriptions, reviews, or other User-generated content; or
          (iii) the performance or conduct of any User or third party, even
          though we may assist in resolving disputes.
        </Text>
        <Text style={styles.paragraph}>
          1.4 Independent Relationship: If you decide to utilize the Platform as
          a Host, you will only have an independent, third-party contractor
          relationship with the Platform; you will not be an employee, agent,
          joint venturer, or partner of the Platform in any way.
        </Text>
        <Text style={styles.paragraph}>
          1.5 Promotion and Translation of Listings: Listings and other user
          material may be shown on other websites, in applications, in emails,
          and in offline and online ads in order to publicize the Platform and
          make Listings more visible to prospective guests.
        </Text>
        <Text style={styles.paragraph}>
          1.6 Platform Availability and Modifications: Due to the nature of the
          Internet, the Platform cannot guarantee continuous and uninterrupted
          availability. The Platform may, when required, block access to
          specific features or areas.
        </Text>

        <Text style={styles.sectionTitle}>2. User Eligibility</Text>
        <Text style={styles.paragraph}>
          2.1 Minimum Age Requirement: Users must be at least eighteen years old
          to register and utilize ParkEZ's services.
        </Text>
        <Text style={styles.paragraph}>
          2.2 Current Driver's License: Every user needs to have a current
          driver's license that has been granted by the appropriate authorities
          in their area.
        </Text>
        <Text style={styles.paragraph}>
          2.3 Legal Capacity to Enter Contracts: Users must be able to sign
          legally binding contracts.
        </Text>
        <Text style={styles.paragraph}>
          2.4 Jurisdictional Availability: ParkEZ services are only offered in
          certain areas or nations where the platform functions.
        </Text>
        <Text style={styles.paragraph}>
          2.5 Adherence to Local Laws and Regulations: Users are required to
          abide by all relevant local, state, and federal laws and regulations
          when using the site.
        </Text>

        <Text style={styles.sectionTitle}>
          3. Account Creation and Management
        </Text>
        <Text style={styles.paragraph}>
          3.1 Agreement: Users commit to giving accurate and comprehensive
          information when they create an account. To ensure accuracy, users
          must update their data if it changes. Without parental permission,
          users under the age of eighteen are not allowed to create accounts.
        </Text>
        <Text style={styles.paragraph}>
          3.2 Passwords and Account Security: Users are in charge of protecting
          the privacy of their login information. It is forbidden to share or
          permit illegal access to accounts. In addition to enabling extra
          security features like two-factor authentication, the software
          encourages users to establish strong, one-of-a-kind passwords. Users
          promise to alert the app right away if they believe there has been any
          illegal access or security lapse. To maintain security, the app has
          the right to temporarily suspend or terminate accounts.
        </Text>
        <Text style={styles.paragraph}>
          3.3 Account Management and Termination: Users are always free to
          remove or deactivate their accounts. After a certain amount of time,
          users may no longer have access to their stored data and previous
          activities, and account deletion is final. Accounts that breach terms
          or exhibit any indications of suspicious conduct, such as fraudulent
          activity or unauthorized access attempts, may be suspended or
          terminated by the app.
        </Text>
        <Text style={styles.paragraph}>
          3.4 Liability Limitation: Although the application will follow
          industry-standard security procedures, it disclaims any liability for
          losses brought on by careless users' unlawful account access (e.g.,
          shared credentials or weak passwords). Users understand that they are
          the only ones in charge of maintaining the security of their accounts,
          and the app might not be held accountable for careless user-initiated
          transactions or changes.
        </Text>
        <Text style={styles.paragraph}>
          3.5 License for App Use: By downloading or using this app, users agree
          to these Terms and Conditions and give a limited, non-exclusive,
          non-transferable, and revocable license to use the app only for
          personal, non-commercial purposes. According to ParkEZ's terms and
          conditions, this license permits users to browse listings, reserve
          parking spaces, and use other platform features for personal,
          non-commercial purposes only. It forbids users from copying, changing,
          distributing, selling, or leasing any portion of the app or its
          contents, as well as from attempting to reverse-engineer or extract
          the app's source code, unless laws forbid such actions or users have
          our written consent. Access may be suspended or terminated at our
          discretion.
        </Text>
        <Text style={styles.paragraph}>
          3.6 Compliance: Users promise to abide by all applicable local, state,
          and federal laws as well as the terms of service and privacy policies
          when using the ParkEZ platform. Making sure their activities on the
          platform don't contravene any legal or regulatory obligations is part
          of this. To provide a safe and legal user experience, users must also
          abide by all rules, regulations, and restrictions issued by ParkEZ.
        </Text>
        <Text style={styles.paragraph}>
          3.7 Restrictions: It is forbidden for users to use the ParkEZ platform
          for any illegal, dishonest, or unapproved reasons. This covers, among
          other things, falsifying facts, abusing the platform for profit, and
          doing anything that is against ParkEZ's terms of service. A user who
          violates any of these rules or engages in behavior that is judged
          improper or detrimental to the platform or its users may have their
          access to the platform revoked, suspended, or terminated by ParkEZ.
        </Text>

        <Text style={styles.sectionTitle}>4. User Responsibilities</Text>
        <Text style={styles.paragraph}>
          4.1 Accurate Information: When registering for an account or making
          reservations on the ParkEZ platform, users are accountable for
          supplying correct and current information. This covers payment
          methods, car specifications, and personal information. To guarantee
          smooth service and communication, any updates to this information must
          be made right away.
        </Text>
        <Text style={styles.paragraph}>
          4.2 Appropriate Platform utilize: Users are required to utilize the
          ParkEZ platform responsibly and with courtesy. This entails abiding by
          all platform rules, reserving just parking spots that are available,
          observing time slots, and doing what hosts may specify. Users must
          make sure their accounts are safe and accept responsibility for any
          actions conducted under them.
        </Text>
        <Text style={styles.paragraph}>
          4.3 Adherence to Local Laws: Users are responsible for making sure
          that their ParkEZ platform usage conforms with all applicable local,
          state, and federal laws. This entails abiding with any applicable
          zoning or permit requirements, parking rules, and driving guidelines.
          Additionally, users must abstain from any actions that can put them in
          legal hot water or compromise the platform's functionality, such fraud
          or illegal parking.
        </Text>

        <Text style={styles.sectionTitle}>5. User-Generated Content</Text>
        <Text style={styles.paragraph}>
          5.1 Definition of User-Generated Content: User-uploaded content
          comprises images, descriptions of available parking spots, ratings and
          comments from renters, and any additional information that users—hosts
          and renters alike—choose to submit on the app.
        </Text>
        <Text style={styles.paragraph}>
          5.2 Ownership of User-Generated Content: Any content that users
          produce and submit to the app is primarily their property. Users
          attest to their ownership of the content and their permission to share
          it by posting it. This further confirms that third-party rights are
          not violated.
        </Text>
        <Text style={styles.paragraph}>
          5.3 Content License: By submitting content, users give the app a
          worldwide, irrevocable, royalty-free, non-exclusive license to use,
          display, alter, reproduce, and distribute their work in any media,
          including for marketing and promotional reasons. This license permits
          the application to use user-generated material to enhance user
          experiences, attract new users, and improve current services.
        </Text>
        <Text style={styles.paragraph}>
          5.4 Content Moderation and Removal: The app maintains the right to
          evaluate, censor, and remove any user-generated content that violates
          these conditions or is deemed inappropriate, inaccurate, or harmful.
          This could include any content that contravenes relevant laws or
          regulations, contains offensive language, or contains inaccurate
          information. Additionally, accounts that repeatedly upload content
          that violates community guidelines may be suspended or terminated by
          the app.
        </Text>
        <Text style={styles.paragraph}>
          5.5 Content Accuracy and Integrity: Users agree not to submit
          inaccurate, inappropriate, or deceptive content. If a parking space's
          nature, availability, or quality is misrepresented, content may be
          removed and the account may be suspended.
        </Text>
        <Text style={styles.paragraph}>
          5.6 License Termination Upon Content Deletion: If a user deletes their
          account or any specific content, the app will remove that content from
          its platform; nevertheless, any prior use of that content in marketing
          or promotional materials may still be in force. Users are informed
          that the app's legally granted rights to previously shared or public
          content are not affected by content removal.
        </Text>
        <Text style={styles.paragraph}>
          5.7 Liability Limitation: Regardless of the authenticity of the
          content or how it affects other users' experiences, the app disclaims
          all responsibility for any losses or damages resulting from
          user-generated content that is shown or shared on the platform.
        </Text>

        <Text style={styles.sectionTitle}>6. Unacceptable Use Policy</Text>
        <Text style={styles.paragraph}>
          6.1 Illegal activity: While using the ParkEZ platform, users are not
          permitted to partake in any illegal activity. This covers, among other
          things, utilizing the platform for theft, fraud, or other illegal
          activity. When dealing with the platform and other users, users must
          abide by all applicable local, state, and federal laws.
        </Text>
        <Text style={styles.paragraph}>
          6.2 Harassment and Discrimination: Users are prohibited from
          harassing, abusing, or discriminating against hosts, ParkEZ employees,
          or other platform users. This includes speaking in an insulting
          manner, threatening others, or acting in any way that makes other
          people feel uncomfortable or endangered.
        </Text>
        <Text style={styles.paragraph}>
          6.3 Platform Misuse: It is forbidden for users to abuse the ParkEZ
          platform in any way that might impair or interfere with its operation.
          This includes using the platform for illegal commercial purposes
          (reselling parking spaces or accounts), trying to hack or
          reverse-engineer it, or taking advantage of defects or
          vulnerabilities.
        </Text>
        <Text style={styles.paragraph}>
          6.4 Impersonation and Misrepresentation: On the site, users are
          prohibited from posing as someone else, misrepresenting their
          identity, or giving inaccurate or misleading information. This
          involves giving false information about a car's details, parking
          availability, or other features of the services provided.
        </Text>
        <Text style={styles.paragraph}>
          6.5 Unauthorized Access: It is forbidden for users to try to access
          any portion of the ParkEZ platform without authorization, including
          other user accounts, administrator spaces, or platform-related
          systems. This includes making an effort to get around security
          controls or taking part in actions that jeopardize the integrity of
          the platform.
        </Text>

        <Text style={styles.sectionTitle}>7. Termination of Accounts</Text>
        <Text style={styles.paragraph}>
          7.1 User-Initiated Termination: As long as they are adhering to the
          platform's account deletion procedure, users are free to end their
          accounts whenever they want. All access to ParkEZ services will be
          terminated upon deletion, and any outstanding transactions will be
          handled in accordance with platform guidelines.
        </Text>
        <Text style={styles.paragraph}>
          7.2 Cancellation Policy: There are no fees or penalties associated
          with users ending their accounts.
        </Text>
        <Text style={styles.paragraph}>
          7.3 ParkEZ-Initiated Termination: In the event of a breach of the
          terms of service, unlawful activity, platform abuse, or non-compliance
          with relevant laws and regulations, ParkEZ retains the right to
          suspend or terminate user accounts. If fraudulent activity,
          harassment, or other illegal or questionable activities are found,
          accounts may also be closed.
        </Text>
        <Text style={styles.paragraph}>
          7.4 Repercussions for Termination: Users will lose access to all
          platform services and all related data when their accounts are
          terminated. Any commitments or responsibilities incurred before
          termination are unaffected by termination. For services that have
          already been assured, users will not be eligible for refunds, and any
          unpaid invoices will remain payable.
        </Text>

        <Text style={styles.sectionTitle}>8. Payments</Text>
        <Text style={styles.paragraph}>
          8.1 Payment Processing: Third-party payment gateways will be used to
          safely process all payments for ParkEZ services, including parking
          reservations and associated costs. When making a reservation or
          creating an account, users must supply accurate payment information,
          and all transactions must be finished via the platform.
        </Text>
        <Text style={styles.paragraph}>
          8.2 Billing and Fees: Customers accept the fees related to the
          services they choose, such as parking costs, service fees, and any
          applicable late or cancellation fees. ParkEZ accepts digital wallets
          and credit and debit cards as forms of payment. Before payment is
          made, all charges will be explained in detail.
        </Text>
        <Text style={styles.paragraph}>
          8.3 Subscriptions and Refunds: Users who purchase subscription
          services will get recurring bills, which will automatically renew
          unless they cancel. Users must get in touch with customer service to
          address any billing concerns, and refunds for cancellations or
          disputes will be processed in accordance with ParkEZ's return policy.
        </Text>

        <Text style={styles.sectionTitle}>9. Privacy and Data Usage</Text>
        <Text style={styles.paragraph}>
          9.1 The application will manage user data, including private
          information gathered during account creation and management, in
          compliance with its Privacy Policy. Although the program protects user
          data with encryption and other security measures, it is not liable for
          losses brought on by outside forces.
        </Text>

        <Text style={styles.sectionTitle}>10. Intellectual Property</Text>
        <Text style={styles.paragraph}>
          10.1 Content Ownership: All of ParkEZ's content, including text,
          graphics, logos, photos, and software, is its intellectual property
          and is thus shielded by trademark, copyright, and other intellectual
          property laws. According to the terms of service, users are granted a
          restricted, non-transferable license to use the platform and its
          services for their own personal use.
        </Text>
        <Text style={styles.paragraph}>
          10.2 User-Generated Content: When users upload or submit content to
          the ParkEZ platform, they provide the platform worldwide, royalty-free
          permission to use, display, edit, and share the content.
        </Text>
        <Text style={styles.paragraph}>
          10.3 Intellectual Property Protection: ParkEZ vigorously defends its
          rights to intellectual property and will pursue necessary legal action
          against any infringement or unlawful use of its trademark or material.
          Without the required authorization, users are not permitted to
          disseminate, reproduce, or copy any of the content that ParkEZ
          provides.
        </Text>

        <Text style={styles.sectionTitle}>11. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          11.1 No Liability for Downtime: ParkEZ disclaims all liability for
          platform or service outages brought on by maintenance, security
          breaches, or technical difficulties. Users understand that there may
          occasionally be disruptions to the platform, and ParkEZ is not
          responsible for any damages brought on by these disruptions. In the
          event of maintenance, users will be informed in advance.
        </Text>
        <Text style={styles.paragraph}>
          11.2 Indirect Damage Exclusion: ParkEZ disclaims any liability for
          incidental, consequential, or indirect damages resulting from the use
          or inability to utilize the platform. This covers, among other things,
          lost revenue, data loss, and business disruptions.
        </Text>
        <Text style={styles.paragraph}>
          11.3 Maximum Liability: In the event that ParkEZ is held liable, its
          total obligation to any user will be capped at the amount that the
          user paid for services that were directly related to the problem at
          hand. In no case will this amount surpass the total fees that the user
          paid during the 12 months prior to the claim.
        </Text>

        <Text style={styles.sectionTitle}>
          12. Dispute Resolution & Governing Law
        </Text>
        <Text style={styles.paragraph}>
          12.1 Arbitration and Mediation: In the case that a disagreement arises
          between a user and ParkEZ, both parties undertake to try to settle the
          matter amicably first. The disagreement will be submitted to binding
          arbitration under the guidelines of an established arbitration
          organization, like the American Arbitration Association (AAA), if
          mediation is unable to settle it.
        </Text>
        <Text style={styles.paragraph}>
          12.2 Governing Law: The laws of the state or jurisdiction in which
          ParkEZ is headquartered, regardless of its conflict of law principles,
          shall govern and be construed in accordance with this agreement, and
          any disputes arising out of or relating to the use of the ParkEZ
          platform. Users agree that these courts have jurisdiction over them.
        </Text>

        <Text style={styles.sectionTitle}>
          13. Advertisements & Third-Party
        </Text>
        <Text style={styles.paragraph}>
          13.1 Advertisements or links to third-party websites, goods, and/or
          services may be displayed by the Services ("Third-Party Ads"). The
          availability of these Third-Party Ads, as well as the pictures,
          messages, and other content they include, are not within our control
          or guarantee. ParkEZ and its affiliates disclaim all liability for any
          losses or damages arising from your interaction with, use of, or
          reliance on any Third-Party Ads, including any goods, products, or
          services they provide, as well as for any mistakes or omissions in
          their content.
        </Text>

        <Text style={styles.sectionTitle}>
          14. Modifications to Terms and Conditions
        </Text>
        <Text style={styles.paragraph}>
          14.1 These Terms and Conditions may be updated, revised, or amended at
          any time by us. This page will display any updates along with the date
          of the change. Users will be informed of significant changes by email,
          in-app notices, or other appropriate channels. It is your duty to
          periodically examine these terms and conditions in order to be aware
          of any revisions. You acknowledge and accept the amended conditions by
          using our services going forward after such modifications are made.
        </Text>

        <Text style={styles.sectionTitle}>15. Contact Information</Text>
        <Text style={styles.paragraph}>
          15.1 Please email us at contact@parkez.com if you have any issues
          concerning these terms and conditions. Please be aware that after
          sending the initial message, you will not hear back for three to five
          business days. If you have any privacy or legal concerns, you can also
          call ParkEZ at (408) 908-9879.
        </Text>

        <Text style={styles.sectionTitle}>
          16. Required Background Check for Hosts
        </Text>
        <Text style={styles.paragraph}>
          You accept the following terms and conditions pertaining to the
          background check procedure carried out by a third-party provider,
          Checkr, by registering as a homeowner and selling your property on
          Parkable.
        </Text>
        <Text style={styles.paragraph}>
          16.1 Consent to Background Check: You specifically agree to Checkr, a
          third-party provider, collecting, using, and disclosing your personal
          information in order to do a background check when you create a
          homeowner account and list your property. Identity verification,
          criminal histories, and other pertinent data may be included in this
          check, but they are not the only ones.
        </Text>
        <Text style={styles.paragraph}>
          16.2 Necessary Details: You will need to supply the following details
          in order to finish the background check: • Full legal name • Date of
          birth • Address • Government-issued ID (e.g., driver's license,
          passport) • Any additional information as requested by Checkr for
          verification purposes
        </Text>
        <Text style={styles.paragraph}>
          16.3 Background Check Procedure: In compliance with their terms of
          service, Checkr will conduct your background check when you submit
          your information. Depending on how complicated the check is, this
          could take a few minutes to many days.
        </Text>
        <Text style={styles.paragraph}>
          16.4 Verification Status: After your background check is finished, you
          will be informed of its results. Your Parkable account will indicate
          the status of your background check (e.g., "Pending," "Verified," or
          "Failed"). You won't be able to list your driveway until the
          background check is successfully completed.
        </Text>
        <Text style={styles.paragraph}>
          16.5 Background Check Results: Parkable retains the right to refuse or
          remove your listing if the background check reveals any
          inconsistencies or problems (such as a criminal past that contravenes
          Parkable's rules). Parkable is not liable for the outcomes of the
          background check, but you have the option to contest the findings or
          ask Checkr for more information.
        </Text>
        <Text style={styles.paragraph}>
          16.6 Security and Privacy: All data sent to Checkr will be treated
          safely and in compliance with Checkr's privacy statement. Parkable
          will not disclose your personal information to third parties without
          your consent, unless mandated by law or required for the background
          check. Parkable will only use the information from the background
          check to confirm your status as a homeowner on the platform.
        </Text>
        <Text style={styles.paragraph}>
          16.7 Continuous Monitoring: Parkable may recheck homeowners on a
          regular basis to see if there have been any changes to their
          background check status. In order to keep your listing as a homeowner
          on the Parkable platform, you consent to undergoing background checks
          on a regular basis as needed.
        </Text>
        <Text style={styles.paragraph}>
          16.8 Termination of Access: Your access to the Parkable platform may
          be suspended or terminated if you are unable to pass the background
          check or provide the required paperwork. For further information, get
          in touch with Checkr directly if you want to contest a decision that
          was made based on your background check.
        </Text>
        <Text style={styles.paragraph}>
          By registering as a homeowner and listing your property on Parkable,
          you acknowledge and agree to these terms regarding the background
          check process.
        </Text>

        <Text style={styles.sectionTitle}>17. Miscellaneous</Text>
        <Text style={styles.paragraph}>
          17.1 The validity, legality, and enforceability of the remaining terms
          of these Terms and Conditions will not be impacted or compromised if a
          court of competent jurisdiction finds any of them to be unlawful,
          invalid, or unenforceable. The remainder of the Terms shall remain in
          full force and effect, and the invalid or unenforceable provision will
          be deemed amended to the least degree required to make it valid and
          enforceable. In these situations, the parties agree to engage in
          sincere negotiations to replace the invalid provision with one that,
          to the extent permitted by relevant law, most closely embodies the
          original meaning of the provision.
        </Text>

        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Text style={styles.acceptButtonText}>I Accept</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
  },
  acceptButton: {
    backgroundColor: "#FFD700",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  acceptButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});
