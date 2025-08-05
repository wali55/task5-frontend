const BookCover = ({ cover, title, author }) => {
  return (
    <div 
      className="w-32 h-48 rounded-lg shadow-lg flex flex-col justify-between p-4 text-white relative overflow-hidden"
      style={{ backgroundColor: cover?.backgroundColor || '#4ECDC4' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black opacity-30"></div>
      <div className="relative z-10">
        <h3 className="text-sm font-bold leading-tight mb-2 line-clamp-3">{title}</h3>
      </div>
      <div className="relative z-10">
        <p className="text-xs opacity-90 line-clamp-2">{author}</p>
      </div>
    </div>
  )
}

export default BookCover