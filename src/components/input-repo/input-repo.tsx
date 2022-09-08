import { useState } from 'react';
import { InputRepoWrapper } from './styles';
import { AllCommitsRequestParams } from '../../requests';

interface InputRepoProps {
    setErrorState: (value: string) => void;
    repoUpdated: (repo: AllCommitsRequestParams) => void
}

export const InputRepo = ({
                              repoUpdated,
                              setErrorState
                          }: InputRepoProps) => {
    const [ repo, setRepo ] = useState<string>();
    const parseRepo = () => {
        const urlPieces = repo?.split('/');

        if (!urlPieces || urlPieces.length < 4) {
            setErrorState('The url is incorrect');
            return;
        }

        repoUpdated({
            owner: urlPieces[3],
            repo: urlPieces[4],
        });
    }

    return (
        <>
            <InputRepoWrapper>
                <input placeholder='Please, input repo which commits you want to see'
                       onChange={e => setRepo(e.target.value)}/>
                <button onClick={parseRepo}>Load commits</button>
            </InputRepoWrapper>

        </>
    )
}
