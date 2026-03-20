import React from 'react'
import BackBlog from '../../Components/BackBlog/BackBlog'
import BlogBreadcrum from '../../Components/BlogBreadcrum/BlogBreadcrum'
import ReletedPost from '../../Components/ReletedPost/ReletedPost'

const BlogDetails = () => {
  return (
    <div>
        <BlogBreadcrum/>
        <BackBlog/>
        <ReletedPost/>
    </div>
  )
}

export default BlogDetails