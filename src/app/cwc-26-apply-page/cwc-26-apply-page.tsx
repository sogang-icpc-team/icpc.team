import styled from "styled-components";
import { EmptyLink } from "@ui/button/empty-link";
import { routes } from "../../routes/routes";
import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import { FlexCol } from "@ui/flex/flex";

const admissionUrl = "https://docs.google.com/forms/d/e/1FAIpQLSedSbkvON_HMyNniP0KW-xJB4WcWtyLUTgnO39caexf2Atk1Q/viewform?embedded=true";

const Page = styled.div`
  background: #eaf5ff;
`;

const Gap = styled.div`
  height: 80px;
`;

const TitleWrapper = styled(FlexCol)`
  align-items: center;
  gap: 1rem;
`;

const Title = styled.span`
  text-align: center;
  font-size: 2.4rem;
  font-weight: 900;
  color: #0099ff;
  word-break: keep-all;
  text-align: center;
`;

const DateLocationWrapper = styled(FlexCol)`
  margin-top: 3rem;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 3rem;
  color: #2dabff;
  font-family: "Pretendard";
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

const Cwc26ApplyPage = () => {
  return (
    <Page>
      <Gap></Gap>
      <GoBackIcon to={routes.spc.path()}>
        <ArrowLeftIcon width={17} />
        <span>이전으로 돌아가기</span>
      </GoBackIcon>
      <TitleWrapper>
        <Title>
          2026<br/>
          청정수컵 프로그래밍 대회
        </Title>
      </TitleWrapper>
      <DateLocationWrapper>
        <Info>
          🎡 5.23(토) 오후 2:00-5:00
        </Info>
        <Info>
          🎡 다산관 D104/105
        </Info>
      </DateLocationWrapper>
      <IFrame 
        src={admissionUrl} 
        title="2026 청정수컵 신청"
        scrolling="no"
      />
    </Page>
  );
}

export default Cwc26ApplyPage;