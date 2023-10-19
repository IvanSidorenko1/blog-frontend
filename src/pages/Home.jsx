import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

// import axios from "../axios";

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

import { fetchPosts, fetchTags } from '../redux/slices/posts'

export const Home = () => {
  const dispatch = useDispatch();
  const {posts, tags} = useSelector(state => state.posts);
  const userData = useSelector(state => state.auth.data);

  const isPostLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags())
  }, []);

  console.log("userData",userData,posts);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Нові" />
        <Tab label="Популярні" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : posts.items).map((obj,index) => 
          isPostLoading ? (
            <Post key={index} isLoading={true}/>
          ):(
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
              isEditable={Boolean(userData?._id===obj.user._id)}
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Джон Джоновіч',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Це комент',
              },
              {
                user: {
                  fullName: 'Мічтер Ікс',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
