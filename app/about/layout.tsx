import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About — Joshua Kibuye | Innovation That Powers Organizations",
    description:
        "Learn about Joshua Kibuye — a full-stack developer and AI engineer using innovation to power organizations and create meaningful solutions.",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
