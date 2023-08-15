import PropTypes from 'prop-types'
import { Col, Container, Row } from 'react-bootstrap';

function Pagination({ pages, current, onPageChange }) {
    return (
    <Container>
        <Row className='d-flex align-items-center'>
            <Col lg={12} sx={6} >
            <div>
            {pages > 0 && (
                <nav aria-label="" className="mt-4 mb-4">
                    <ul className="pagination pagination-md justify-content-center">
                        {current === 1 ? (
                            <li className="page-item disabled">
                                <span className="page-link" tabIndex="-1">Previous</span>
                            </li>
                        ) : (
                            <li className="page-item">
                                <button className="page-link" onClick={() => onPageChange(current - 1)} tabIndex="-1">Previous</button>
                            </li>
                        )}

                        {Array.from({ length: pages }).map((_, i) => (
                            <li key={i} className={`page-item page-numbers ${current === i + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => onPageChange(i + 1)}>
                                    {i + 1} 
                                </button>
                            </li>
                        ))}

                        {current >= pages ? (
                            <li className="page-item disabled">
                                <span className="page-link">Next</span>
                            </li>
                        ) : (
                            <li className="page-item">
                                <button className="page-link" onClick={() => onPageChange(current + 1)}>Next</button>
                            </li>
                        )}
                    </ul>
                </nav>
            )}
        </div>
            </Col>
        </Row>
    </Container>
    );
}

Pagination.propTypes = {
    pages: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;


