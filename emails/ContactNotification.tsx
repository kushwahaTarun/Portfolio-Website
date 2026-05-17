import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type Props = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function ContactNotification({ name, email, subject, message }: Props) {
  return (
    <Html>
      <Head />
      <Preview>{`New portfolio message from ${name}`}</Preview>
      <Body
        style={{
          backgroundColor: "#05060a",
          color: "#f5f5f7",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto",
          padding: "32px 0",
        }}
      >
        <Container
          style={{
            backgroundColor: "#0a0c12",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: 32,
            maxWidth: 560,
          }}
        >
          <Heading
            as="h1"
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            New portfolio message
          </Heading>

          <Text style={{ color: "#8a8f9c", marginTop: 8, fontSize: 13 }}>
            Someone reached out via your contact form.
          </Text>

          <Hr style={{ borderColor: "rgba(255,255,255,0.08)", margin: "24px 0" }} />

          <Section>
            <Row label="From" value={`${name} <${email}>`} />
            <Row label="Subject" value={subject} />
          </Section>

          <Hr style={{ borderColor: "rgba(255,255,255,0.08)", margin: "24px 0" }} />

          <Heading
            as="h2"
            style={{ margin: 0, fontSize: 14, color: "#8a8f9c", fontWeight: 500 }}
          >
            Message
          </Heading>
          <Text
            style={{
              color: "#f5f5f7",
              whiteSpace: "pre-wrap",
              lineHeight: 1.65,
              fontSize: 15,
              marginTop: 12,
            }}
          >
            {message}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <Text style={{ color: "#8a8f9c", fontSize: 12, margin: 0 }}>{label}</Text>
      <Text
        style={{
          color: "#f5f5f7",
          fontSize: 15,
          margin: 0,
          marginTop: 2,
        }}
      >
        {value}
      </Text>
    </div>
  );
}

export default ContactNotification;
