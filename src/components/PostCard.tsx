import { IPost } from 'src/interface/post.interface';

import 'src/styles/PostCard.scss';

export default function PostCard({ post, onClickHandler }: { post: IPost; onClickHandler: (id: string) => void }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  return (
    <section className="post">
      <div className="post-info">
        <img src={post.author.avatar} alt={post.author.name} />
        <address className="author">By {post.author.name}</address>
        <span>{formatDate(post.publishDate)}</span>
      </div>
      <h3 onClick={() => onClickHandler(post.id)}>{post.title}</h3>
      <article>{post.summary}</article>
      <div className="post-categories">
        {post.categories.map((cat) => {
          return <span key={cat.id}>{cat.name}</span>;
        })}
      </div>
    </section>
  );
}
