import React, { useState, useCallback } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import ImagesZoom from './ImagesZoom';
import styled from 'styled-components';

const ZoomArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);
  // 이미지의 길이가 1인 경우,
  if (images.length === 1) {
    return (
      <>
        {/* screen reader에서 굳이 클릭해야 되는 요소라는 것을 알려주지 않아도 될때 */}
        {/* role 속성으로 presentation을 넣어준다. */}
        <img role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom} />
        {/* image를 확대해서 볼 수 있게 해주는 컴포넌트 */}
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }

  // 이미지의 길이가 2인 경우,
  if (images.length === 2) {
    return (
      <>
        {/* screen reader에서 굳이 클릭해야 되는 요소라는 것을 알려주지 않아도 될때 */}
        <img role="presentation" style={{ width: '50%', display: 'inline-block' }} src={images[0].src} alt={images[0].src} onClick={onZoom} />
        <img role="presentation" style={{ width: '50%', display: 'inline-block' }} src={images[0].src} alt={images[0].src} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <ZoomArea>
        <img role="presentation" style={{ width: '50%', display: 'inline-block' }} src={images[0].src} alt={images[0].src} onClick={onZoom} />
        <div
          role="presentation"
          style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}개의 이미지가 더 있습니다. <br/>
          클릭 후 확인해주세요.
        </div>
      </ZoomArea>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImages.propTypes = {
    images: PropTypes.string
}

export default PostImages;