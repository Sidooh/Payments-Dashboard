import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from 'app/hooks';

type CloseButtonType = {
    size: 'sm' | 'lg',
    noOutline?: boolean,
    variant?: 'white', // use 'white' for white variant
    onClick: () => void,
    className?: string
};

const CloseButton = ({
    size,
    onClick,
    noOutline,
    variant,
    className,
    ...rest
}: CloseButtonType) => {
    const {isDark} = useAppSelector(state => state.theme);

    return (
        <Button
            variant={variant ? variant : isDark ? 'white' : undefined}
            className={`${className} ${size && 'btn-${size}'} ${noOutline && 'outline-none'}`}
            onClick={onClick}
            {...rest}
        />
    );
};

const SearchBox = () => {
    const [searchInputValue, setSearchInputValue] = useState('');

    return (
        <Form className="search-box position-relative">
            <Form.Control
                type="search"
                placeholder="Search..."
                aria-label="Search"
                className="rounded-pill search-input"
                value={searchInputValue}
                onChange={({target}) => setSearchInputValue(target.value)}
            />
            <FontAwesomeIcon icon={faSearch} className="position-absolute text-400 search-box-icon"/>
            {searchInputValue && (
                <div className="search-box-close-btn-container">
                    <CloseButton size="sm" noOutline onClick={() => setSearchInputValue('')}/>
                </div>
            )}
        </Form>
    );
};

export default SearchBox;
