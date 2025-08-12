import { Ul } from "@ui/ul";
import { Ol } from "@ui/ol";
import { Description, Section } from "@dashboard/documents/contents";

export default function Page() {
  return (
    <>
      <Description title="Healthcare+ B2B Platform – Terms and Conditions" />
      <Ol className="list-[upper-roman] flex flex-col gap-5">
        <Section title="Service Overview" orderList={true}>
          The Healthcare+ B2B Platform (“the Platform”) is operated by the
          Institute for Biotechnology and Medicine Industry (IBMI) and the
          Research Center for Biotechnology and Medicine Policy (RBMP). It aims
          to connect qualified Taiwanese suppliers in the medical, biotech, and
          related technology sectors with selected international buyers. The
          Platform facilitates online and in-person matchmaking activities to
          promote business collaboration, exports, and global growth.
        </Section>
        <Section title="Copyright and Content Use" orderList={true}>
          <Ol>
            <li>
              All intellectual property rights, including but not limited to
              text, graphics, logos, button icons, images, files, data, website
              structure, and page layout, are legally owned by or licensed to
              IBMI and RBMP.
            </li>
            <li>
              You may use publicly available content from IBMI and RBMP websites
              for non-commercial purposes, provided that the content source is
              clearly credited and, where possible, linked back to the original
              IBMI/RBMP website.
            </li>
            <li>
              Some content may be subject to third-party copyright. Users are
              responsible for obtaining proper authorization before using such
              content.
            </li>
          </Ol>
        </Section>
        <Section title="Link Policy" orderList={true}>
          <Ol>
            <li>
              Placing a hyperlink to the IBMI/RBMP websites requires prior
              written permission. Hyperlinks must not imply any false
              endorsement or affiliation.
            </li>
            <li>
              Web pages and content formats are subject to change; use of
              automated scraping or data capture tools is prohibited.
            </li>
          </Ol>
        </Section>
        <Section title="External Links Disclaimer" orderList={true}>
          The Platform may include links to third-party websites. IBMI and RBMP
          are not responsible for the accuracy, completeness, or security of any
          third-party content accessed via such links.
        </Section>
        <Section title="Platform Use Disclaimer" orderList={true}>
          <Ol>
            <li>
              The information on the Platform is provided for reference only.
              While we strive for accuracy, IBMI and RBMP do not guarantee the
              timeliness, reliability, or completeness of the content.
            </li>
            <li>
              Use of the website and downloading content is at your own risk.
              IBMI and RBMP shall not be held liable for any damage to hardware,
              software, or data as a result.
            </li>
          </Ol>
        </Section>
        <Section title="Data Retention" orderList={true}>
          <Ol>
            <li>
              IBMI and RBMP may retain data submitted through the Platform,
              including communication records and profile information, for up to
              twelve (12) months.
            </li>
            <li>
              After the retention period, IBMI and RBMP may delete or anonymize
              such data without further notice.
            </li>
            <li>
              Users are responsible for backing up any important data they wish
              to retain.
            </li>
          </Ol>
        </Section>
        <Section title="Information Security" orderList={true}>
          All data handling and information security procedures follow IBMI and
          RBMP’s internal protocols and are compliant with relevant regulations.
        </Section>
        <Section title="Matchmaking and Meeting Coordination" orderList={true}>
          <Ol className="list-[upper-alpha]">
            <li>
              Matchmaking Policy
              <Ol>
                <li>
                  All matchmaking communications and meeting arrangements must
                  be made through the Platform.
                </li>
                <li>
                  The Platform coordinates meeting schedules, locations
                  (physical or virtual), and provides technical support for the
                  sessions.
                </li>
                <li>
                  One-way request system: Suppliers initiate meeting requests to
                  international buyers.
                </li>
                <li>
                  Buyers have up to 7 calendar days to accept or decline the
                  request. If there is no response, the request expires and the
                  pre-authorization is canceled.
                </li>
                <li>
                  Once confirmed and paid, meeting details cannot be changed on
                  the Platform. For rescheduling, please contact the IBMI Taiwan
                  B2B Support Team at [b2b@erbio.com.tw].
                </li>
              </Ol>
            </li>
            <li>
              Payment Terms
              <Ol>
                <li>
                  Credit Card Pre-Authorization
                  <Ul>
                    <li>
                      A pre-authorization of TWD 3,000 will be applied when
                      submitting a meeting request.
                    </li>
                    <li>
                      The amount will only be charged if the buyer accepts the
                      meeting.
                    </li>
                    <li>
                      If the buyer declines or does not respond within 7 days,
                      the pre-authorization will be voided.
                    </li>
                  </Ul>
                </li>
                <li>
                  Confirmed Meeting
                  <Ul>
                    <li>
                      When a buyer accepts the request, the pre-authorized
                      amount will be charged.
                    </li>
                    <li>
                      The payment confirms your participation and is
                      non-refundable, except under specified conditions below.
                    </li>
                  </Ul>
                </li>
              </Ol>
            </li>
          </Ol>
        </Section>
        <Section title="Refund Policy" orderList={true}>
          Refunds are only available under the following limited conditions:
          <Ol>
            <li>
              Buyer No-Show
              <Ul>
                <li>
                  If the international buyer fails to attend the scheduled
                  meeting.
                </li>
                <li>
                  You must submit a Post-Meeting Survey within 48 hours and
                  provide relevant documentation.
                </li>
              </Ul>
            </li>
            <li>
              Force Majeure
              <Ul>
                <li>
                  Events beyond reasonable control (e.g., natural disaster, war,
                  pandemic lockdowns).
                </li>
                <li>
                  Supporting documents or official verification may be required.
                </li>
              </Ul>
            </li>
          </Ol>
          Additional Refund Conditions
          <Ul>
            <li>
              Refund requests are subject to manual review and must meet the
              criteria listed above.
            </li>
            <li>
              Refunds will not be granted due to:
              <Ol>
                <li>Supplier-initiated cancellations</li>
                <li>Scheduling conflicts or business reprioritization</li>
                <li>
                  Technical issues from the supplier’s side (e.g., internet
                  problems)
                </li>
              </Ol>
            </li>
            <li>Refund processing may take up to 30 business days.</li>
            <li>Refunds will be issued only to the original payment method.</li>
          </Ul>
        </Section>
        <Section title="Prohibited Activities" orderList={true}>
          To maintain the integrity of the Platform, suppliers must not:
          <Ul>
            <li>Directly contact buyers through unofficial channels</li>
            <li>Share contact details without Platform consent</li>
            <li>Arrange independent meetings outside the Platform</li>
            <li>Redirect buyers to other services or platforms</li>
          </Ul>
          Consequences for Violations
          <br />
          Violating these terms may result in:
          <Ul>
            <li>Immediate suspension from the matchmaking program</li>
            <li>Forfeiture of any paid fees</li>
            <li>Permanent ban from future services</li>
            <li>Legal or disciplinary actions as deemed necessary by IBMI</li>
          </Ul>
        </Section>
        <Section title="Statement of Change" orderList={true}>
          IBMI and RBMP reserve the right to update or modify the contents of
          the website and these terms at any time without prior notice. Changes
          become effective upon publication.
        </Section>
        <Section title="Acceptance of Terms" orderList={true}>
          By using the Healthcare+ B2B Platform and submitting meeting requests,
          you confirm that you have read, understood, and agree to comply with
          all the terms outlined above. This includes but is not limited to
          intellectual property usage, payment and refund policies, and conduct
          requirements.
        </Section>
      </Ol>
    </>
  );
}
