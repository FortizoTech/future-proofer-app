import { useState, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';

export interface Attachment {
    id: string;
    file: File;
    name: string;
    size: number;
    type: string;
    url?: string;
    status: 'pending' | 'uploading' | 'success' | 'error';
    error?: string;
}

export const useFileUpload = (maxSizeMB: number = 10) => {
    const [attachments, setAttachments] = useState<Attachment[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const supabase = createClient();

    const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'image/png',
        'image/jpeg'
    ];

    const validateFile = (file: File): string | null => {
        if (!allowedTypes.includes(file.type)) {
            return 'Invalid file type. Supported: PDF, DOCX, TXT, PNG, JPG.';
        }
        if (file.size > maxSizeMB * 1024 * 1024) {
            return `File too large. Maximum size is ${maxSizeMB}MB.`;
        }
        return null;
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        const newAttachments: Attachment[] = files.map(file => {
            const error = validateFile(file);
            return {
                id: crypto.randomUUID(),
                file,
                name: file.name,
                size: file.size,
                type: file.type,
                status: error ? 'error' : 'pending',
                error: error || undefined
            };
        });

        setAttachments(prev => [...prev, ...newAttachments]);

        // Reset input so the same file can be selected again
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const removeAttachment = (id: string) => {
        setAttachments(prev => prev.filter(a => a.id !== id));
    };

    const clearAttachments = () => {
        setAttachments([]);
    };

    const uploadFiles = async (userId: string): Promise<Attachment[]> => {
        const pendingUploads = attachments.filter(a => a.status === 'pending');

        if (pendingUploads.length === 0) return attachments;

        const updatedAttachments = [...attachments];

        for (const attachment of pendingUploads) {
            const index = updatedAttachments.findIndex(a => a.id === attachment.id);
            updatedAttachments[index] = { ...attachment, status: 'uploading' };
            setAttachments([...updatedAttachments]);

            try {
                const fileExt = attachment.name.split('.').pop();
                const filePath = `${userId}/${crypto.randomUUID()}.${fileExt}`;

                const { data, error } = await supabase.storage
                    .from('cv_uploads')
                    .upload(filePath, attachment.file);

                if (error) throw error;

                const { data: { publicUrl } } = supabase.storage
                    .from('cv_uploads')
                    .getPublicUrl(filePath);

                updatedAttachments[index] = {
                    ...updatedAttachments[index],
                    status: 'success',
                    url: publicUrl
                };
            } catch (err: any) {
                updatedAttachments[index] = {
                    ...updatedAttachments[index],
                    status: 'error',
                    error: err.message || 'Upload failed'
                };
            }
            setAttachments([...updatedAttachments]);
        }

        return updatedAttachments;
    };

    return {
        attachments,
        fileInputRef,
        handleFileSelect,
        removeAttachment,
        clearAttachments,
        uploadFiles,
        isUploading: attachments.some(a => a.status === 'uploading'),
        hasError: attachments.some(a => a.status === 'error')
    };
};
