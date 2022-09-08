import React, { useCallback, useEffect, useState } from 'react';

import { ErrorText, Title, Wrapper } from './styles';

import { getStorageValue } from './utils';
import { USER_GITHUB_PRIVATE_KEY } from './settings';
import { CommitList, InputUserKey } from './components';
import { AllCommitsRequestParams, AllCommitsResponse, fetchAllCommitsFromRepo } from './requests';
import { InputRepo } from './components/input-repo/input-repo';

function App() {
    const [ commits, setCommits ] = useState<AllCommitsResponse>([]);
    const [ requestProblem, setRequestProblem ] = useState<boolean>(false);
    const [ repo, setRepo ] = useState<AllCommitsRequestParams | null>(null);
    const [ userKey, setUserKey ] = useState<string>(() => getStorageValue(USER_GITHUB_PRIVATE_KEY, ''));

    const [errorState, setErrorState] = useState<string | null>(null);

    const onKeySet = useCallback(() => {
        setUserKey(getStorageValue(USER_GITHUB_PRIVATE_KEY, ''));
    }, []);

    useEffect(() => {
        if (!userKey || !repo) return;

        (async () => {
            try {
                setErrorState('');
                setRequestProblem(false);
                const commits = await fetchAllCommitsFromRepo(repo, userKey);
                setCommits(commits);
            } catch (e) {
                setErrorState(String(e));
                setRequestProblem(true);
            }
        })();
    }, [ userKey, repo ]);

    return (
        <Wrapper>
            <Title>
                Hello World!
            </Title>
            <InputRepo
                setErrorState={setErrorState}
                repoUpdated={(value) => setRepo(value)}
            />
            {!userKey || requestProblem && (<InputUserKey currentKey={userKey} onKeySet={onKeySet}/>)}
            {(errorState && <ErrorText>{errorState}</ErrorText>)}
            <CommitList commits={commits}/>
        </Wrapper>
    );
}

export default App;
