import { ReactNode } from "react";
import Header from "../components/header/header";
import LeadCaptureForm from "../components/leadcapture/leadCapture";
import Footer from "../components/footer/footer";

export const PageLayout = (props: { children?: ReactNode}) => {
  return (
    <div className="force-height">
      <Header/>
      {props.children}
      <LeadCaptureForm />
      <Footer />
    </div>
  );
};