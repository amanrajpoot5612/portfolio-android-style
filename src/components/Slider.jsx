import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// 📁 Projects
// 💬 Contact
// 📧 Gmail
// 📞 Phone
// 🌐 Browser
import instagram from "../assets/apps/instagram.svg";
import cameraImg from "../assets/apps/camera.png";
import filesImg from "../assets/apps/files.png";
import galleryImg from "../assets/apps/gallery.png";
import chromeImg from "../assets/apps/chrome.png";
import pdfImg from "../assets/apps/pdf.png";
import gmailImg from "../assets/apps/gmail.png";

const Slider = ({ className }) => {
  const slide1 = {
    0: { name: "Camera", icon: instagram },
    1: { name: "Projects", icon: filesImg },
    2: { name: "Gallery", icon: galleryImg },
    3: { name: "About", icon: chromeImg },
    4: { name: "Resume", icon: pdfImg },
    5: { name: "Contact", icon: gmailImg },
  };
  const slide2 = {
    0: { name: "Camera", icon: instagram },
    1: { name: "Projects", icon: filesImg },
    2: { name: "Gallery", icon: galleryImg },
    3: { name: "About", icon: chromeImg },
    4: { name: "Resume", icon: pdfImg },
    5: { name: "Contact", icon: gmailImg },
  };
  const slide3 = {
    0: { name: "Camera", icon: instagram },
    1: { name: "Projects", icon: filesImg },
    2: { name: "Gallery", icon: galleryImg },
    3: { name: "About", icon: chromeImg },
    4: { name: "Resume", icon: pdfImg },
    5: { name: "Contact", icon: gmailImg },
  };
  return (
    <Swiper spaceBetween={30} slidesPerView={1} className={className}>
      <SwiperSlide>
        <div className="h-full grid grid-cols-5 grid-rows-7 gap-2 p-2">
          {Array.from({ length: 35 }).map((_, i) => {
            const app = slide1[i];

            return (
              <div key={i} className="flex items-center justify-center">
                {app ? (
                  <div className="flex flex-col items-center gap-1">
                    <div className="p-1 rounded-2xl bg-black/20 backdrop-blur-md cursor-pointer">
                      <img
                        src={app.icon}
                        alt={app.name}
                        className="w-full aspect-square object-contain drop-shadow-lg"
                      />
                    </div>

                    <span className="text-[10px] text-white drop-shadow-md">
                      {app.name}
                    </span>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="h-full grid grid-cols-5 grid-rows-7 gap-2 p-2">
          {Array.from({ length: 35 }).map((_, i) => {
            const app = slide2[i];

            return (
              <div key={i} className="flex items-center justify-center">
                {app ? (
                  <div className="flex flex-col items-center gap-1">
                    <div className="p-1 rounded-2xl bg-black/20 backdrop-blur-md cursor-pointer">
                      <img
                        src={app.icon}
                        alt={app.name}
                        className="w-full aspect-square object-contain drop-shadow-lg"
                      />
                    </div>

                    <span className="text-[10px] text-white drop-shadow-md">
                      {app.name}
                    </span>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="h-full grid grid-cols-5 grid-rows-7 gap-2 p-2">
          {Array.from({ length: 35 }).map((_, i) => {
            const app = slide3[i];

            return (
              <div key={i} className="flex items-center justify-center">
                {app ? (
                  <div className="flex flex-col items-center gap-1">
                    <div className="p-1 rounded-2xl bg-black/20 backdrop-blur-md cursor-pointer">
                      <img
                        src={app.icon}
                        alt={app.name}
                        className="w-full aspect-square object-contain drop-shadow-lg"
                      />
                    </div>

                    <span className="text-[10px] text-white drop-shadow-md">
                      {app.name}
                    </span>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
