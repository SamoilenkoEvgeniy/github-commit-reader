import React, { useEffect, useState } from 'react';

import { Title, Wrapper } from './styles';

import { CommitList } from './components';
import { AllCommitsResponse, fetchAllCommitsFromRepo } from './requests';

function App() {
    const [ commits, setCommits ] = useState<AllCommitsResponse>([]);

    useEffect(() => {
        (async () => {
            const commits = await fetchAllCommitsFromRepo({
                owner: 'angular',
                repo: 'angular',
            });
            setCommits(commits);
        })();
    }, [])

    return (
        <Wrapper>
            <Title>
                Hello World!
            </Title>
            <CommitList commits={commits}/>
        </Wrapper>
    );
}

export default App;
