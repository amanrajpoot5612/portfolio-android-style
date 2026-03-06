import React, { useEffect } from "react";
import bootAnimation from "../../assets/boot-animation.gif";
import bootAnimation1 from "../../assets/test.mp4";
import bootAnimation2 from "../../assets/test-2.mp4";
import bootAnimation3 from "../../assets/test-3.mp4";
import { useNavigate } from "react-router-dom";

const Boot = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home", { replace: true });
    }, 7000);

    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <section className="relative h-full w-full bg-black overflow-hidden rounded-xl">
      <video
        src={bootAnimation3}
        autoPlay="true"
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
    </section>
  );
};

export default Boot;
