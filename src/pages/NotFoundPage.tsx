type NotFoundPageProps = {
  copy: any;
};

export default function NotFoundPage({ copy }: NotFoundPageProps) {
  return (
    <section className="panel p-10 text-center max-w-lg mx-auto mt-20">
      <p className="text-6xl font-mono font-bold text-brand-primary">404</p>
      <h1 className="mt-4 text-xl font-semibold text-white">{copy.notFound.message}</h1>
      <a href="/" className="cta-primary mt-8 inline-flex">
        {copy.notFound.button}
      </a>
    </section>
  );
}
