import styled from 'styled-components';

export const CommitListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 760px;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    width: 6px;
    background-color: Salmon;
    top: 20px;
    bottom: 0;
    left: -32px;
    margin-left: -3px;
  }
`

export const CommitCard = styled.div`
  position: relative;
  
  padding: 12px;
  margin-bottom: 24px;
  
  border: 1px solid Salmon;
  border-radius: 4px;
  
  &:after {
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    left: -50px;
    background-color: white;
    border: 4px solid Salmon;
    top: 15px;
    border-radius: 50%;
    z-index: 1;
  }

  &:before {
    content: " ";
    height: 0;
    position: absolute;
    top: 22px;
    width: 0;
    z-index: 1;
    border: medium solid Salmon;
    border-width: 10px 10px 10px 0;
    border-color: transparent Salmon transparent transparent;
    left: -11px;
  }
`

export const CommitMessage = styled.div`
    margin-bottom: 12px;
`

export const CommitInfo = styled.div`
`

export const CommitInfoDate = styled.span`
`

export const CommitInfoAuthor = styled.span`
`
