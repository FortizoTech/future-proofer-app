"use client";

import React from 'react';
import { ExternalLink, FileText } from 'lucide-react';

interface EvidenceResource {
    title: string;
    source: string;
    region: string;
    url: string;
}

interface EvidenceResourcesProps {
    resources: EvidenceResource[];
}

export function EvidenceResources({ resources }: EvidenceResourcesProps) {
    const handleResourceClick = (url: string) => {
        // Don't open placeholder URLs
        if (url && !url.includes('EXACT_DEEP_LINK_REQUIRED')) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="evidence-widget">
            <h3 className="evidence-title">Evidence & Resources</h3>
            <div className="evidence-list">
                {resources.map((resource, index) => (
                    <div
                        key={index}
                        className="evidence-item"
                        onClick={() => handleResourceClick(resource.url)}
                        role="button"
                        tabIndex={0}
                    >
                        <div className="evidence-icon">
                            <FileText size={16} />
                        </div>
                        <div className="evidence-content">
                            <div className="evidence-item-title">{resource.title}</div>
                            <div className="evidence-source">{resource.source}</div>
                            <div className="evidence-region">{resource.region}</div>
                        </div>
                        {resource.url && !resource.url.includes('EXACT_DEEP_LINK_REQUIRED') && (
                            <ExternalLink size={14} className="evidence-link-icon" />
                        )}
                    </div>
                ))}
            </div>
            {resources.length === 0 && (
                <div className="evidence-empty">
                    Loading relevant resources...
                </div>
            )}
        </div>
    );
}

export default EvidenceResources;
