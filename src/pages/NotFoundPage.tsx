type NotFoundPageProps = {
  copy: any;
};

export default function NotFoundPage({ copy }: NotFoundPageProps) {
  return (
    <section className="panel overflow-hidden p-10 text-center">
      <div className="mx-auto max-w-3xl">
        <div className="media-frame mx-auto mb-8 grid h-36 w-36 place-items-center bg-[radial-gradient(circle_at_20%_20%,_rgba(20,184,166,0.35),_transparent_45%),radial-gradient(circle_at_80%_80%,_rgba(249,115,22,0.3),_transparent_42%),linear-gradient(145deg,#020617,#111827)] text-5xl font-semibold text-white">
          404
        </div>
        <h1 className="text-4xl font-semibold text-white">{copy.notFound.message}</h1>
        <a href="/" className="cta-primary mt-7">
          {copy.notFound.button}
        </a>
      </div>
    </section>
  );
}
