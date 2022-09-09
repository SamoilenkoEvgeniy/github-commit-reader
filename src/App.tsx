import React, { useCallback, useState } from 'react';

import { ErrorText, Title, Wrapper } from './styles';

import { getStorageValue } from './utils';
import { USER_GITHUB_PRIVATE_KEY } from './settings';
import { CommitList, InputUserKey } from './components';
import { InputRepo } from './components/input-repo/input-repo';
import { RefreshCommits } from './components/refresh-commits/refresh-commits';
import { AllCommitsRequestParams, AllCommitsResponse, fetchAllCommitsFromRepo } from './requests';

function App() {
    const [ commits, setCommits ] = useState<AllCommitsResponse>([]);
    const [ userKey, setUserKey ] = useState<string>(() => getStorageValue(USER_GITHUB_PRIVATE_KEY, ''));

    const [ repo, setRepo ] = useState<AllCommitsRequestParams | null>(null);
    const [ errorState, setErrorState ] = useState<string | null>(null);
    const [ fetchError, setFetchError ] = useState<boolean>(false);

    const onKeySet = useCallback(() => {
        setUserKey(getStorageValue(USER_GITHUB_PRIVATE_KEY, ''));
    }, []);

    const fetchCommits = useCallback(async (repo: AllCommitsRequestParams) => {
        if (!userKey) return;

        try {
            setErrorState('');
            setFetchError(false);
            const commits = await fetchAllCommitsFromRepo(repo, userKey);
            setCommits(commits);
        } catch (e) {
            setErrorState(String(e));
            setFetchError(true);
        }
    }, [ userKey ]);

    const onRepoSet = useCallback(async (value: AllCommitsRequestParams) => {
        setRepo(value);
        await fetchCommits(value);
    }, [ fetchCommits ]);

    const onRefresh = useCallback(async () => {
        if (!repo) return;
        await fetchCommits(repo);
    }, [ repo, fetchCommits ]);

    return (
        <Wrapper>
            <Title>
                Hello World!
            </Title>
            {!repo && (
                <InputRepo
                    setErrorState={setErrorState}
                    repoUpdated={onRepoSet}
                />
            )}
            {(!userKey || fetchError) && (<InputUserKey currentKey={userKey} onKeySet={onKeySet}/>)}
            {(errorState && <ErrorText>{errorState}</ErrorText>)}
            {commits.length > 0 && <RefreshCommits onRefresh={onRefresh}/>}
            <CommitList commits={commits}/>
        </Wrapper>
    );
}

export default App;
