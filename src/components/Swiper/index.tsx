import { map } from "lodash";
import { Swiper as SwiperJS, SwiperSlide } from "swiper/react";
import { EffectCards, EffectCreative } from "swiper/modules";
import Card from "../Card";
import { SwiperProps } from "./props";
import { RecommendedUser } from "../../@types/commmon";
import { useMediaQuery, useTheme } from "@mui/material";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/effect-creative";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Swiper: React.FC<SwiperProps> = (props) => {
    const { slides } = props;
    // =============== REACT HOOKS
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

    // =============== VARIABLES
    const backgroundColor = isSmallScreen ? "#F5F5F5" : "white";

    // =============== RENDER FUNCTIONS
    const renderSwiperSlides = () => {
        return map(slides, (slide: RecommendedUser, index) => (
            <SwiperSlide
                key={index}
                style={{
                    background: backgroundColor,
                    borderRadius: "1.25rem",
                }}
            >
                <Card data={slide} />
            </SwiperSlide>
        ));
    };

    if (isSmallScreen) {
        return (
            <SwiperJS
                grabCursor
                effect={"creative"}
                creativeEffect={{
                    prev: {
                        shadow: true,
                        translate: ["-120%", 0, -500],
                    },
                    next: {
                        shadow: true,
                        translate: ["120%", 0, -500],
                    },
                }}
                modules={[EffectCreative]}
            >
                {renderSwiperSlides()}
                <SwiperSlide
                    style={{
                        background: "white",
                        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                        borderRadius: "1.25rem",
                        border: "1px solid rgba(0,0,0,0.1)",
                    }}
                >
                    <Card isEmpty={true} />
                </SwiperSlide>
            </SwiperJS>
        );
    }

    // =============== VIEWS
    return (
        <SwiperJS
            effect="cards"
            grabCursor
            modules={[EffectCards]}
            className="mySwiper"
        >
            {renderSwiperSlides()}
            <SwiperSlide
                style={{
                    background: backgroundColor,
                    borderRadius: "1.25rem",
                }}
            >
                <Card isEmpty={true} />
            </SwiperSlide>
        </SwiperJS>
    );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default Swiper;
