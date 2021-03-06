import React, { useEffect, useCallback } from 'react';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../redux/post/post.types';

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user);
  const { addCommentDone } = useSelector((state) => state.post);
  const [commentText, onChangeCommentText, setCommentText] = useInput('');
  const dispatch = useDispatch();
  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);
    console.log('user.id', id);
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
  }, [commentText]);

  useEffect(() => {
    console.log('addCommentDone : ', addCommentDone);
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);
  
  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
        <Button type="primary" htmlType="submit" style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }}>댓글달기</Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
