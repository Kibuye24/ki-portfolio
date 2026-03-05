import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact — Joshua Kibuye | Let's Connect",
    description:
        "Get in touch with Joshua Kibuye for project collaborations, inquiries, or to discuss how technology can transform your organization.",
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
