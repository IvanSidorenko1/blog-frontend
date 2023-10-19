import React from "react";
import {useParams} from "react-router-dom";
import Markdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";

export const FullPost = () => {
  const [data,setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const {id} =useParams();
  
React.useEffect(()=>{
axios
.get(`/posts/${id}`)
.then(res =>{
  setData(res.data);
  setLoading(false);
})
.catch((err)=>{
  console.log(err);
  alert("помилка при отриманні статі")
});
}, []);

if(isLoading){
return <Post isLoading={isLoading} isFullPost/>
}
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
         <Markdown >{data.text}</Markdown>,
      </Post>
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
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
