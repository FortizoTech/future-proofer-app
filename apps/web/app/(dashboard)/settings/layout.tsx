import TopNavbar from '@/components/TopNavbar';

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const tabs = [
        { label: 'General', href: '/settings/general' },
        { label: 'Profile', href: '/settings/profile' },
        { label: 'Billing', href: '/settings/billing' },
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
