import TopNavbar from '@/components/TopNavbar';

export default function NetworkLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const tabs = [
        { label: 'Feed', href: '/network/feed' },
        { label: 'Mentors', href: '/network/mentors' },
        { label: 'Messages', href: '/network/messages' },
        { label: 'Events', href: '/network/events' },
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
