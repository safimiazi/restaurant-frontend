import { useState } from "react";
import { Star } from "lucide-react";
import SectionPadding from "../../../wrapper/SectionPadding";

const ProductReviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      comment: "Amazing product! Highly recommended.",
      time: "2 hours ago",
    },
    {
      id: 2,
      name: "Alice Smith",
      rating: 4,
      comment: "Good quality but a bit expensive.",
      time: "1 day ago",
    },
    {
      id: 3,
      name: "Alice Smith",
      rating: 4,
      comment: "Good quality but a bit expensive.",
      time: "1 day ago",
    },
    {
      id: 4,
      name: "Alice Smith",
      rating: 4,
      comment: "Good quality but a bit expensive.",
      time: "1 day ago",
    },
    {
      id: 5,
      name: "Alice Smith",
      rating: 4,
      comment: "Good quality but a bit expensive.",
      time: "1 day ago",
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);

  const handleAddReview = () => {
    if (newComment.trim() === "") return;

    const newReview = {
      id: reviews.length + 1,
      name: "Guest User",
      rating: newRating,
      comment: newComment,
      time: "Just now",
    };

    setReviews([newReview, ...reviews]);
    setNewComment("");
    setNewRating(5);
  };

  return (
    <SectionPadding>
      <div className="flex md:flex-row flex-col gap-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Customer Reviews
          </h2>

          {/* Review List */}
          <div className="h-52 overflow-y-scroll">
            <div className="space-y-4 ">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-gray-800">
                      {review.name}
                    </div>
                    <div className="flex gap-1 text-blue-500">
                      {Array.from({ length: review.rating }, (_, i) => (
                        <Star key={i} size={16} fill="blue" stroke="none" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                  <span className="text-sm text-gray-400">{review.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Add Review Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Leave a Review
            </h3>
            <div className="flex gap-2 mb-2">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={20}
                  fill={i < newRating ? "blue" : "none"}
                  stroke="gray"
                  className="cursor-pointer"
                  onClick={() => setNewRating(i + 1)}
                />
              ))}
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              rows={3}
            />
            <button
              onClick={handleAddReview}
              className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Submit Review
            </button>
          </div>
        </div>
        <div className="p-4">
          {/* <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🚚 Delivery & Return Policy
          </h2> */}

          {/* Delivery Section */}
          {/* <div className="mb-6">
            <h3 className="text-xl font-medium text-blue-600">
              📦 Delivery Information
            </h3>
            <ul className="list-disc pl-5 mt-2 text-gray-600">
              <li>
                ✅ Estimated delivery within <strong>3-7 business days</strong>.
              </li>
              <li>🚀 Express shipping available (1-2 days).</li>
              <li>🌍 International shipping available (7-14 days).</li>
              <li>📍 Track your order in real-time.</li>
              <li>
                💰 Free shipping on orders above <strong>$50</strong>.
              </li>
            </ul>
          </div> */}

          {/* Return Policy Section */}
          {/* <div>
            <h3 className="text-xl font-medium text-red-500">
              🔄 Return & Refund Policy
            </h3>
            <ul className="list-disc pl-5 mt-2 text-gray-600">
              <li>
                🛍️ Returns accepted within <strong>30 days</strong> of purchase.
              </li>
              <li>🔄 Items must be in original condition with packaging.</li>
              <li>
                💵 Full refund processed within{" "}
                <strong>5-7 business days</strong>.
              </li>
              <li>📩 Contact customer support for return requests.</li>
              <li>⚠️ No returns on **final sale items**.</li>
            </ul>
          </div> */}
        </div>
      </div>
    </SectionPadding>
  );
};

export default ProductReviews;
