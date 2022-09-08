import React from 'react';

import { CommitCard, CommitInfo, CommitInfoAuthor, CommitInfoDate, CommitListWrapper, CommitMessage } from './styles';

import { AllCommitsResponse } from '../../requests';

interface CommitListProps {
    commits: AllCommitsResponse
}

export const CommitList = ({ commits }: CommitListProps) => {
    return (
        <CommitListWrapper>
            {commits.map((commit) => (
                <CommitCard key={commit.sha}>
                    <CommitMessage>
                        {getCommitMessage(commit.commit.message)}
                    </CommitMessage>
                    <CommitInfo>
                        <CommitInfoDate>
                            {getCommitDate(commit.commit.author?.date)}
                        </CommitInfoDate>{' '}by{' '}
                        <CommitInfoAuthor>
                            {commit.commit.author?.name}
                        </CommitInfoAuthor>
                    </CommitInfo>
                </CommitCard>
            ))}
        </CommitListWrapper>
    )
}

const getCommitMessage = (message: string) => message.split(/\r?\n/)[0];
const getCommitDate = (date: string | undefined) =>  date ? new Date(date).toDateString() : '';
