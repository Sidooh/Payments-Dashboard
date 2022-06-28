import { IMAGES } from 'constants/images';
import PropTypes from 'prop-types';

const CardBgCorner = ({corner}: { corner?: 1 | 2 | 3 | 4 | 5 }) => {
    // @ts-ignore
    const image = IMAGES.icons.spotIllustrations[`corner_${corner ?? 1}`];

    return <div className="bg-holder bg-card" style={{backgroundImage: `url(${image})`}}/>;
};

CardBgCorner.propTypes = {
    corner: PropTypes.number
};

export default CardBgCorner;
