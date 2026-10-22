type PostHeaderProps = {
  kicker: string;
  title: string;
  description: string;
  publication: string;
  source?: string;
  minutes?: number;
};

export function PostHeader({kicker,title,description,publication,source,minutes}:PostHeaderProps){
  return <header className="post-heading" aria-labelledby="post-title">
    <div className="post-heading-kicker">{kicker}</div>
    <h1 id="post-title">{title}</h1>
    <p className="post-heading-description">{description}</p>
    <div className="post-heading-meta">
      <p>Redação Atlas do Agora · {publication}</p>
      {source && <p>{source}</p>}
      {minutes && <p>{minutes} min de leitura</p>}
    </div>
  </header>;
}
