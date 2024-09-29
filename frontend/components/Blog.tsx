"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Card } from "../components/ui/card";

type Blog = {
  title: string;
  author: string;
  createdAt: string;
  tag: string;
};

const BlogTable: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([
    { title: 'Blog Post 1', author: 'Keshav', createdAt: '2022-01-01', tag: 'Design' },
    { title: 'Blog Post 2', author: 'Hardik', createdAt: '2022-02-15', tag: 'Development' },
    { title: 'Blog Post 3', author: 'Abdus', createdAt: '2022-03-10', tag: 'Marketing' },
    { title: 'Blog Post 4', author: 'Somya', createdAt: '2022-04-05', tag: 'SEO' },
  ]);

  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="max-w-5xl mx-auto mt-10 p-4 bg-black text-white rounded-lg">
      <h2 className="text-2xl text-white mb-4">Blog Management</h2>
      
      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search by title, tag"
        value={searchQuery} // Bind input value to searchQuery
        onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
        className="w-full mb-4"
      />

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBlogs.map((blog, index) => (
              <TableRow key={index}>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell>{blog.createdAt}</TableCell>
                <TableCell>
                  <span className="bg-neutral text-accent px-2 py-1 rounded">
                    {blog.tag}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => alert(`Editing ${blog.title}`)}
                    variant="default"
                    className="text-secondary"
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-accent">
      <Head>
        <title>Blog Management Dashboard</title>
        <meta name="description" content="Manage blog posts and tags" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4 sm:p-10">
        <h1 className="text-4xl font-bold mb-6">Blog Management Dashboard</h1>
        <BlogTable />
      </main>
    </div>
  );
};

export default Blog;
