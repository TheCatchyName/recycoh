import React from 'react';

const RecyclableComponent = ({ componentName }) => {
  const recyclingDescriptions = {
    "PET Plastic Bottle": "Remove any labels and caps, and give it a thorough rinse before binning it!",
    "Aluminium Can Tab": "Remove it from the can and toss it in the same bin",
    "Aluminium Can" : "Remove the can tab, and give it a thorough rinse before binning it!",
    // Add descriptions for other recyclable components here...
  };

  return (
    <div>
      <strong>{componentName}</strong>
      <p>{recyclingDescriptions[componentName]}</p>
    </div>
  );
};

export default RecyclableComponent;
