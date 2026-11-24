export function MichiganLogo(props) {
  return <img src="/assets/michigan.png" {...props} />;
}

export function OhioStateLogo(props) {
  return (
    <picture>
      <source srcSet="/assets/ohio-state-dark.png" media="(prefers-color-scheme: dark)" />
      <img src="/assets/ohio-state.png" {...props} />
    </picture>
  );
}
