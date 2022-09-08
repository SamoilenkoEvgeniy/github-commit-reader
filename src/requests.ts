import { Octokit } from '@octokit/core';
import { Endpoints } from '@octokit/types';

type listUserRepoCommitsResponse = Endpoints["GET /repos/{owner}/{repo}/commits"]["response"];
export type AllCommitsResponse = listUserRepoCommitsResponse['data'];
export type AllCommitsRequestParams = Endpoints["GET /repos/{owner}/{repo}"]["parameters"];

export const fetchAllCommitsFromRepo = async (options: AllCommitsRequestParams, userKey: string): Promise<AllCommitsResponse> => {
    const octokit = new Octokit({
        auth: userKey,
    })

    try {
        const result = await octokit.request('GET /repos/{owner}/{repo}/commits', options);
        return await result.data;
    } catch (e) {
        throw new Error(String(e));
    }
}
