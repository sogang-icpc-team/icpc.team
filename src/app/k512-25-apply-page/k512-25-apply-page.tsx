import styled from "styled-components";
import { EmptyLink } from "@ui/button/empty-link";
import { routes } from "../../routes/routes";
import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import { FlexCol } from "@ui/flex/flex";

const admissionUrl = "https://docs.google.com/forms/d/e/1FAIpQLSd-cZiYuSNUA342q2m7U-TzOi8woOJq4OcDTvM6H-5bpUC6SA/viewform?embedded=true";

const Page = styled.div`
  background: linear-gradient(60deg, #bac1ff, #ffc9c9);
`;

const Gap = styled.div`
  height: 80px;
`;

const TitleWrapper = styled(FlexCol)`
  align-items: center;
  font-family: Pretendard;
  gap: 1rem;
`;

const Title = styled.span`
  text-align: center;
  font-size: 2.2rem;
  font-weight: 900;
`;

const SubTitle = styled.span`
  font-weight: 500;
  font-size: 0.9rem;
  letter-spacing: 0.2rem;
`;

const DateLocationWrapper = styled(FlexCol)`
  margin-top: 3rem;
  align-items: center;
  font-family: Pretendard;
  gap: 0.4rem;
  margin-bottom: 2rem;
`;

const Info = styled.span`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 900;
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

const IFrame = styled.iframe`
  display: block;
  margin: 0 auto;
  width: 740px;
  max-width: 100%;
  height: 3300px;
`;

const K512ApplyPage = () => {
  return (
    <Page>
      <Gap></Gap>
      <GoBackIcon to={routes.spc.path()}>
        <ArrowLeftIcon width={17} />
        <span>이전으로 돌아가기</span>
      </GoBackIcon>
      <TitleWrapper>
        <Title>
          2025<br />
          서강대학교 K512컵
        </Title>
        <SubTitle>
          프로그래밍 대회
        </SubTitle>
      </TitleWrapper>
      <DateLocationWrapper>
        <Info>
          5.24[토] 오후 2:30-5:30
        </Info>
        <Info>
          다산관 D104/105
        </Info>
      </DateLocationWrapper>
      <IFrame 
        src={admissionUrl} 
        title="2025 K512컵 신청"
        scrolling="no"
      />
    </Page>
  );
}

export default K512ApplyPage;