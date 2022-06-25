import { memo, ReactNode } from 'react';
import classNames from 'classnames';
import { Container } from 'react-bootstrap';

type SectionType = {
    fluid?: boolean,
    bg?: string,
    image?: string,
    overlay?: boolean | string,
    position?: string | {
        x?: string,
        y?: string
    }
    video?: string[],
    bgClassName?: string,
    className?: string,
    children?: ReactNode
};

const Section = ({
    fluid = false,
    bg,
    image,
    overlay,
    position,
    video,
    bgClassName,
    className,
    children,
    ...rest
}: SectionType) => {
    const bgProps = {image, overlay, position, video, className};
    bgClassName && (bgProps.className = bgClassName);

    return (
        <section className={classNames({[`bg-${bg}`]: bg}, className)} {...rest}>
            <Container fluid={fluid}>{children}</Container>
        </section>
    );
};

export default memo(Section);
