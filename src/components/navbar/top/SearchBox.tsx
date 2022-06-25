import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CloseButton from 'components/common/CloseButton';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
