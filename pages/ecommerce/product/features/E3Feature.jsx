import AnalogImg from "assets/E1/analog.png";
import Win11Img from "assets/E1/win11.png";
import BezelsImg from "assets/E1/bezels.png";
import FullHDImg from "assets/E1/full-hd.png";
import IntelImg from "assets/E1/intel.png";
import WifiImg from "assets/E1/wifi.png";
import LightPcImg from "assets/E1/light-pc.jpg";
import { Fade } from "react-awesome-reveal";
import ItemImage from "./ItemImage";

const E3Feature = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-4">
      <div className="flex flex-col gap-4">
        <Fade direction="left">
          <ItemImage
            img={AnalogImg}
            label={
              <p
                className={`absolute text-center text-[24px] min-[450px]:text-[42px] lg:text-[40px] xl:text-[50px] font-bold`}
              >
                Mic Bulit-in, Analog microphone
              </p>
            }
          />
        </Fade>
        <Fade direction="left">
          <ItemImage
            img={BezelsImg}
            label={
              <div className={`absolute text-center flex flex-col`}>
                <p className="text-[42px] lg:text-[66px] font-bold">
                  Narrow Bezel
                </p>
                <p className="text-[24px] lg:text-4xl font-bold">
                  Anti-glare display
                </p>
              </div>
            }
          />
        </Fade>
        <Fade direction="left">
          <ItemImage
            img={FullHDImg}
            label={
              <p
                className={`absolute text-center font-bold text-[32px] min-[450px]:text-[36px] lg:text-[50px] bottom-4`}
              >
                15.6inch, full HD 1920*1080
              </p>
            }
          />
        </Fade>
        <Fade direction="left">
          <ItemImage
            img={IntelImg}
            label={
              <div className={`absolute text-center left-8 flex flex-col`}>
                <p className="text-[42px] lg:text-[50px] font-bold">
                  Intel i5-13th generation
                </p>
                <p className="text-[24px] lg:text-3xl font-bold">
                  2.4Ghz to Turbo 4.2Ghz
                </p>
              </div>
            }
          />
        </Fade>
      </div>
      <div className="flex flex-col gap-4">
        <Fade direction="right">
          <ItemImage
            img={Win11Img}
            label={
              <p
                className={`absolute text-center text-[42px] lg:text-[60px] font-medium`}
              >
                Windows 11 Pro
              </p>
            }
          />
        </Fade>
        <Fade direction="right">
          <ItemImage
            img={FullHDImg}
            label={
              <div className={`absolute text-center bottom-4 flex flex-col`}>
                <p className="font-bold text-[32px] min-[450px]:text-[42px] lg:text-[66px]">
                  5000mah
                </p>
                <p className="font-bold text-[18px] min-[450px]:text-[24px] lg:text-[31px]">
                  Lathium-ion polymer battery
                </p>
              </div>
            }
          />
        </Fade>
        <Fade direction="right">
          <ItemImage
            img={WifiImg}
            label={
              <div
                className={`absolute left-8 flex flex-col text-[24px] min-[450px]:text-[28px] xl:text-[40px]`}
              >
                <p className="font-bold">Dual band wifi</p>
                <p className="font-medium">2.4GHz and 5GHz</p>
              </div>
            }
          />
        </Fade>
        <Fade direction="right">
          <ItemImage
            img={LightPcImg}
            label={
              <p className="absolute text-white font-bold text-[28px] min-[450px]:text-[32px] xl:text-[44px] top-3">
                Thin and light{" "}
                <span className="text-[16px] xl:text-xl">1.68Kg</span>
              </p>
            }
          />
        </Fade>
      </div>
    </div>
  );
};

export default E3Feature;
