import { Octokit } from '@octokit/core';
import { Endpoints } from '@octokit/types';

const octokit = new Octokit({
    auth: process.env.REACT_APP_GITHUB_PRIVATE_KEY,
})

type listUserReposParameters = Endpoints["GET /repos/{owner}/{repo}"]["parameters"];
type listUserRepoCommitsResponse = Endpoints["GET /repos/{owner}/{repo}/commits"]["response"];
export type AllCommitsResponse = listUserRepoCommitsResponse['data'];

export const fetchAllCommitsFromRepo = async (options: listUserReposParameters): Promise<AllCommitsResponse> => {
    const result = await octokit.request('GET /repos/{owner}/{repo}/commits', options);
    return await result.data;
}
