function CardList({ imageList, idList, onImageClickIdChange, onImageClickDisplayChange }) {

    const handleCardClick = (id) => {
        onImageClickIdChange(id); 
        onImageClickDisplayChange(false);
    };

    return (
        <div className="cardContainer">
            {imageList.map((currentImage, index) => {
                const currentId = idList[index];

                return (
                    <div 
                        className="cardSmall" 
                        key={currentId || index}
                        onClick={() => handleCardClick(currentId)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img 
                            src={currentImage} 
                            className="catImage" 
                            alt={`cat-${currentId}`} 
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default CardList;