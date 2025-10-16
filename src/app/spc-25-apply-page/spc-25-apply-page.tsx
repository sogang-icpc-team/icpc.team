import styled, { createGlobalStyle, css } from "styled-components";

import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";

import { EmptyLink } from "@ui/button/empty-link";
import { FlexCol, FlexRow } from "@ui/flex/flex";
import { OpenInANewTab } from "@ui/open-in-a-new-tab";

import { routes } from "../../routes/routes";

import LogoSvg from "@ui/assets/logo-crimson.svg";
import IFrame from "@ui/iframe/iframe";

const admissionUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSfTatVYc3_e83678OVtDkyn26fHv3eEx9B6odVVdh-9At6UWQ/viewform?embedded=true";

const BodyStyles = createGlobalStyle`
  * {
    position: relative;
  }
  
  body {
    max-width: unset;
  }

  @media (max-width: 1000px) {
    html {
      font-size: 85%;
    }
  }

  @media (max-width: 800px) {
    html {
      font-size: 60%;
    }
  }
`;

const _LogoImg = ({
  className,
  src,
  alt,
}: {
  height?: string;
  className?: string;
  src: string;
  alt: string;
}) => {
  return (
    <div className={className}>
      <img src={src} alt={alt} />
    </div>
  );
};

const LogoImg = styled(_LogoImg).withConfig({
  shouldForwardProp: (prop) => !["height"].includes(prop),
})`
  ${({ height }) => css`
    height: ${height ?? "2.5rem"};
  `}

  img {
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`;

const BackgroundText = styled.span<{ top: number, position: "left" | "right" }>`
  position: absolute;
  font-weight: 900;
  font-size: 85vw;
  top: ${({ top }) => top * 30 - 16}vw;
  color: rgb(249, 239, 239);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  ${({ position }) => position === "left" ? 
  css`
    left: -2.4rem;
  ` : 
  css`
    right: -2.4rem;
  `}
`;

const GoBackIcon = styled(EmptyLink)`
  z-index: 1000;

  position: absolute;
  top: 2rem;
  left: 2.4rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;

  span {
    font-size: 1rem;
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 0.3rem;
  }
`;

const SubTitle = styled.span`
  font-family: "sogang";
  font-size: 1.6rem;
`;

const Title = styled.span`
  font-family: "sogang";
  font-size: 4.4rem;

  word-break: keep-all;
  text-align: center;
`;

const TitleWrapper = styled(FlexCol)`
  align-items: center;
  padding-top: 7.2rem;
  gap: 1.2rem;
`;

const DateLocationWrapper = styled(FlexCol)`
  margin-top: 4.2rem;
  gap: 0.4rem;
  align-items: center;
`;

const InfoValue = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: 1.6rem;
  margin-left: 0.4rem;
`;

const Label = styled.span`
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};

  text-align: center;
  margin-top: 4.4rem;
  margin-bottom: 1.2rem;

  @media (max-width: 800px) {
    font-size: 1.6rem;
  }
`;
const Sup = styled.span`
  vertical-align: super;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const OpenFormInNewTab = styled(OpenInANewTab)`
  font-size: 0.9rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: gray;

  @media (max-width: 800px) {
    font-size: 1.2rem;
  }
`;

const _Spc25ApplyPage = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <BodyStyles />

      <GoBackIcon to={routes.spc.path()}>
        <ArrowLeftIcon width={17} />
        <span>이전으로 돌아가기</span>
      </GoBackIcon>

      <BackgroundText top={0} position="left">S</BackgroundText>
      <BackgroundText top={1} position="right">P</BackgroundText>
      <BackgroundText top={2} position="left">C</BackgroundText>

      <TitleWrapper>
        <SubTitle>Sogang Programming Contest 2025</SubTitle>
        <Title>서강대학교 프로그래밍 대회</Title>
      </TitleWrapper>

      <DateLocationWrapper>
        <FlexRow>
          <LogoImg src={LogoSvg} alt="logo" height="1.8rem" />
          <InfoValue>11월 8일 토요일 오후 2-6시</InfoValue>
        </FlexRow>
        <FlexRow>
          <LogoImg src={LogoSvg} alt="logo" height="1.8rem" />
          <InfoValue>다산관 D104/105</InfoValue>
        </FlexRow>
      </DateLocationWrapper>

      <FlexCol style={{ width: "100%" }}>
        <Label>
          참가신청 <Sup>~11/2(일)까지</Sup>
          <br />
          <OpenFormInNewTab href={admissionUrl}>
            폼이 보이지 않나요?{" "}
            <ArrowTopRightOnSquareIcon style={{ width: "1rem" }} width={12} />
          </OpenFormInNewTab>
        </Label>
        <IFrame
          admissionUrl={admissionUrl}
        />
      </FlexCol>
    </div>
  );
};

export const Spc25ApplyPage = styled(_Spc25ApplyPage)`
  position: relative;
  overflow: hidden;
  background: rgb(251, 248, 248);
`;