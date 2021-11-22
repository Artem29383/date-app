import styled from "styled-components";

export const Root = styled.article`
  width: 100%;
  padding-top: 32px;
`;

export const Profile = styled.div`
  width: 100%;
  display: flex;
`;

export const Button = styled.button`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  color: #0095f6;
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
`;

export const Name = styled.h1`
  font-size: 20px;
  line-height: 22px;
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ProfileActions = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 18px;
  line-height: 24px;
  font-weight: 600;
  padding: 21px;
  text-align: center;
`;

export const ButtonModal = styled.button<{ color: string; fw: string }>`
  border-top: 1px solid #dbdbdb;
  padding: 16px;
  position: relative;
  text-align: center;
  color: ${({ color }) => color};
  font-weight: ${({ fw }) => fw};
`;
