import { map } from "lodash";
import { Swiper as SwiperJS, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import Card from "../Card";
import { SwiperProps } from "./props";
import "swiper/css";
import "swiper/css/effect-cards";
import { RecommendedUser } from "../../@types/commmon";
/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Swiper: React.FC<SwiperProps> = (props) => {
    const { slides } = props;
    // =============== RENDER FUNCTIONS
    const renderSwiperSlides = () => {
        return map(slides, (slide: RecommendedUser) => (
            <SwiperSlide
                style={{
                    background: "white",
                }}
            >
                <Card data={slide} />
            </SwiperSlide>
        ));
    };

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
                    background: "white",
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
