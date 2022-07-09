import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { IPost } from 'src/interface/post.interface';
import CategoryFilter from './CategoryFilter';
import Pagination from './Pagination';
import PostCard from './PostCard';
import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';

import 'src/styles/Home.scss';

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [windowWidth, setWindowWitdth] = useState(0);
  const [postPerPage, setPostPerPage] = useState(5);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const isMounted = useRef(false);

  /**
   * This use effect is to be called when component are mounted
   * It will fetch all posts from the API
   */
  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/posts');

      /**
       * Posts are sorted by publishedDate decrementally
       * Most recent post will be at the top
       */
      const sortedPosts: IPost[] = (res.data.posts as IPost[]).sort(
        (post1, post2) => {
          const post1Date: Date = new Date(post1.publishDate);
          const post2Date: Date = new Date(post2.publishDate);
          return post2Date.getTime() - post1Date.getTime();
        }
      );

      /**
       * Set the fetched posts to component state
       */
      setPosts(sortedPosts);
      setFilteredPosts(sortedPosts);
      setTotalPages(sortedPosts.length / 5);
      const categories = searchParams.get('categories');
      setSelectedCategories(categories ? JSON.parse(categories) : []);
    })();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;
      setWindowWitdth(innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth >= 860) {
      setPostPerPage(5);
    }
  }, [windowWidth]);

  /**
   * This useEffect will be triggered if there is a changes to the
   * category filter, only posts with selected category will appear
   * in the list
   */
  useEffect(() => {
    if (isMounted.current) {
      setFilteredPosts(
        posts.filter((post) => {
          if (!selectedCategories.length) {
            return true;
          }

          const postCategories = post.categories.map((cat) => cat.name);

          return selectedCategories.every((cat) =>
            postCategories.includes(cat)
          );
        })
      );
      setPostPerPage(5);
      setTotalPages(Math.ceil(filteredPosts.length / postPerPage));
      setCurrentPage(1);
      setSearchParams({ categories: JSON.stringify(selectedCategories) });
    } else {
      isMounted.current = true;
    }
  }, [filteredPosts.length, posts, selectedCategories]);

  useEffect(() => {
    if (isMounted.current) {
      setFilteredPosts(
        posts.filter((post) => {
          if (!selectedCategories.length) {
            return true;
          }

          const postCategories = post.categories.map((cat) => cat.name);

          return selectedCategories.every((cat) =>
            postCategories.includes(cat)
          );
        })
      );
    } else {
      isMounted.current = true;
    }
  }, [postPerPage]);

  /**
   * This function is to get all categories available based on
   * the list of posts available
   */
  const categoriesAvailable = (): string[] => {
    const categorySet = new Set<string>();
    posts
      .map((post) => post.categories)
      .map((cats) => cats.forEach((cat) => categorySet.add(cat.name)));
    return Array.from(categorySet);
  };

  const isSelected = (cat: string): boolean => {
    return selectedCategories.includes(cat);
  };

  const toggleCategory = (cat: string) => {
    if (isSelected(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
      return;
    }

    setSelectedCategories([...selectedCategories, cat]);
  };

  const setPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const loadMore = () => {
    if (postPerPage < filteredPosts.length) {
      setPostPerPage((v) => v + 5);
    }
  };

  /**
   * This function will determine the type of pagination
   * for the page, either using classic page number or
   * load more which is more suitable for smaller device
   * that use swiping action to browse, in real application
   * it is better to implement lazy loading
   */
  const pagination = () => {
    if (totalPages > 0 && windowWidth > 860) {
      return (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          changePage={setPage}
        />
      );
    } else if (postPerPage < filteredPosts.length) {
      return (
        <div className="load-more">
          <button onClick={loadMore}>Load More</button>
        </div>
      );
    }
  };

  const viewPost = (id: string) => {
    navigate({
      pathname: `/${id}`,
      search: createSearchParams({
        categories: JSON.stringify(selectedCategories)
      }).toString()
    });
  };

  return (
    <div className="container">
      <CategoryFilter
        categories={categoriesAvailable()}
        selectedCategories={selectedCategories}
        clickHandler={toggleCategory}
      />
      {filteredPosts.length > 0 ? (
        <div>
          {filteredPosts
            .slice((currentPage - 1) * postPerPage, currentPage * postPerPage)
            .map((post) => {
              return (
                <PostCard key={post.id} post={post} onClickHandler={viewPost} />
              );
            })}
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            fontWeight: 'lighter',
            borderTop: '1px solid #e0e0e0',
            padding: '2rem',
          }}
        >
          -- NONE --
        </div>
      )}
      {pagination()}
    </div>
  );
}
