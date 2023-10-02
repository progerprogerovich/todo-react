const Comment = ({ comment }) => {
  return (
    <>
      <li key={comment.id}>
        <p>{comment.description}</p>
      </li>
    </>
  );
};

export default Comment;
