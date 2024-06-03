import { IMAGES } from '@/constants/images';
import PropTypes from 'prop-types';

const CardBgCorner = ({ corner }: { corner?: 1 | 2 | 3 | 4 | 5 }) => {
    // @ts-ignore
    const image = IMAGES.icons.spotIllustrations[`corner_${corner ?? 1}`];

    return (
        <div
            className="absolute w-full min-h-full overflow-hidden will-change-[transform,opacity,filter] bg-no-repeat z-0 left-0 top-0 bg-contain bg-right rounded-tr-md rounded-br-md"
            style={{ backgroundImage: `url(${image})` }}
        />
    );
};

CardBgCorner.propTypes = {
    corner: PropTypes.number,
};

export default CardBgCorner;
