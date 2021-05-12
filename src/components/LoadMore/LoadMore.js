import Button from "../Forms/Button/Button";
import React from 'react'

const LoadMore = ({
    onLoadMoreEvt = () => { },
  }) => {
    return (
      <Button onClick={() => onLoadMoreEvt()}>
        Load More
      </Button>
    );
  };
  
  export default LoadMore;