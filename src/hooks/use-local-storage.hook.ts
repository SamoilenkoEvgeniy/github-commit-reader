import { useEffect, useState } from 'react';
import { getStorageValue } from '../utils';

export const useLocalStorageHook = (key: string) => {
    const [ value, setValue ] = useState<string>('');

    useEffect(() => {
        const value = getStorageValue(key, '');
        if (value) setValue(value);
    }, []);

    return value ;
}
