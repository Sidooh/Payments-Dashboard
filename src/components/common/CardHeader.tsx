import { memo, ReactNode } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import classNames from 'classnames';

type TitleType = {
    breakPoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
    titleTag?: 'h5' | string,
    className?: string,
    children?: ReactNode
};

type CardHeaderType = {
    title: ReactNode,
    light?: boolean,
    breakPoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
    endEl?: ReactNode
    titleTag?: any
    titleClass?: string,
    className?: string,
    children?: ReactNode
};

const Title = ({titleTag: TitleTag = 'h5', className, breakPoint, children}: TitleType) => (
    // @ts-ignore
    <TitleTag className={classNames({'mb-0': !breakPoint, [`mb-${breakPoint}-0`]: !!breakPoint}, className)}>
        {children}
    </TitleTag>
);

const CardHeader = ({
    title,
    light,
    titleTag,
    titleClass,
    className,
    breakPoint,
    endEl,
    children
}: CardHeaderType) => (
    <Card.Header className={classNames(className, {'bg-light': light})}>
        {endEl ? (
            <Row className="align-items-center">
                <Col>
                    <Title
                        breakPoint={breakPoint}
                        titleTag={titleTag}
                        className={titleClass}
                    >
                        {title}
                    </Title>
                    {children}
                </Col>
                <Col
                    {...{[breakPoint ? breakPoint : 'xs']: 'auto'}}
                    className={`text${breakPoint ? `-${breakPoint}` : ''}-right`}
                >
                    {endEl}
                </Col>
            </Row>
        ) : (
            <Title breakPoint={breakPoint} titleTag={titleTag} className={titleClass}>
                {title}
            </Title>
        )}
    </Card.Header>
);

export default memo(CardHeader);
