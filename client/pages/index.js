import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import styled from 'styled-components';
import PostForm from '../components/PostForm';
import LoginSuggestion from '../components/LoginSuggestion';
import { loadPost } from '../redux/post/post.actions';

const Wrapper = styled.div`
    margin: 0 auto;
`;

const Home = () => {
    const { currentUser } = useSelector((state) => state.user);
    const { mainPosts } = useSelector((state) => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadPost);    
    }, []);

    useEffect(() => {

    },[]);

    console.log('mp : ', mainPosts);
    console.log('cu : ', currentUser);
    return (
        <AppLayout>
            { currentUser && <PostForm /> }
            { !currentUser && <LoginSuggestion /> }
            <Wrapper>
                { mainPosts.map((post) => (<PostCard key={post.id} post={post} />)) }
            </Wrapper>      
        </AppLayout>
    );
};

export default Home;