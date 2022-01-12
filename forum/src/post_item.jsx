function PostItem(props) {
  return (
    <div className="card p-3 me-3 mt-3 d-flex flex-col justify-content-between" style={{width: '250px'}}>
      <a href={`/post/${props.id}`} style={{textDecoration: 'none', color: '#00AAAA'}} className="fw-bold">{props.title}</a>

      <div>{props.preview}...</div>
    </div>
  );
}

export default PostItem;
