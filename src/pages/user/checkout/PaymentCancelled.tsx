import { useNavigate } from "react-router-dom";

const PaymentCancelled = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-yellow-50">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <h1 className="text-3xl font-bold text-yellow-600">Payment Cancelled! ⚠️</h1>
                <p className="text-gray-600 mt-2">You have cancelled the payment process.</p>
                <div className="mt-4 flex gap-4">
                    <button
                        className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition"
                        onClick={() => navigate('/cart/checkout')}
                    >
                        Try Again
                    </button>
                    <button
                        className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition"
                        onClick={() => navigate('/')}
                    >
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancelled;
