import TopNavbar from '@/components/TopNavbar';

export default function CareerGuideLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const tabs = [
        { label: 'Discovery', href: '/career-guide/discovery' },
        { label: 'Skills Gap', href: '/career-guide/skills-gap' },
        { label: 'Market Intel', href: '/career-guide/market-intel' },
        { label: 'CV Builder', href: '/career-guide/cv-builder' },
        { label: 'Interview Prep', href: '/career-guide/interview-prep' },
    ];

    return (
        <>
            <TopNavbar tabs={tabs} />
            <div className="p-10">
                {children}
            </div>
        </>
    );
}
