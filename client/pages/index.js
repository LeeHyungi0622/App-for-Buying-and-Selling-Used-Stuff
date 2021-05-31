import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import styled from 'styled-components';
import PostForm from '../components/PostForm';

const Wrapper = styled.div`
    margin: 0 auto;
`;

const Home = () => {
    const { currentUser } = useSelector((state) => state.user);
    const { mainPost } = useSelector((state) => state.post);
    console.log('mp : ', mainPost);
    console.log('cu : ', currentUser);
    return (
        <AppLayout>
            { currentUser && <PostForm /> }
            <Wrapper>
                { mainPost.map((post) => (<PostCard key={post.id} post={post} />)) }
            </Wrapper>      
        </AppLayout>
    );
};

export default Home;