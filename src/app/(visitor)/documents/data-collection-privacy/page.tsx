import { Ul } from "@ui/ul";
import { Ol } from "@ui/ol";
import { Description, Section } from "@dashboard/documents/contents";
import { ConfigValue } from "@/config";

export default function Page() {
  return (
    <>
      <Description title="EVERRISE - Personal Data Collection and Privacy">
        EverRise Biomedical Co. Ltd. (EVERRISE) collects personal data per
        Paragraph 1 of Article 8 under Taiwan’s Personal Data Protection Act
        (hereinafter ‘PDPA’). The EVERRISE website complies with PDPA when
        collecting, using, and keeping personal information.
      </Description>
      <Ol className="list-[upper-roman] flex flex-col gap-5">
        <Section
          title="Personal data collection: purpose and data to be collected"
          orderList={true}
        >
          <Ul>
            <li>
              EVERRISE collects personal data to provide information on
              projects, events, and services associated with EVERRISE’s work in
              government affairs, consultancy, awarding and certification,
              startup incubation, partnership, and collaboration.
            </li>
            <li>
              Personal data EVERRISE collects, including name, contact
              information (e.g., contact number, job title, email, residence
              and/or office address, personal ID), and others that can prove
              your identity.
            </li>
          </Ul>
        </Section>
        <Section
          title="Period, territory, recipients, and methods by which the personal data is used"
          orderList={true}
        >
          <Ul>
            <li>Period: during the valid existence of EVERRISE.</li>
            <li>
              Recipients: EVERRISE collects, processes, and uses personal data
              solely for the purposes it was collected and only to the extent
              necessary to achieve such purposes.
            </li>
            <li>
              Territory: Depending on the purpose of collection, the use of your
              personal data is limited to domestic use if only domestic business
              or activities are involved; however, where international business
              or activities are involved, the use of your personal data may also
              be limited to the specific geographic regions in which the
              business or activities are conducted.
            </li>
            <li>
              Methods: EVERRISE employs methods that comply with PDPA,
              regardless of whether they are automated systems or manually
              operated ones, to collect, process, transfer, and use personal
              data.
            </li>
          </Ul>
        </Section>
        <Section title="Your rights" orderList={true}>
          As per Article 3 of the PDPA, EVERRISE grants you the right to request
          access to personal data that EVERRISE holds about you.
          <Ol>
            <li>
              You can request access to check, read, or ask for a copy of your
              data, however, certain The formats of data output you request are
              subject to cost.
            </li>
            <li>
              You can request amendment and correction of your data, provided
              that you have specified details on which you wish EVERRISE to do
              with your data.
            </li>
            <li>
              You can request cessation of the collection, processing or use,
              and deletion of your personal data; EVERRISE, however, has the
              right to turn down your request by clear indication backed by the
              law or where it considers necessary.
            </li>
          </Ol>
          When exercising your preceding rights, you must request them in
          writing by email (
          <a href={`mailto:${ConfigValue.CONTACT_EMAIL}`}>
            {ConfigValue.CONTACT_EMAIL}
          </a>
          ). EVERRISE will proceed with your request once we have received it.
        </Section>
        <Section title="Refusal to provide personal data" orderList={true}>
          You can decide whether or not to provide your data. Please be advised
          that EVERRISE cannot provide you with services related to personal
          data collection and services for such purposes if you opt not to
          provide your data or provide invalid data.
        </Section>
      </Ol>
      <div>
        <div className="font-semibold">Important Notes</div>
        <Ul>
          <li>Charges apply only after the buyer confirms a timeslot.</li>
          <li>
            If the buyer does not respond within seven calendar days, the
            request will be automatically closed and no fees will be charged.
          </li>
        </Ul>
      </div>
    </>
  );
}
