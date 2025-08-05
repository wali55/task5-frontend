const ReviewCard = ({ review }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-3">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-gray-700">{review.reviewer}</span>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">{review.review}</p>
    </div>
  )
}

export default ReviewCard