import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Work — Joshua Kibuye | Full-Stack & AI Projects",
    description:
        "Explore Joshua Kibuye's portfolio of full-stack development and AI engineering projects — from enterprise platforms to intelligent systems.",
};

export default function WorkLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
