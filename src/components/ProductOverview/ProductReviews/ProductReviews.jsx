import React, { useContext, useState  } from 'react'
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../../context/ProductContext/ProductState';
import { UserContext } from '../../../context/UserContext/UserState';
import './ProductReviews.scss'

const ProductReviews = (props) => {
    const { product, createReview, getProduct } = useContext(ProductContext);
    const { token } = useContext(UserContext);
    const [ showForm, setShowForm ] = useState(false)
    const [ data, setData ] = useState({
        content: '',
        rating: 1
    })
    const navigate = useNavigate();

    const sendReview = async (e) => {
        e.preventDefault();
        await createReview( data.content, data.rating, product.id );
        setData({content: '', rating: 1});
        setShowForm(false);
        getProduct(product.id);
    }

    const showFormReview = () => {
        if(token) {
            setShowForm(true);
        } else {
            navigate('/login');
        }
    }

    const reviewsLIst = product.Reviews.map( (review, idx) => {
        return (
            <div key={idx} className='user-review'>
                <div className="header d-flex">
                    <span className="author">{review.User.name}</span>
                    <div className="header-separator">-</div>
                    <div className="review-stars">
                        {[1, 2, 3, 4, 5].map((number, idx) =>
                            number <= review.rating ? (
                                <span
                                    key={idx}
                                    className="fa fa-star checked"
                                ></span>
                            ) : (
                                <span key={idx} className="fa fa-star"></span>
                            )
                        )}
                    </div>
                </div>
                <div className='content'>
                    { review.content }
                </div>
            </div>
        )
    })
    return (
        <>
            { 
                showForm 
                ?   <div>
                        <form className="form-writeReview" onSubmit={sendReview}>
                            <div>
                                <div className="rating-review">
                                    <b>Rating:</b>
                                    <div id="review-stars">
                                        {[1, 2, 3, 4, 5].map((number, idx) =>
                                            number <= data.rating ? (
                                                <span
                                                    onClick={() => setData({...data, rating: number})}
                                                    key={idx}
                                                    role="button"
                                                    className="fa fa-star checked"
                                                ></span>
                                            ) : (
                                                <span onClick={() => setData({...data, rating: number})} role="button" key={idx} className="fa fa-star"></span>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                            <textarea className="form-control textarea-review" rows="3" value={data.content} onChange={(e) => setData({...data, content: e.target.value})} placeholder="Write your review here..."></textarea>
                            <div className="buttons-review">
                                <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Close</button>
                                <button className="btn btn-primary">Send</button>
                            </div>
                        </form>
                    </div>
                :   <div className='d-flex justify-content-center p-4'>
                        <button className='btn btn-primary' onClick={showFormReview}>Create your own review</button>
                    </div>
                }
            <div className='review-container'>
                { reviewsLIst }
            </div>
        </>
    )
}

export default ProductReviews
