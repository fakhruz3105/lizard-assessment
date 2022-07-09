import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IPost } from 'src/interface/post.interface';

import 'src/styles/PostDetail.scss';
import 'src/styles/PostCard.scss';

export default function PostDetail() {
  // Id can be used to fetch post details from backend
  const { id } = useParams();

  // Use dummy data
  const [post, setPost] = useState<IPost>({
    id: '146b8632-ab20-479c-a67d-3cd9f50231e8',
    title: 'in hac habitasse platea dictumst maecenas ut massa quis augue',
    publishDate: '2020-09-28T15:59:05Z',
    author: {
      name: 'Bunnie Mathey',
      avatar: 'https://robohash.org/quamnonet.jpg?size=50x50&set=set1',
    },
    summary:
      'Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.',
    categories: [
      {
        id: '5ee1187a-26f3-4819-b710-ccd99efc94df',
        name: 'Surveys and Forms',
      },
      {
        id: 'dc431d44-e26e-4bec-a2bd-a8ba1cd8b95d',
        name: 'Digital Marketing',
      },
      {
        id: '0756ceeb-48d1-495a-9e47-8bdbc4a231d4',
        name: 'Platform News and Updates',
      },
      {
        id: 'b4f70697-928c-4838-8f34-3bf0fc101792',
        name: 'Tips and Best Practise',
      },
    ],
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  return (
    <article className="container post-detail">
      <h1>{post.title}</h1>
      <div className="post-info">
        <img src={post.author.avatar} alt={post.author.name} />
        <address className="author">By {post.author.name}</address>
        <span>{formatDate(post.publishDate)}</span>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
      </p>
      <p>
        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
      </p>
    </article>
  );
}
