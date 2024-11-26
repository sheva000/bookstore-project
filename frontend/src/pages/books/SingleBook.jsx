import React, { useEffect } from 'react';
import { FaCartShopping } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/bookAPI';

const SingleBook = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading book info</div>;

    return (
        <div className="max-w-4xl mx-auto shadow-md p-6 flex flex-col gap-8 border-2">
            {/* Book Title */}
            <div className='border-b-2 border-black'>
                <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
            </div>
            

            {/* Content Wrapper */}
            <div className="flex flex-col md:flex-row items-start gap-8">
                {/* Book Image */}
                <div className="flex-shrink-0">
                    <img
                        src={`${getImgUrl(book.coverImage)}`}
                        alt={book.title}
                        className="w-64 h-auto rounded-lg shadow-lg"
                    />
                </div>

                {/* Book Info */}
                <div className="flex flex-col flex-grow">
                    <p className="text-gray-700 mb-2">
                        <strong>Author:</strong> {book?.author}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString('en-GB')}
                    </p>
                    <p className="text-gray-700 mb-2 capitalize">
                        <strong>Category:</strong> {book?.category}
                    </p>
                    <p className="text-gray-700 mb-4">
                        <strong>Description:</strong> {book.description}
                    </p>
                    <p className="text-gray-700 mb-6 text-lg font-semibold">
                        Price: €<span>{book?.newPrice}</span>
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 mt-4">
                        <button
                            onClick={() => handleAddToCart(book)}
                            className="btn-primary px-6 py-3 flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-md"
                        >
                            <FaCartShopping />
                            Add to Cart
                        </button>
                        <button
                            onClick={() => window.history.back()}
                            className="btn-secondary px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleBook;
