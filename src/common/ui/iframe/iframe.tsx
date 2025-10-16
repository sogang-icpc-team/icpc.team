import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Loader } from "./loader";
import styled from "styled-components";

const Form = styled.iframe`
  display: block;

  margin: 0 auto;

  width: 740px;
  max-width: 100%;
`;

const IFrame = ({ admissionUrl }: { admissionUrl: string }) => {
  const [isIframeLoading, setIsIframeLoading] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <AnimatePresence>
        {isIframeLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={["opacity"]}
            transition={{ duration: 0.8 }}
            exit={{
              opacity: 0,
            }}
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>
      <Form
        src={admissionUrl}
        title="2025 SPC 신청"
        height={3327}
        scrolling="no"
        frameBorder={0}
        marginWidth={0}
        marginHeight={0}
        onLoad={() => setIsIframeLoading(false)}
      />
    </div>
  );
};

export default IFrame;