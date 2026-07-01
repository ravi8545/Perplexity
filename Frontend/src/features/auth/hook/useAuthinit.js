import { useEffect } from 'react';
import { useAuth } from './useAuth';

export function useAuthinit() {
    const { handleGetMe } = useAuth();

    useEffect(() => {
        console.log('useAuthinit: Checking user session on app load...');
        handleGetMe();
    }, []); // Only run once on app mount
}
