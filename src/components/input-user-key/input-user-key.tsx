import { useMemo, useState } from 'react';

import { setStorageValue } from '../../utils';
import { InputUserKeyWrapper } from './styles';
import { USER_GITHUB_PRIVATE_KEY } from '../../settings';

interface InputUserKeyProps {
    currentKey: string,
    onKeySet: () => void
}

export const InputUserKey = ({ onKeySet, currentKey }: InputUserKeyProps) => {
    const [ key, setKey ] = useState<string>(currentKey);
    const getLabel = useMemo(() => currentKey ? 'change' : 'save', [currentKey]);

    const save = () => {
        setStorageValue(USER_GITHUB_PRIVATE_KEY, key);
        onKeySet();
    };

    return (
        <InputUserKeyWrapper>
            <input type="url" placeholder='Please, put your key there' defaultValue={currentKey} onChange={e => setKey(e.target.value)}/>
            <button onClick={save}>{getLabel}</button>
        </InputUserKeyWrapper>
    )
}
