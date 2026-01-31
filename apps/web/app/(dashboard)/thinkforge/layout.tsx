import TopNavbar from '@/components/TopNavbar';

export default function ThinkforgeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const tabs = [
        { label: 'My Learning', href: '/thinkforge/my-learning' },
        { label: 'Catalog', href: '/thinkforge/catalog' },
        { label: 'Achievements', href: '/thinkforge/achievements' },
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
