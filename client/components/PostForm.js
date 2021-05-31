import React, { useCallback, useRef, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../redux/post/post.actions';
import useInput from '../hooks/useInput';
import styled from 'styled-components';

const SForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  textarea {
    height: 150px;
    width: 70%;
    border-radius: 5px;
  }
  .button-container {
    margin: 10px 0;
    width: 500px;
    display: flex;
    justify-content: space-around;
  }
`;

const SButton = styled(Button)`
  height: 60px;
  border-radius: 10px;
`;


const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput('');
  const imageInput = useRef();
  const onSubmit = useCallback(() => {
    console.log('submit text : ', text);
    dispatch(addPost(text));
  }, [text]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  // 서버에 Post 등록이 성공을 하면, Post 등록할때 입력했던
  // 입력값들을 reset시켜준다.
  // 만약 에러가 난 경우에는 입력값을 그대로 남겨두도록 처리한다.
  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);
  return (
    <SForm style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 일이 있었나요?"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <div className="button-container">
          <SButton onClick={onClickImageUpload}>중고 상품 이미지 업로드하기</SButton>
          <SButton type="primary" style={{ float: 'right' }} htmlType="submit">포스팅완료</SButton>
        </div>
      </div>
      <div>
        {imagePaths.map((v) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v} style={{ width: '200px' }} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>

    </SForm>
  );
};

export default PostForm;
