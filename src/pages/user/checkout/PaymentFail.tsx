import { useNavigate } from 'react-router-dom';

const PaymentFail = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <h1 className="text-3xl font-bold text-red-600">Payment Failed! ❌</h1>
                <p className="text-gray-600 mt-2">Oops! Something went wrong. Please try again.</p>
                <button
                    className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
                    onClick={() => navigate('/cart/checkout')}
                >
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default PaymentFail;
