import { Ol } from "@ui/ol";
import { Ul } from "@ui/ul";
import { Description, Section } from "@dashboard/documents/contents";

export default function Page() {
  return (
    <>
      <Description title="IBMI/RBMP Privacy Policy">
        Welcome to the Institute for Biotechnology and Medicine Industry (IBMI)
        and the Research Center for Biotechnology and Medicine Policy (RBMP).
        Your privacy is important to us. We know that you care how your
        information is used and shared, and this Privacy Policy explains what
        personal information we collect from you and how we use and manage it.
        Please note that this Privacy Policy does not apply to any website other
        than IBMI and RBMP’s, whether or not connected or referenced to by IBMI
        and RBMP, nor to any person or entity that has no legal or contractual
        relationship with IBMI and RBMP and therefore is beyond our reasonable
        control.
      </Description>
      <Ol className="list-[upper-roman] flex flex-col gap-5">
        <Section title="The range of application" orderList={true}>
          <Ol>
            <li>
              Between you and IBMI and RBMP, this policy refers to personal data
              collection, procession and use, applies to which indicates below.
              <Ol>
                <li>Business you have with IBMI and RBMP;</li>
                <li>
                  Events or activities you have with IBMI and RBMP (e.g.
                  subscribe to IBMI and RBMP e-newsletter, become a IBMI member,
                  become a Site member);
                </li>
                <li>
                  Contact you have with IBMI and RBMP(e.g. quires, suggestions
                  or complains made by email, phone or any other ways).
                </li>
              </Ol>
            </li>
            <li>
              IBMI and RBMP website contains links to external websites that
              this policy may not be applicable. IBMI and RBMP shall bear no
              responsibility for privacy protection once individuals exit IBMI
              and RBMP’s website.
            </li>
          </Ol>
        </Section>
        <Section
          title="Collection, procession and use of personal information"
          orderList={true}
        >
          <Ul>
            <li>
              In order to operate effectively and provide you the best
              experiences with IBMI and RBMP Services, IBMI and RBMP may collect
              any information you provide, including but not limited to names
              and contacts, credentials, demographic data and location, when you
              use IBMI and RBMP Services (g. subscribe to IBMI and RBMP
              e-newsletter, participate in IBMI and RBMP-oganised events). IBMI
              and RBMP collects the said information for the sole purpose to
              deliver and improve our Services to you. Please refer to Personal
              Data Collection and Privacy for more details.
            </li>
            <li>
              IBMI and RBMP will not use personal information you provided for
              any purpose irrelevant to IBMI and RBMP Services without your
              prior written consent.
            </li>
            <li>
              In the event that both personal Information and non-personal
              Information are collected simultaneously, IBMI and RBMP will treat
              it all as personal information and abide by any applicable
              regulations on personal i information.
            </li>
            <li>
              IBMI and RBMP collects, processes and uses personal information in
              compliance with Taiwan’s Personal Data Protection Act. Personal
              information can only be accessed by authorised personnel in
              accordance with purposes and necessities.
            </li>
            <li>
              It is not required to provide personal information when browsing
              IBMI and RBMP website.
            </li>
          </Ul>
        </Section>
        <Section title="Share information with third parties" orderList={true}>
          <Ul>
            <li>
              IBMI and RBMP never provide, disclose, sell, interchange or lease
              at will any of your personal information to any other individual
              or entity for any purpose other than providing and improving IBMI
              and RBMP services.
            </li>
            <li>
              IBMI and RBMP may disclose your personal information to the extent
              necessary under any of the circumstances set forth below:
              <Ol>
                <li>
                  To cooperate with the competent judicial authorities or
                  governmental agencies on any investigation or their request.
                </li>
                <li>
                  To disclose based on our goodwill and reasonable belief that
                  such disclosure is required by law or for management and
                  improvement of the Services.
                </li>
                <li>
                  To abide by any applicable laws, regulations and legal
                  procedures, or orders from the courts or governmental
                  agencies.
                </li>
                <li>
                  To detect, prevent or otherwise deal with potential fraud,
                  security or technical issues that come to our attention.
                </li>
                <li>
                  To protect the rights, property or safety of you, any other
                  people and IBMI and RBMP from harm in accordance with the law.
                </li>
                <li>
                  To transfer any and all Personal Information we have collected
                  to a third party if we engage in reorganization, merger or
                  sell our business to such third party.
                </li>
              </Ol>
            </li>
            <li>
              IBMI and RBMP shall supervise and ensure legal compliance with the
              collection, processing or use of your personal data by contracted
              vendors.
            </li>
          </Ul>
        </Section>
        <Section title="Server log files" orderList={true}>
          <div>
            We may use technologies, such as cookies, pixel labeling or web
            beacons, to further understand our users ‘behaviours’. We may
            collect your access data of our Services and your activities on IBMI
            and RBMP website, such as what pages or items you review, in order
            to assist our assessment on the effectiveness of our search
            function, to provide more personalized information to users, and to
            analyse what information and services we provide that draw the most
            attention. We may also use pixel tags to track whether you open the
            message we send to you and base on this information to determine
            whether we should reduce or cease to send certain information to
            you. We track click-related data to determine how much attention you
            pay to a specific topic and evaluate the effectiveness of our
            communication with you. If you do not want to be tracked in this
            way, please do not click on the hyperlink attached in our message.
          </div>
          <div>
            We use the information automatically collected in log file,
            including but not limited to, TCP/IP, browser and language used,
            ISP, referral website, applications, operation system, datestamp,
            timestamp, clickstream data and user population statistics to
            understand and analyse our users&apos; activities and preference,
            manage the website, predict the trends and improve our Services
            accordingly. We may use this information for marketing and
            advertising.
          </div>
          <div>
            If you do not want to receive the above mentioned communication, you
            may change your system setting at any time.
          </div>
        </Section>
        <Section title="Amendment to this privacy policy" orderList={true}>
          We will not wilfully restrict any rights granted to you under this
          Privacy Policy. Nonetheless, we reserve the right to amend this
          Privacy Policy from time to time and announce such amendment on IBMI
          and RBMP’s home page as well as in the Privacy Policy area
          simultaneously. If the amendment of the Privacy Policy involves any
          material change to your rights and/or obligations, we will also inform
          you directly via e-mail and/or SMS message, if applicable. Except as
          expressly stated otherwise, the amendment of the Privacy Policy will
          be effective at the time of announcement on IBMI and RBMP website.
        </Section>
        <Section title="Other statements" orderList={true}>
          You agree not to use IBMI and RBMP website for any illegal or improper
          purposes and agree to provide real personal data or be authorised by
          provide personal data that is not yours. You will be holding
          accountable for any damage or loss caused by personal data you
          provided or any other matter that is deemed illegal or improper.
        </Section>
      </Ol>
    </>
  );
}
