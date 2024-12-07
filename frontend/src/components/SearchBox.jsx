import React, { useState } from 'react';
import { Form, Button, InputGroup, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchBox = ({ className }) => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  return (
    <Col md={6} className={className}>
      <Form onSubmit={submitHandler} className="w-100">
        <InputGroup>
          <Form.Control
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            placeholder="Search Products..."
            className="searchInput"
          />
          <Button type="submit" className="searchButton">
            <FaSearch />
          </Button>
        </InputGroup>
      </Form>
    </Col>
  );
};

export default SearchBox;
